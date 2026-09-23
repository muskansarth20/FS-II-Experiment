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
      <h3>Write Your Post</h3>

      <textarea
        rows="7"
        placeholder="Write something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <CharacterCounter
        count={text.length}
        limit={limit}
      />

      <button
        style={{
          marginTop: "15px",
          background: "#2196f3",
          color: "white",
        }}
        onClick={saveDraft}
      >
        {editing ? "Update Draft" : "Save Draft"}
      </button>
    </div>
  );
}

export default PostForm;