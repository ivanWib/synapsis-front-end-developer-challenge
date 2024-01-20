"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";

type Post = {
  id?: string;
  user_id?: string;
  title?: string;
  body?: string;
};

type User = {
  post_id?: string;
  name?: string;
};

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) {
    return text;
  } else {
    return text.slice(0, maxLength) + "...";
  }
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const PostUrl = "https://gorest.co.in/public/v2/posts";

  const fetchPosts = async () => {
    const res = await fetch(PostUrl);
    const data = await res.json();
    setPosts(data);

    const userPromises = data.map(async (post: any) => {
      const userUrl = `https://gorest.co.in/public/v2/posts/${post.id}/comments`;
      const userRes = await fetch(userUrl);
      const userData = await userRes.json();
      setUsers((prevUsers) => [...prevUsers, ...userData]);
    });

    // Wait for all user data to be fetched before setting state
    await Promise.all(userPromises);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const getUserNameById = (post_id: string) => {
    const user = users.find((u) => u.post_id === post_id);
    return user ? user.name : "Unknown User";
  };

  return (
    <main className="bg-[#0F0F0F] text-white">
      <div className="bg-[rgba(228,228,228,0.5)] shadow-lg backdrop-blur-md border-opacity-18 border border-solid border-white rounded-2xl p-3">
        <Navbar />
      </div>
      {/* <h1 className="text-center text-4xl mb-5">Blog Posts</h1> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-3 md:mt-6 md:w-11/12 ml-5 md:mx-auto">
        {posts &&
          posts.map((post: Post) => {
            return (
              <div
                key={post.id}
                className="w-3/4 bg-[#232D3F] p-5 text-justify rounded-md"
              >
                <h2>{post.title}</h2>
                <hr className="my-3" />
                <p>{truncateText(post.body || "", 150)}</p>
                <p className="mt-3">Author: {getUserNameById(post.id || "")}</p>
                <Link href={`/${post.id}`}>
                  <div className="bg-[#005B41] w-1/2 text-center rounded-xl hover:bg-[#008170] mt-5">
                    Read More
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
      <div className="bg-[rgba(228,228,228,0.5)] shadow-lg backdrop-blur-md border-opacity-18 border border-solid border-white rounded-2xl p-3 md:p-6 mt-5">
        <Footer />
      </div>
    </main>
  );
}
