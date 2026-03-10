import React from "react";
import { Link } from "react-router-dom";
import { Calendar, User, Tag, Trash2, Edit2 } from "lucide-react";

function BlogCard({ post, onDelete }) {
  const formattedDate = new Date(post.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="card p-6 mb-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <Link to={`/post/${post.id}`}>
            <h2 className="text-2xl font-bold text-gray-900 hover:text-yellow-600 transition-colors line-clamp-2 cursor-pointer">
              {post.title}
            </h2>
          </Link>
        </div>
        <div className="flex gap-2 ml-4">
          <Link to={`/post/${post.id}/edit`} className="btn btn-secondary !p-2">
            <Edit2 size={18} />
          </Link>
          <button
            onClick={() => onDelete(post.id)}
            className="btn btn-danger !p-2"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-3">
        {post.summary || post.content.substring(0, 150)}...
      </p>

      <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
        <div className="flex items-center gap-1">
          <User size={16} />
          <span>{post.author_name}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar size={16} />
          <span>{formattedDate}</span>
        </div>
      </div>

      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag.id}
              className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm"
            >
              <Tag size={14} />
              {tag.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default BlogCard;
