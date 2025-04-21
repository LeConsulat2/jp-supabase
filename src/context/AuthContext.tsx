// ✅ supabase의 User 타입 가져옴
import { User } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabase-client';

// ✅ Context 타입 선언
interface AuthContextType {
  user: User | null;
  signInWithGitHub: () => void;
  signOut: () => void;
}

// ✅ Context 생성 (초기값 undefined)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ✅ 실제로 앱에서 사용할 AuthProvider 컴포넌트
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // 🧠 로그인 유저 상태
  const [user, setUser] = useState<User | null>(null);

  // ✅ 마운트 될 때 세션 체크 + 인증 상태 변화 구독
  useEffect(() => {
    // 현재 로그인 세션 불러오기
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null); // 세션 없으면 null로 처리
    });

    // 로그인/로그아웃 등 인증 변화 감지
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    // 언마운트 시 리스너 해제 (메모리 누수 방지)
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // ✅ GitHub OAuth 로그인
  const signInWithGitHub = () => {
    supabase.auth.signInWithOAuth({ provider: 'github' });
  };

  // ✅ 로그아웃
  const signOut = () => {
    supabase.auth.signOut();
  };

  // ✅ Context.Provider로 하위 컴포넌트에 인증 상태 전달
  return (
    <AuthContext.Provider value={{ user, signInWithGitHub, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ useContext로 가져오는 헬퍼 훅 (외부에서 사용 시 편하게)
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within the AuthProvider');
  }
  return context;
};
