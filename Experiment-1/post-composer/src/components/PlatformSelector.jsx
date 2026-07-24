function PlatformSelector({ platform, setPlatform }) {
  return (
    <div className="card">
      <h3>Select Platform</h3>

      <select
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
      >
        <option>Twitter</option>
        <option>Facebook</option>
        <option>Instagram</option>
        <option>LinkedIn</option>
      </select>
    </div>
  );
}

export default PlatformSelector;