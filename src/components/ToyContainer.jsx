import ToyCard from "./ToyCard";

function ToyContainer({ toys, onDelete, onLike }) {
  return (
    <div className="card-container">
      {toys.length > 0 ? (
        toys.map((toy) => (
          <ToyCard
            key={toy.id}
            toy={toy}
            onDelete={onDelete}
            onLike={onLike}
          />
        ))
      ) : (
        <p>No toys found...</p>
      )}
    </div>
  );
}

export default ToyContainer;