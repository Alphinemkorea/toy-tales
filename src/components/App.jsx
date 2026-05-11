import { useEffect, useState } from "react";
import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [toys, setToys] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // GET toys
  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((res) => res.json())
      .then((data) => setToys(data))
      .catch((err) => console.log("Fetch error:", err));
  }, []);

  // ADD toy (POST)
  function addToy(newToy) {
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToy),
    })
      .then((res) => res.json())
      .then((data) => setToys([...toys, data]));
  }

  // DELETE toy
  function handleDelete(id) {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE",
    }).then(() => {
      setToys(toys.filter((toy) => toy.id !== id));
    });
  }

  // LIKE toy (PATCH)
  function handleLike(toy) {
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: toy.likes + 1,
      }),
    })
      .then((res) => res.json())
      .then((updatedToy) => {
        setToys(
          toys.map((t) =>
            t.id === updatedToy.id ? updatedToy : t
          )
        );
      });
  }

  return (
    <>
      <Header />

      <button onClick={() => setShowForm(!showForm)}>
        Add a Toy
      </button>

      {showForm && <ToyForm addToy={addToy} />}

      <ToyContainer
        toys={toys}
        onDelete={handleDelete}
        onLike={handleLike}
      />
    </>
  );
}

export default App;