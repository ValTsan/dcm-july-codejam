# 🗺️ Best Summer Sightseeing Roadtrip

This is a collaborative MVP project for the **July SE + DS Code Jam**. Our app recommends the best summer sightseeing route across the U.S. based on popular landmarks and photo data, combining mapping tools, user interface, and data science logic. 

We aim to optimize a cross-country road trip by minimizing total travel distance between ten iconic U.S. landmarks and natural attractions. The project includes a baseline model (random route) and an optimized model (minimized distance), along with visualizations for route insights.
Highlights:
- Route planning using geographic coordinates
- Interactive maps and pie charts for leg distances
- A lightweight visualization app for the SE team
- Full technical analysis and modeling in the notebook

🌐 Live Demo: https://daytrippr.netlify.app 

## 🏗️ Project Structure

```
project/
│
├── ds/                      # Data science assets and visualizations
│   ├── app.py               # Dash app with full route visualizations
│   ├── app_se.py            # Streamlined version for SE team (graphs only)
│   ├── notebook.ipynb       # Jupyter notebook with full technical report
│   ├── data.csv             # Landmark and route data
│   └── requirements.txt     # Python dependencies
│
└── README.md                # Project overview and documentation
```

## 🛠️ Tech Stack
💻 Frontend (SE)
- ⚡️ Vite + React – Frontend Framework
- 🗺️ Mapbox GL JS – Interactive map rendering
- 🎨 CSS Modules – Modular styling for components
- 📂 JSON – Shared data format from DS output

📊 Data Science (DS)
- 🐍 Python – Core language for modeling and analysis
- 🧮 NumPy – Numerical operations
- 🐼 Pandas – Data wrangling and manipulation
- 🌍 Geopy – Geospatial distance calculations
- 📈 Plotly + Dash – Visualizations and interactive charts
- 📓 Jupyter Notebook – Exploratory data analysis and reporting

## How to Run 🚀

1. Clone this repository: git clone https://github.com/ValTsan/dcm-july-codejam.git
2. Navigate to the project folder and install dependencies: 
   - cd dcm-july-codejam
   - npm install
3. Start the development server: npm start / npm run dev 
4. Open http://localhost:5173 in your browser 🖥️

## 📍 Dataset
The dataset is manually curated and includes 10 major U.S. landmarks with the following columns:
- `name`
- `state`
- `latitude`
- `longitude`
- `category`

## 🧪 Key Results Summary
Pie Chart Insights:
- Longest leg: Golden Gate Bridge → Great Smoky Mountains (41.5%)
- Shortest leg: Grand Canyon → Zion National Park (1.86%)
- Second longest: Mount Rushmore → Yosemite (18.1%)

## Conclusion:
A single long leg significantly affects the total trip length. This emphasizes the value of route optimization and planning for budget, time, and fuel usage.

# 🤝 SE and DS July Code Jam Collaboration 

## 👩‍💻 Software Engineers 
-  Built responsive front-end using React and CSS Modules 
-  Integrated interactive Mapbox map to display landmark markers  
-  Rendered scrollable landmark cards from JSON data
-  Developed filters and sorting UI with React Select
-  Coordinated with DS team to visualize route data

## 📊 Data Scientist
- Cleaned and pre-processed location and landmark data
- Analyzed review counts and photo frequency for ranking stops
- Provided structured JSON output for SE integration

## ✨ Features
- Interactive map showing top U.S. Landmarks
- Clickable landmark cards with detailed images 
- Scrollable card layout linked to map
- Modular and scalable file structure

# 👥 Collaborators

- Valerie Tsan (SE)
- Steven Bolin (SE)
- Jeel Faldu (DS)
- Viktor Kliufinskyi (DS)
  
## License 📄
This project is licensed under the MIT License.
You’re free to use it, remix it, and make it your own.
