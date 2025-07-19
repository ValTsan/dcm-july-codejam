# Import necessary libraries
import time
import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import plotly.express as px
import plotly.graph_objects as go

# Basline Model
from geopy.distance import geodesic

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

# Function to calculate the optimized route using the nearest neighbor algorithm
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

# Calculate the optimized route using the nearest neighbor algorithm
route, distance, duration = nearest_neighbor(locations)

# Add marker IDs
random_route['type'] = 'Random Route'
route['type'] = 'Optimized Route'

# Combine both routes into one DataFrame
final = pd.concat([random_route.assign(order=range(len(random_route))),
                      route.assign(order=range(len(route)))])

# Create the map
fig = go.Figure()

# Plot the random route
fig.add_trace(go.Scattergeo(
    lon=random_route['longitude'],
    lat=random_route['latitude'],
    mode='markers+lines',
    marker=dict(size=8, color='blue'),
    name=f'Baseline (Distance: {baseline_distance:.0f} km)',
    line=dict(color='blue', width=2),
))

# Plot optimized route
fig.add_trace(go.Scattergeo(
    lon=route['longitude'],
    lat=route['latitude'],
    mode='lines+markers',
    name=f'Optimized (Distance: {distance:.0f} km)',
    line=dict(color='green'),
    marker=dict(size=6)
))

# Step 4: Customize layout
fig.update_layout(
    title=f"Route Optimization Visualization<br><sub>Time to calculate optimized route: {duration:.2f} seconds</sub>",
    geo=dict(
        projection_type='natural earth',
        showland=True,
        landcolor='rgb(243, 243, 243)',
        countrycolor='rgb(204, 204, 204)'
    ),
    legend=dict(x=0.01, y=0.99),
    margin={"r":0,"t":50,"l":0,"b":0}
)

fig.update_layout(
    title=f"Route Optimization Visualization<br><sub>Time to calculate optimized route: {duration:.2f} seconds</sub>",
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

# Show interactive map
fig.show()

