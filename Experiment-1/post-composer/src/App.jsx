import { useState, useEffect } from "react";
import "./App.css";

import Header from "./components/Header";
import PlatformSelector from "./components/PlatformSelector";
import PostForm from "./components/PostForm";
import Preview from "./components/Preview";
import DraftCard from "./components/DraftCard";
import Notification from "./components/Notification";

import platforms from "./data/platforms";
import { validatePost } from "./utils/validator";

function App() {
  const [platform, setPlatform] = useState("Twitter");
  const [text, setText] = useState("");
  const [drafts, setDrafts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [notification, setNotification] = useState("");

  // Load drafts
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("drafts")) || [];
    setDrafts(saved);
  }, []);

  // Save drafts
  useEffect(() => {
    localStorage.setItem("drafts", JSON.stringify(drafts));
  }, [drafts]);

  const saveDraft = () => {
    if (!validatePost(text, platforms[platform])) {
      setNotification("❌ Character limit exceeded!");
      return;
    }

    if (editingId) {
      const updated = drafts.map((d) =>
        d.id === editingId
          ? { ...d, platform, text, date: new Date().toLocaleString() }
          : d
      );

      setDrafts(updated);
      setEditingId(null);
      setNotification("✅ Draft Updated");
    } else {
      const draft = {
        id: Date.now(),
        platform,
        text,
        date: new Date().toLocaleString(),
      };

      setDrafts([draft, ...drafts]);
      setNotification("✅ Draft Saved");
    }

    setText("");

    setTimeout(() => setNotification(""), 2500);
  };

  const editDraft = (draft) => {
    setEditingId(draft.id);
    setPlatform(draft.platform);
    setText(draft.text);
  };

  const deleteDraft = (id) => {
    const updated = drafts.filter((d) => d.id !== id);
    setDrafts(updated);

    setNotification("🗑️ Draft Deleted");

    setTimeout(() => setNotification(""), 2500);
  };

  return (
    <div className="container">
      <Header />

      <PlatformSelector
        platform={platform}
        setPlatform={setPlatform}
      />

      <PostForm
        text={text}
        setText={setText}
        saveDraft={saveDraft}
        editing={editingId}
        limit={platforms[platform]}
      />

      <Preview
        platform={platform}
        text={text}
      />

      <h2>Saved Drafts</h2>

      <div className="draft-list">
        {drafts.length === 0 ? (
          <p>No Drafts Available</p>
        ) : (
          drafts.map((draft) => (
            <DraftCard
              key={draft.id}
              draft={draft}
              editDraft={editDraft}
              deleteDraft={deleteDraft}
            />
          ))
        )}
      </div>

      {notification && (
        <Notification message={notification} />
      )}
    </div>
  );
}

export default App;