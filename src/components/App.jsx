import { useEffect, useState } from "react";
import ToyCard from "./ToyCard";
import ToyForm from "./ToyForm";

function App() {
  const [toys, setToys] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // FETCH TOYS ON LOAD
  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((res) => res.json())
      .then((data) => {
        setToys(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.log("FETCH ERROR:", err));
  }, []);

  // CREATE TOY
  function handleAddToy(newToy) {
    setToys((prev) => [...prev, newToy]);
  }

  // LIKE TOY (UPDATE STATE AFTER PATCH)
  function handleLike(updatedToy) {
    setToys((prev) =>
      prev.map((toy) => (toy.id === updatedToy.id ? updatedToy : toy))
    );
  }

  // DELETE TOY (REMOVE FROM STATE AFTER DELETE)
  function handleDelete(id) {
    setToys((prev) => prev.filter((toy) => toy.id !== id));
  }

  return (
    <div>
      <header>
        <h1>Toy App</h1>
      </header>

      {/* TOGGLE FORM */}
      <button onClick={() => setShowForm((prev) => !prev)}>
        Create New Toy
      </button>

      {/* FORM */}
      {showForm && <ToyForm onAddToy={handleAddToy} />}

      {/* TOY LIST */}
      <div className="card-container">
        {toys.length > 0 ? (
          toys.map((toy) => (
            <ToyCard
              key={toy.id}
              toy={toy}
              onLike={handleLike}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p style={{ textAlign: "center" }}>No toys found...</p>
        )}
      </div>
    </div>
  );
}

export default App;