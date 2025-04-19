// src/App.tsx
import { useState } from 'react';
import { Navbar } from './components/Navbar';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Communities from './pages/Communities';
import CreateCommunity from './pages/CreateCommunity';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'create':
        return <CreatePost />;
      case 'communities':
        return <Communities />;
      case 'community/create':
        return <CreateCommunity />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar setPage={setCurrentPage} />
      <main className="p-6 transition-all duration-300 ease-in-out">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
