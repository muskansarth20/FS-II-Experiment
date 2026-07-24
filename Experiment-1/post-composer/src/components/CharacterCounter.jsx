function CharacterCounter({ count, limit }) {
  return (
    <div
      style={{
        marginTop: "10px",
        color: count > limit ? "red" : "green",
        fontWeight: "bold",
      }}
    >
      {count} / {limit}

      {count > limit ? (
        <p>❌ Character Limit Exceeded</p>
      ) : (
        <p>✅ Within Limit</p>
      )}
    </div>
  );
}

export default CharacterCounter;