import { useState } from "react";

function ToyForm({ onAddToy }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newToy = {
      name,
      image,
      likes: 0,
    };

    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToy),
    })
      .then((res) => res.json())
      .then((data) => {
        onAddToy(data);
        setName("");
        setImage("");
      })
      .catch((err) => console.error("POST ERROR:", err));
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Enter a toy's name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Enter a toy's image URL..."
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <button type="submit">Add Toy</button>
    </form>
  );
}

export default ToyForm;