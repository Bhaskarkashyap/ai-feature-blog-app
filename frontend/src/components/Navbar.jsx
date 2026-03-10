import React from "react";
import { Link } from "react-router-dom";
import { PenTool, Home } from "lucide-react";

function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-yellow-600 hover:text-yellow-700"
        >
          <PenTool size={28} />
          <span>AI Blog</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Home size={20} />
            <span>Home</span>
          </Link>
          <Link to="/create" className="btn btn-primary">
            Write Post
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
