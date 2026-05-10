import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { Link } from "react-router-dom";

export default function Home() {
  // const { name } = useContext(AppContext);

  const [posts, setPosts] = useState([]);

  async function getPosts() {
    const res = await fetch("/api/posts");
    const data = await res.json();

    if (res.ok) {
      setPosts(data);
    }
    console.log(data);
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <h1>Latest Posts</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id}>
            <div>
              <div>
                <h2>{post.title}</h2>
                <small>
                  Created by {post.user.name} on
                  {new Date(post.created_at).toLocaleTimeString()}
                </small>
              </div>
              <Link to={`/posts/${post.id}`}>Read more</Link>
            </div>
            <p>{post.body}</p>
          </div>
        ))
      ) : (
        <h2>There are no posts.</h2>
      )}
    </>
  );
}
