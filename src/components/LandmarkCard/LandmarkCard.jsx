import "./LandmarkCard.css";
import landmarks from "../../utils/landmarks";

function LandmarkCard({ landmark }) {
  if (!landmark) return null;

  return (
    <div className="landmark-card">
      <img
        src={landmark.image}
        alt={landmark.name}
        className="landmark-card__image"
      />
      <h3 className="landmark-card__name">{landmark.name}</h3>
      <p className="landmark-card__details">
        Type: {landmark.type} | Time: {landmark.time} | Popularity:{" "}
        {landmark.popularity}
      </p>{" "}
    </div>
  );
}

export default LandmarkCard;
