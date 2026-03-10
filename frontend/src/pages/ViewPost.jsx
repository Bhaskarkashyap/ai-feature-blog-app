import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { postsAPI } from "../services/api";
import {
  Loader,
  AlertCircle,
  Calendar,
  User,
  Tag,
  Edit2,
  Trash2,
  ChevronLeft,
} from "lucide-react";

function ViewPost() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await postsAPI.getById(id);
      setPost(response.data);
    } catch (err) {
      setError("Failed to load post");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      await postsAPI.delete(id);
      navigate("/");
    } catch (err) {
      alert("Failed to delete post");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-12 flex justify-center items-center min-h-screen">
        <Loader className="loading-spinner text-yellow-600" size={40} />
      </main>
    );
  }

  if (error) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <AlertCircle size={20} />
          {error}
        </div>
        <button
          onClick={() => navigate("/")}
          className="btn btn-secondary mt-4"
        >
          Back to Home
        </button>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Post not found</p>
          <button
            onClick={() => navigate("/")}
            className="btn btn-secondary mt-4"
          >
            Back to Home
          </button>
        </div>
      </main>
    );
  }

  const formattedDate = new Date(post.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-yellow-600 hover:text-yellow-700 mb-8 transition-colors"
      >
        <ChevronLeft size={20} />
        Back to Posts
      </button>

      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-5xl font-bold text-gray-900">{post.title}</h1>
          <div className="flex gap-2">
            <Link to={`/post/${id}/edit`} className="btn btn-secondary !p-2">
              <Edit2 size={20} />
            </Link>
            <button onClick={handleDelete} className="btn btn-danger !p-2">
              <Trash2 size={20} />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 text-gray-600 mb-6">
          <div className="flex items-center gap-2">
            <User size={18} />
            <span>{post.author_name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={18} />
            <span>{formattedDate}</span>
          </div>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag.id}
                className="inline-flex items-center gap-1 bg-blue-100 text-yellow-700 px-3 py-1 rounded-full text-sm"
              >
                <Tag size={14} />
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
        <div className="markdown-content">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </div>

      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-yellow-600 hover:text-yellow-700 transition-colors"
      >
        <ChevronLeft size={20} />
        Back to Posts
      </button>
    </main>
  );
}

export default ViewPost;
