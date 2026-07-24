import CharacterCounter from "./CharacterCounter";

function PostForm({
  text,
  setText,
  saveDraft,
  editing,
  limit,
}) {
  return (
    <div className="card">
      <h2>Write Your Post</h2>

      <textarea
        rows="6"
        placeholder="Write your post here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <CharacterCounter
        count={text.length}
        limit={limit}
      />

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "10px",
        }}
      >
        <button
          onClick={saveDraft}
          style={{
            backgroundColor: "#1976d2",
            color: "white",
          }}
        >
          {editing ? "Update Draft" : "Save Draft"}
        </button>
      </div>
    </div>
  );
}

export default PostForm;