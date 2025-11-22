import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [examples, setExamples] = useState([]);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch examples from backend
  const fetchExamples = async () => {
    try {
      const response = await fetch("/api/examples");
      const data = await response.json();
      setExamples(data.data);
    } catch (error) {
      console.error("Error fetching examples:", error);
    }
  };

  // Load examples on mount
  useEffect(() => {
    fetchExamples();
  }, []);

  // Create new example
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newName.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("/api/examples", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName,
          description: "Created from React",
        }),
      });

      if (response.ok) {
        setNewName("");
        fetchExamples(); // Refresh the list
      }
    } catch (error) {
      console.error("Error creating example:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Express</h1>

      <div className="card">
        <h2>Backend Connection Example</h2>

        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter example name"
            style={{ marginRight: "10px", padding: "8px" }}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Example"}
          </button>
        </form>

        <h3>Examples from Database:</h3>
        {examples.length === 0 ? (
          <p>No examples yet. Add one above!</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {examples.map((example) => (
              <li
                key={example.id}
                style={{
                  margin: "10px 0",
                  padding: "10px",
                  color: "#000000",
                  background: "#b0b0b0",
                  borderRadius: "4px",
                }}
              >
                <strong>{example.name}</strong>
                {example.description && (
                  <p style={{ margin: "5px 0 0 0" }}>{example.description}</p>
                )}
                <small style={{ color: "#2f2f2f" }}>
                  Created: {example.created_at}
                </small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default App;
