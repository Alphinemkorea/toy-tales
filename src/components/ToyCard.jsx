function ToyCard({ toy, onLike, onDelete }) {
  if (!toy) return null;

  const { id, name, image, likes } = toy;

  function handleLike() {
    const updatedLikes = likes + 1;

    fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: updatedLikes }),
    })
      .then((res) => res.json())
      .then((updatedToy) => {
        onLike(updatedToy);
      });
  }

  function handleDelete() {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE",
    }).then(() => {
      onDelete(id);
    });
  }

  return (
    <div className="card" data-testid="toy-card">
      <img src={image} alt={name} />
      <h2>{name}</h2>

      <p>{likes} Likes</p>

      <button onClick={handleLike}>Like &lt;3</button>

      <button onClick={handleDelete}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;