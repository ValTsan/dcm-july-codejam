import "./LandmarkList.css";
import LandmarkCard from "../LandmarkCard/LandmarkCard";
import landmarks from "../../utils/landmarks";

function LandmarkList() {
  return (
    <div className="landmark-list">
      <h2 className="landmark-list__title">Landmarks</h2>
      <p className="landmark-list__subtitle">
        Click on a landmark to see details
      </p>

      <div className="landmark-list__card-scroll">
        {landmarks.map((landmark, index) => (
          <div key={index} className="landmark-list__card">
            <img
              src={landmark.image}
              alt={landmark.name}
              className="landmark-list__image"
            />
            {/* <div className="landmark-list__icon">{landmark.icon}</div> */}
            <div className="landmark-list__info">
              <h3 className="landmark-list__name">{landmark.name}</h3>
              <p className="landmark-list__rating">
                ⭐ {landmark.popularity.toLocaleString()}
              </p>
              <span className="landmark-list__tag">{landmark.type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LandmarkList;
