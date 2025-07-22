import time
import pandas as pd
import numpy as np
import plotly.graph_objects as go
import plotly.express as px
from geopy.distance import geodesic
import plotly.io as pio

# Load the dataset
data = pd.read_csv('ds/data.csv')

# Extract relevant columns for locations
locations = data[['name', 'latitude', 'longitude']]

# Create random route
random_route = locations.sample(frac=1, random_state=7).reset_index(drop=True)

# Function to calculate the total distance of a route
def total_distance(route):
    distance = 0
    for i in range(len(route) - 1):
        start = (route.iloc[i]['latitude'], route.iloc[i]['longitude'])
        end = (route.iloc[i + 1]['latitude'], route.iloc[i + 1]['longitude'])
        distance += geodesic(start, end).km
    return distance

baseline_distance = total_distance(random_route)

# Nearest neighbor algorithm for optimized route
def nearest_neighbor(locations):
    start_time = time.time()

    unvisited = locations.copy().reset_index(drop=True)
    route = []

    current_location = unvisited.iloc[0]
    route.append(current_location)
    unvisited = unvisited.drop(index=0).reset_index(drop=True)

    while not unvisited.empty:
        min_distance = float('inf')
        nearest_index = None

        for index, location in unvisited.iterrows():
            dist = geodesic(
                (current_location['latitude'], current_location['longitude']),
                (location['latitude'], location['longitude'])
            ).km
            if dist < min_distance:
                min_distance = dist
                nearest_index = index

        current_location = unvisited.iloc[nearest_index]
        route.append(current_location)
        unvisited = unvisited.drop(index=nearest_index).reset_index(drop=True)

    route_df = pd.DataFrame(route)
    duration = time.time() - start_time
    return route_df, total_distance(route_df), duration

# Calculate optimized route
route, distance, duration = nearest_neighbor(locations)

# Calculate leg distances for bar chart
leg_dists = []
for i in range(len(route) - 1):
    start = (route.iloc[i]['latitude'], route.iloc[i]['longitude'])
    end = (route.iloc[i + 1]['latitude'], route.iloc[i + 1]['longitude'])
    d = geodesic(start, end).km
    leg_dists.append({'Leg': f"{route.iloc[i]['name']} → {route.iloc[i+1]['name']}", 'Distance_km': d})

leg_dists_df = pd.DataFrame(leg_dists)

#  Map Visualization
fig_map = go.Figure()

# Markers for all locations
fig_map.add_trace(go.Scattermapbox(
    lat=locations['latitude'],
    lon=locations['longitude'],
    mode='markers',
    marker=dict(size=8, color='blue'),
    text=locations['name'],
    name='Locations'
))

# Optimized route
fig_map.add_trace(go.Scattermapbox(
    lat=route['latitude'].tolist() + [route['latitude'].iloc[0]],
    lon=route['longitude'].tolist() + [route['longitude'].iloc[0]],
    mode='lines+markers',
    marker=dict(size=6, color='red'),
    line=dict(width=2, color='red'),
    name='Optimized Route'
))

# Random route
fig_map.add_trace(go.Scattermapbox(
    lat=random_route['latitude'].tolist() + [random_route['latitude'].iloc[0]],
    lon=random_route['longitude'].tolist() + [random_route['longitude'].iloc[0]],
    mode='lines+markers',
    marker=dict(size=6, color='green'),
    line=dict(width=2, color='green'),
    name='Random Route'
))

fig_map.update_layout(
    mapbox_style='open-street-map',
    mapbox_center={"lat": locations['latitude'].mean(), "lon": locations['longitude'].mean()},
    mapbox_zoom=4,
    margin=dict(t=40, b=40),
    title=f"Routes Comparison<br><sub>Initial: {baseline_distance:.2f} km | Optimized: {distance:.2f} km | Time: {duration:.2f} sec</sub>"
)

# Bar Chart (Distance per Leg)
fig_bar = px.bar(
    leg_dists_df,
    x='Leg',
    y='Distance_km',
    color='Distance_km',
    color_continuous_scale=px.colors.sequential.Oranges,
    hover_data={'Distance_km': ':.1f'},
    title='Optimized Route: Distance per Leg',
    labels={'Distance_km': 'Distance (km)'},
).update_layout(
    xaxis_tickangle=-45, 
    margin=dict(t=40, b=150),
    )

# Donut Chart (Share per Leg)
fig_donut = go.Figure(go.Pie(
    labels=leg_dists_df['Leg'],
    values=leg_dists_df['Distance_km'],
    hole=0.4,
    sort=False,
))
fig_donut.update_layout(
    title="Distance Share per Leg",
    margin=dict(l=20, r=20, t=40, b=20)
)

# Distance Improvement Indicator
improvement = (baseline_distance - distance) / baseline_distance * 100
fig_indicator = go.Figure(go.Indicator(
    mode="number+delta",
    value=distance,
    delta={"reference": baseline_distance, "relative": True, "valueformat": ".1%"},
    title={"text": "Optimized vs. Baseline<br><span style='font-size:0.7em;color:gray'>Total Distance (km)</span>"},
    number={"suffix": " km", "font": {"size": 36}}
))
fig_indicator.update_layout(margin={"t":50,"b":0,"l":0,"r":0})


# Cumulative Distance Chart
cumulative = np.cumsum(leg_dists_df['Distance_km'])
fig_cumulative = go.Figure()
fig_cumulative.add_trace(go.Scatter(
    x=leg_dists_df['Leg'],
    y=cumulative,
    mode="lines+markers",
    line=dict(width=3, color='orange'),
    marker=dict(size=8)
))
fig_cumulative.update_layout(
    title="Cumulative Distance by Stop",
    xaxis_title="Leg",
    yaxis_title="Distance (km)",
    margin=dict(l=40, r=20, t=40, b=40))  

# Travel time (assuming 60 km/h)
leg_dists_df['Time_h'] = leg_dists_df['Distance_km'] / 60
fig_time = px.bar(
    leg_dists_df,
    x='Leg',
    y='Time_h',
    color='Time_h',
    color_continuous_scale=px.colors.sequential.Oranges,
    hover_data={'Time_h': ':.1f'},
    labels={'Time_h': 'Time (h)'},
    title='Estimated Travel Time per Leg'
).update_layout(
    xaxis_tickangle=-45,
    margin=dict(t=40, b=120)
)

# Show all figures
fig_map.show()
fig_bar.show()
fig_time.show()
fig_donut.show()
fig_indicator.show()
fig_cumulative.show()

 