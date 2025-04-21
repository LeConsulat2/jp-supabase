import { useMutation } from '@tanstack/react-query';
import { ChangeEvent, useState } from 'react';
import { supabase } from '../supabase-client';

interface PostInput {
  title: string;
  content: string;
}

const createPost = async (post: PostInput, imageFile: File) => {
  const filePath = `${post.title}-${Date.now()}-${imageFile.name}`;

  const { error: uploadError } = await supabase.storage
    .from('post-images')
    .upload(filePath, imageFile);

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const { data: publicUrlData } = supabase.storage
    .from('post-images')
    .getPublicUrl(filePath);

  const { data, error } = await supabase
    .from('posts')
    .insert({ ...post, image_url: publicUrlData.publicUrl });

  if (error) throw new Error(error.message);
  return data;
};

export const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { mutate } = useMutation({
    mutationFn: (data: { post: PostInput; imageFile: File }) =>
      createPost(data.post, data.imageFile),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;
    mutate({ post: { title, content }, imageFile: selectedFile });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center px-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl p-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl space-y-6 text-white"
      >
        <h2 className="text-3xl font-bold text-center">Create New Post</h2>

        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-semibold">
            Title
          </label>
          <input
            type="text"
            id="title"
            required
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
            placeholder="Post title..."
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="content" className="block text-sm font-semibold">
            Content
          </label>
          <textarea
            id="content"
            required
            rows={5}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
            placeholder="Write something amazing..."
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="image" className="block text-sm font-semibold">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            required
            onChange={handleFileChange}
            className="block w-full text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-white/30 file:text-white hover:file:bg-white/50 cursor-pointer"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="mt-4 inline-block px-6 py-3 rounded-lg bg-white text-indigo-700 font-semibold transition-all duration-300 hover:scale-105 hover:bg-white/90"
          >
            🚀 Publish Post
          </button>
        </div>
      </form>
    </div>
  );
};
