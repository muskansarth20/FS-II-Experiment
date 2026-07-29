import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../features/posts/postsSlice";

function AddPost() {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("");

  const handleSubmit = () => {
    if (!title || !platform) {
      alert("Please fill all fields");
      return;
    }

    dispatch(
      addPost({
        id: Date.now(),
        title,
        platform,
      })
    );

    setTitle("");
    setPlatform("");
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>Add New Post</h2>

      <input
        type="text"
        placeholder="Enter Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Enter Platform"
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSubmit}>
        Add Post
      </button>
    </div>
  );
}

export default AddPost;