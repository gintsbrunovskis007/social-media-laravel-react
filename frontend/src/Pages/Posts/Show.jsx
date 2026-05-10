import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function Show() {
  //   console.log(useParams());

  const navigate = useNavigate();

  const { id } = useParams();
  const [post, setPost] = useState(null);
  const { user, token } = useContext(AppContext);

  async function getPost() {
    const res = await fetch(`/api/posts/${id}`);
    const data = await res.json();
    if (res.ok) {
      //   setPost(data.post);
      setPost(data);
    }
    console.log(data);
  }

  async function handleDelete(e) {
    e.preventDefault();
    if (user && user.id === post.user_id) {
      const res = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        navigate("/");
      }
      console.log(res);
      console.log(data);
    }
  }

  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      {post ? (
        <div key={post.id}>
          <div>
            <div>
              <h2>{post.title}</h2>
              <small>
                Created by {post.user.name} on
                {new Date(post.created_at).toLocaleTimeString()}
              </small>
            </div>
          </div>
          <p>{post.body}</p>
          {/* {user.id === post.user_id && ( */}
          {user && user.id === post.user_id && (
            <div>
              <Link to={`/posts/edit/${post.id}`}>Update</Link>
              <div>
                <form onSubmit={handleDelete}>
                  <button>Delete</button>
                </form>
              </div>
            </div>
          )}
        </div>
      ) : (
        <h2>Post not found!</h2>
      )}
    </>
  );
}
