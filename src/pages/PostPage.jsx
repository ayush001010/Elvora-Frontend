// src/pages/PostPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../api/postApi.js";
import Loader from "../components/Loader";

const PostPage = () => {
  const { slug } = useParams(); // detect slug in URL
  const [post, setPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/posts/${slug}`);
        setPost(res.data.post || null);
      } catch (err) {
        setError("Failed to fetch post.");
      } finally {
        setLoading(false);
      }
    };

    const fetchAllPosts = async () => {
      try {
        const res = await axios.get("/api/posts/all");
        setPosts(res.data.posts || []);
      } catch (err) {
        setError("Failed to fetch posts.");
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    setError("");

    if (slug) {
      fetchPost();
    } else {
      fetchAllPosts();
    }
  }, [slug]);

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500 p-4">{error}</p>;

  // === Single Post Page ===
  if (slug && post) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-5xl mx-auto border border-black bg-white shadow-md rounded-xl p-6 ">
          <h1 className="text-3xl font-bold mb-2 text-black">{post.title}</h1>
          <p className="text-base text-gray-500 mb-4">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
          <div
            className="text-lg"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className="mt-6">
            <Link
              to="/post-page"
              className="inline-block px-4 py-2 mt-2 bg-black text-white rounded-full shadow hover:shadow-lg transition"
            >
              ← Back to all posts
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // === All Posts Page ===
  return (
    <div className="bg-[#fdfaf6] min-h-screen py-12 px-4 bg-[url('/pattern.png')] bg-no-repeat bg-center bg-cover">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-black">Explore Blogs</h1>

        {posts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white border border-black shadow-md rounded-xl p-6 w-full hover:shadow-lg hover:-translate-y-1 transform transition-all duration-300"
              >
                <h2 className="text-2xl font-semibold text-black mb-2">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <Link
                  to={`/posts/${post.slug}`}
                  className="inline-block px-4 py-2 mt-2 bg-black text-white rounded-full shadow hover:shadow-lg transition"
                >
                  Read More →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostPage;
