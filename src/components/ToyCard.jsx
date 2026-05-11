function ToyCard({ toy, onDelete, onLike }) {
  return (
    <div className="card">
      <img src={toy.image} alt={toy.name} />

      <h2>{toy.name}</h2>

      <p>{toy.likes} Likes</p>

      <button onClick={() => onLike(toy)}>
        Like ❤️
      </button>

      <button onClick={() => onDelete(toy.id)}>
        Donate 🗑️
      </button>
    </div>
  );
}

export default ToyCard;