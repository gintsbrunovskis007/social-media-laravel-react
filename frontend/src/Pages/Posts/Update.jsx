import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { useNavigate, useParams } from "react-router-dom";

export default function Update() {
  const navigate = useNavigate();
  const { token, user } = useContext(AppContext);
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  const [errors, setErrors] = useState({});

  async function getPost() {
    const res = await fetch(`/api/posts/${id}`);
    const data = await res.json();
    if (res.ok) {
      //   if (data.post.user_id !== user.id) {
      if (data.user_id !== user.id) {
        navigate("/");
      }
      setFormData({
        // title: data.post.title,
        // body: data.post.body,
        title: data.title,
        body: data.body,
      });
    }
    console.log(data);
  }

  async function handleUpdate(e) {
    e.preventDefault();

    const res = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);
    if (data.errors) {
      setErrors(data.errors);
      console.log(data);
    } else {
      navigate("/");
    }
  }

  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      <h1>Update your post.</h1>
      <form onSubmit={handleUpdate}>
        <div>
          <input
            type="text"
            placeholder="Post Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          {errors.title && <p>{errors.title[0]}</p>}
        </div>
        <div>
          <textarea
            placeholder="Post Content"
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
          ></textarea>
          {errors.body && <p>{errors.body[0]}</p>}
        </div>
        <button>Update</button>
      </form>
    </>
  );
}
