"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";

// Define types
type Post = {
  id?: string;
  user_id?: string;
  title?: string;
  body?: string;
};

type User = {
  id?: string;
  post_id?: string;
  name?: string;
};

type Comment = {
  id?: string;
  post_id?: string;
  name?: string;
  email?: string;
  body?: string;
};

// Define the Home component
export default function Home() {
  const [post, setPost] = useState<Post | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    // Get the post ID from the URL pathname
    const postId = window.location.pathname.split("/")[1];

    const fetchPost = async () => {
      const res = await fetch(`https://gorest.co.in/public/v2/posts/${postId}`);
      const data = await res.json();
      setPost(data);
    };

    const fetchUserByPostId = async () => {
      const res = await fetch(
        `https://gorest.co.in/public/v2/posts/${postId}/comments`
      );
      const data = await res.json();
      if (data.length > 0) {
        setUser({
          id: data[0].id,
          post_id: data[0].post_id,
          name: data[0].name,
        });
        setComments(data);
      }
    };

    if (postId) {
      fetchPost();
      fetchUserByPostId();
    }
  }, []);

  return (
    <main className="bg-[#232D3F] text-white">
      <div className="bg-[rgba(228,228,228,0.5)] shadow-lg backdrop-blur-md border-opacity-18 border border-solid border-white rounded-2xl p-3">
        <Navbar />
      </div>
      {post && (
        <div className="mx-5 mt-5">
          <h2 className="text-center md:text-left mb-3">{post.title}</h2>
          <p className="text-justify md:text-left ">{post.body}</p>
          {user && <p>Author: {user.name}</p>}
          <Link href={`/`}>
            <div className="bg-[#005B41] w-1/4 text-center rounded-xl hover:bg-[#008170] mt-5">
              Back
            </div>
          </Link>
        </div>
      )}

      <hr className="m-5" />

      {comments.length > 0 && (
        <div className="mx-5">
          <h3 className="mb-3">Comments:</h3>
          {comments.map((comment) => (
            <div key={comment.id}>
              <p>Name: {comment.name}</p>
              <p>Email: {comment.email}</p>
              <p>Comment: {comment.body}</p>
              <hr className="my-3" />
            </div>
          ))}
        </div>
      )}
      <div className="bg-[rgba(228,228,228,0.5)] shadow-lg backdrop-blur-md border-opacity-18 border border-solid border-white rounded-2xl p-3 md:p-6 mt-5">
        <Footer />
      </div>
    </main>
  );
}
