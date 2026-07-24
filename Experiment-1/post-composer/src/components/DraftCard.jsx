function DraftCard({
  draft,
  editDraft,
  deleteDraft,
}) {
  return (
    <div className="card">
      <h3>{draft.platform}</h3>

      <p>{draft.text}</p>

      <small>{draft.date}</small>

      <div
        style={{
          marginTop: "15px",
          display: "flex",
          gap: "10px",
        }}
      >
        <button
          style={{
            background: "orange",
            color: "white",
          }}
          onClick={() => editDraft(draft)}
        >
          ✏ Edit
        </button>

        <button
          style={{
            background: "crimson",
            color: "white",
          }}
          onClick={() => deleteDraft(draft.id)}
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
}

export default DraftCard;