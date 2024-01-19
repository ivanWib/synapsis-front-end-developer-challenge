"use client";
import { useState, useEffect } from "react";

type Post = {
  id?: string;
  user_id?: string;
  title?: string;
  body?: string;
};

type User = {
  id?: string;
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
  const UserUrl = "https://gorest.co.in/public/v2/users";

  const fetchPosts = async () => {
    const res = await fetch(PostUrl);
    const data = await res.json();
    setPosts(data);
  };

  const fetchUsers = async () => {
    const res = await fetch(UserUrl);
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchPosts();
    fetchUsers();
  }, []);

  const getUserNameById = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.name : "Unknown User";
  };

  return (
    <main>
      {/* <h1>Blog Posts</h1> */}

      <div className="grid grid-cols-3">
        {posts &&
          posts.map((post: Post) => {
            return (
              <div key={post.id} className="w-3/4">
                <h2>{post.title}</h2>
                <p>{truncateText(post.body || "", 150)}</p>
                <p>Author: {getUserNameById(post.user_id || "")}</p>
                <br />
              </div>
            );
          })}
      </div>
    </main>
  );
}
