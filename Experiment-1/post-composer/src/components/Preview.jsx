function Preview({ platform, text }) {
  return (
    <div className="preview">
      <h2>Live Preview</h2>

      <h3>{platform}</h3>

      <hr />

      <p>
        {text || "Your post preview will appear here..."}
      </p>
    </div>
  );
}

export default Preview;