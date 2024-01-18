import axios from "axios";

async function getPosts() {
  try {
    const response = await axios.get("https://gorest.co.in/public/v2/posts");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export default function Page({ posts }) {
  return (
    <main>
      {posts?.map((post) => (
        <div key={post.id}>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </div>
      ))}
    </main>
  );
}

export async function getStaticProps() {
  const posts = await getPosts();

  return {
    props: {
      posts,
    },
  };
}
