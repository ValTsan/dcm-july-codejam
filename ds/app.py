import time
import folium
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from geopy.distance import geodesic
import os
import webbrowser

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

# Add 'type' for plotly
random_route['type'] = 'Random Route'
route['type'] = 'Optimized Route'

# Plotly: visualize both routes on map
fig = go.Figure()

# Random route trace (blue)
fig.add_trace(go.Scattergeo(
    lon=random_route['longitude'],
    lat=random_route['latitude'],
    mode='markers+lines',
    marker=dict(size=6, color='blue'),
    line=dict(color='blue', width=2),
    name=f'Random Route (Distance: {baseline_distance:.0f} km)'
))

# Optimized route trace (green)
fig.add_trace(go.Scattergeo(
    lon=route['longitude'],
    lat=route['latitude'],
    mode='markers+lines',
    marker=dict(size=6, color='green'),
    line=dict(color='green', width=3),
    name=f'Optimized Route (Distance: {distance:.0f} km)'
))

fig.update_layout(
    title=f"Route Optimization Visualization<br><sub>Calculation time: {duration:.2f} seconds</sub>",
    geo=dict(
        scope='usa',
        projection_type='albers usa',
        showland=True,
        landcolor='rgb(243, 243, 243)',
        countrycolor='rgb(204, 204, 204)'
    ),
    legend=dict(x=0.01, y=0.99),
    margin={"r":0,"t":50,"l":0,"b":0}
)

fig.show()

# Plot distances per leg of optimized route as bar chart
leg_dists = []
for i in range(len(route) - 1):
    start = (route.iloc[i]['latitude'], route.iloc[i]['longitude'])
    end = (route.iloc[i + 1]['latitude'], route.iloc[i + 1]['longitude'])
    d = geodesic(start, end).km
    leg_dists.append({'Leg': f"{route.iloc[i]['name']} → {route.iloc[i+1]['name']}", 'Distance_km': d})

legs_df = pd.DataFrame(leg_dists)

fig2 = px.bar(
    legs_df,
    x='Leg',
    y='Distance_km',
    hover_data={'Distance_km': ':.1f'},
    labels={'Distance_km': 'Distance (km)'},
    title='Optimized Route: Distance per Leg'
)

fig2.update_layout(xaxis_tickangle=-45, margin=dict(t=60, b=150))
fig2.show()

# Folium map centered on USA
map_center = [39.8283, -98.5795]  # USA geographic center
map = folium.Map(location=map_center, zoom_start=5, tiles='CartoDB positron')

# Add random route in blue
folium.PolyLine(
    random_route[['latitude', 'longitude']].values,
    color='blue',
    weight=3,
    opacity=0.6,
    tooltip='Random Route'
).add_to(map)

# Add optimized route in green
folium.PolyLine(
    route[['latitude', 'longitude']].values,
    color='green',
    weight=5,
    opacity=0.8,
    tooltip='Optimized Route'
).add_to(map)

# Add markers for optimized route stops
for idx, row in route.iterrows():
    folium.Marker(
        location=[row['latitude'], row['longitude']],
        popup=row['name'],
        tooltip=f"Optimized Stop {idx + 1}",
        icon=folium.Icon(color='green', icon='flag')
    ).add_to(map)

# Add markers for random route stops
for idx, row in random_route.iterrows():
    folium.CircleMarker(
        location=[row['latitude'], row['longitude']],
        radius=4,
        color='blue',
        fill=True,
        fill_color='blue',
        fill_opacity=0.6,
        popup=row['name'],
        tooltip=f"Random Stop {idx + 1}"
    ).add_to(map)

# Add info marker for optimized route distance and time at center of optimized route
info = f"Optimized Distance: {distance:.2f} km<br>Calculation Time: {duration:.2f} s"
route_center = [route['latitude'].mean(), route['longitude'].mean()]

folium.Marker(
    location=route_center,
    popup=folium.Popup(info, max_width=300),
    icon=folium.Icon(color='blue', icon='info-sign')
).add_to(map)

# Save and open the Folium map
map_file = "route_map.html"
map.save(map_file)
webbrowser.open(f"file://{os.path.abspath(map_file)}")
