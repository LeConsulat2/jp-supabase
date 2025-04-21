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
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutate } = useMutation({
    mutationFn: (data: { post: PostInput; imageFile: File }) =>
      createPost(data.post, data.imageFile),
    onMutate: () => setIsSubmitting(true),
    onSuccess: () => {
      setTitle('');
      setContent('');
      setSelectedFile(null);
      setPreview(null);
      setIsSubmitting(false);
    },
    onError: () => setIsSubmitting(false),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;
    mutate({ post: { title, content }, imageFile: selectedFile });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-600 to-sky-400 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-700 to-sky-500 py-6 px-8">
          <h2 className="text-3xl font-bold text-white text-center">
            Create New Post
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-sky-100"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/20 border border-sky-200/30 text-white placeholder-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent transition duration-200"
              placeholder="Enter your post title..."
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-sky-100"
            >
              Content
            </label>
            <textarea
              id="content"
              value={content}
              required
              rows={6}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/20 border border-sky-200/30 text-white placeholder-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent transition duration-200 resize-none"
              placeholder="Share your thoughts..."
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-sky-100">
              Featured Image
            </label>

            <div className="relative border-2 border-dashed border-sky-300/50 rounded-xl p-4 transition-all hover:border-sky-300 bg-blue-900/30">
              <input
                type="file"
                id="image"
                accept="image/*"
                required
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />

              <div className="text-center p-4">
                {preview ? (
                  <div className="space-y-3">
                    <img
                      src={preview}
                      alt="Preview"
                      className="h-48 object-contain mx-auto rounded-lg"
                    />
                    <p className="text-sky-200 text-sm">
                      Image selected - Click to change
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="mx-auto w-12 h-12 rounded-full bg-sky-600/50 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-sky-100"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <p className="text-sky-200">
                      Drag & drop or click to upload an image
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-xl font-medium transition-all duration-300 ${
                isSubmitting
                  ? 'bg-sky-700 text-sky-100 cursor-not-allowed'
                  : 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg hover:shadow-xl hover:from-sky-600 hover:to-blue-700 focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-blue-900'
              }`}
            >
              {isSubmitting ? 'Publishing...' : 'Publish Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
