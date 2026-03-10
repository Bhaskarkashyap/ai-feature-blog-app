import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import BlogCard from "../components/BlogCard";
import { postsAPI } from "../services/api";
import { Loader, AlertCircle } from "lucide-react";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchPosts();
  }, [search, tagFilter, page]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await postsAPI.getAll(page, search, tagFilter);
      setPosts(response.data.posts);
      setTotalPages(response.data.pages);
    } catch (err) {
      setError("Failed to load posts");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      await postsAPI.delete(postId);
      setPosts(posts.filter((p) => p.id !== postId));
    } catch (err) {
      alert("Failed to delete post");
      console.error(err);
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to AI Blog Platform
        </h1>
        <p className="text-lg text-gray-600">
          Discover insightful articles powered by AI assistance
        </p>
      </div>

      <SearchBar onSearch={setSearch} onTagFilter={setTagFilter} />

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center py-12">
          <Loader className="loading-spinner text-yellow-600" size={40} />
        </div>
      )}

      {!loading && posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No posts found. Start by creating one!
          </p>
        </div>
      )}

      {!loading && posts.length > 0 && (
        <>
          <div className="space-y-6">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} onDelete={handleDelete} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="btn btn-secondary disabled:opacity-50"
              >
                Previous
              </button>
              <span className="py-2 px-4 text-gray-600">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="btn btn-secondary disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
}

export default Home;
