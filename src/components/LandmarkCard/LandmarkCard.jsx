import "./LandmarkCard.css";

function LandmarkCard({ landmark }) {
  return (
    <div className="landmark-card">
      <div className="landmark-card__icon">{landmark.icon}</div>
      <h3 className="landmark-card__name">{landmark.name}</h3>
      <p className="landmark-card__details">
        Type: {landmark.type} | Time: {landmark.time} | {landmark.popularity}
      </p>
    </div>
  );
}

export default LandmarkCard;
