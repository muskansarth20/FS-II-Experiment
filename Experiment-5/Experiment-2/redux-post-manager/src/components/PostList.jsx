import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../features/posts/postsSlice";
import {
  totalPosts,
  linkedInPosts,
} from "../features/posts/selectors";

function PostList() {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts.posts);

  const count = useSelector(totalPosts);

  const linkedIn = useSelector(linkedInPosts);

  return (
    <div>
      <h2>All Posts</h2>

      <h3>Total Posts : {count}</h3>

      <h3>LinkedIn Posts : {linkedIn.length}</h3>

      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            border: "1px solid gray",
            margin: "10px",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          <h3>{post.title}</h3>

          <p>Platform : {post.platform}</p>

          <button
            onClick={() => dispatch(deletePost(post.id))}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default PostList;