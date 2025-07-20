import time
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from geopy.distance import geodesic
from dash import Dash, dcc, html
import dash_bootstrap_components as dbc

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

# Initialize the Dash app with Bootstrap theme
app = Dash(__name__, external_stylesheets=[dbc.themes.BOOTSTRAP])

# Assuming `random_route`, `route`, `locations`, `baseline_distance`, `distance`, and `duration` are already defined

# Calculate leg distances for bar chart
leg_dists = []
for i in range(len(route) - 1):
    start = (route.iloc[i]['latitude'], route.iloc[i]['longitude'])
    end = (route.iloc[i + 1]['latitude'], route.iloc[i + 1]['longitude'])
    d = geodesic(start, end).km
    leg_dists.append({'Leg': f"{route.iloc[i]['name']} → {route.iloc[i+1]['name']}", 'Distance_km': d})

legs_df = pd.DataFrame(leg_dists)

app.layout = dbc.Container([
    dbc.Row([
        dbc.Col(
            dbc.Card(
                dbc.CardBody([
                    html.H1("Route Optimization Dashboard", className="text-center mb-4"),
                    html.Hr()
                ])
            ),
            width=12
        )
    ]),

# Maplibre-style map
    dbc.Row([
        dbc.Col(
            dcc.Graph(
                id='maplibre-map',
                figure=go.Figure([
                    go.Scattermapbox(
                        lat=locations['latitude'],
                        lon=locations['longitude'],
                        mode='markers',
                        marker=go.scattermapbox.Marker(size=10, color='blue'),
                        text=locations['name'],
                        name='Locations'
                    ),
                    go.Scattermapbox(
                        lat=route['latitude'].tolist() + [route['latitude'].iloc[0]],
                        lon=route['longitude'].tolist() + [route['longitude'].iloc[0]],
                        mode='lines+markers+text',
                        marker=dict(size=7, color='red'),
                        line=dict(width=2, color='red'),
                        text=route['name'],
                        textposition="top right",
                        name='Optimized Route'
                    )
                ]).update_layout(
                    title=f"Optimized Route Map<br><sub>Initial Distance: {baseline_distance:.2f} km | "
                          f"Optimized Distance: {distance:.2f} km | Computation Time: {duration:.2f} sec</sub>",
                    hovermode='closest',
                    mapbox=dict(
                        style='open-street-map',
                        center=dict(lat=locations['latitude'].mean(), lon=locations['longitude'].mean()),
                        zoom=4
                    ),
                    margin=dict(t=60, b=60)
                )
            ),
            width=12
        )
    ]),
    
    # Bar Chart (Distance per leg)
    dbc.Row([
        dbc.Col(
            dcc.Graph(
                id='distance-bar-chart',
                figure=px.bar(
                    legs_df,
                    x='Leg',
                    y='Distance_km',
                    hover_data={'Distance_km': ':.1f'},
                    labels={'Distance_km': 'Distance (km)'},
                    title='Optimized Route: Distance per Leg'
                ).update_layout(
                    xaxis_tickangle=-45,
                    margin=dict(t=60, b=150)
                )
            ),
            width=12
        )
    ]),
], fluid=True, className="mt-4")

if __name__ == '__main__':
    app.run(debug=True)