import "./LandmarkCard.css";
import landmarks from "../../utils/landmarks";
import summary from "../../utils/summary";

function getDifficultyByDistance(distance) {
  if (distance <= 5000) return "Easy";
  if (distance <= 10000) return "Medium";
  return "Hard";
}

function LandmarkCard({ landmark, onAddToTrip }) {
  if (!landmark) return null;

  const { optimized_distance } = summary[0];
  const difficulty = getDifficultyByDistance(optimized_distance);

  return (
    <div className="landmark-card">
      <img
        src={landmark.image}
        alt={landmark.name}
        className="landmark-card__image"
      />
      <h3 className="landmark-card__name">{landmark.name}</h3>
      <p className="landmark-card__rating">
        ⭐️⭐️⭐️⭐️{" "}
        <span className="landmark-card__rating-count">
          ({landmark.popularity.toLocaleString()} reviews)
        </span>
      </p>
      <div className="landmark-card__tags">
        <span className="landmark-card__tag">{landmark.type}</span>
        <span className="landmark-card__tag">{difficulty}</span>

        <p className="landmark-card__description">{landmark.description}</p>
      </div>
      <p className="landmark-card__details">
        {landmark.type} | Time: {landmark.time} | Popularity:{" "}
        {landmark.popularity}
      </p>{" "}
      <button
        className="landmark-card__button"
        onClick={() => onAddToTrip(landmark)}
      >
        Add to My Trip
      </button>
    </div>
  );
}

export default LandmarkCard;
