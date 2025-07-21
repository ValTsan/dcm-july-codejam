import time
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
from geopy.distance import geodesic
from dash import Dash, dcc, html, Input, Output
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

# Create cumulative distance and donut chart
cumulative = np.cumsum(legs_df['Distance_km'])
fig_cumulative = go.Figure()
fig_cumulative.add_trace(go.Scatter(
    x=legs_df['Leg'],
    y=cumulative,
    mode="lines+markers",
    line=dict(width=3),
    marker=dict(size=8)
))
fig_cumulative.update_layout(
    title="Cumulative Distance by Stop",
    xaxis_title="Leg",
    yaxis_title="Distance (km)",
    margin=dict(l=40, r=20, t=40, b=40))    


fig_donut = go.Figure(go.Pie(
    labels=legs_df['Leg'],
    values=legs_df['Distance_km'],
    hole=0.4,
    sort=False
))
fig_donut.update_layout(
    title="Distance Share per Leg",
    margin=dict(l=20, r=20, t=40, b=20))


improvement = (baseline_distance - distance) / baseline_distance * 100

fig_indicator = go.Figure(go.Indicator(
    mode="number+delta",
    value=distance,
    delta={"reference": baseline_distance, "relative": True, "valueformat": ".0%"},
    title={"text": "Optimized vs. Baseline<br><span style='font-size:0.7em;color:gray'>Total Distance (km)</span>"},
    number={"suffix": " km", "font": {"size": 36}},))

fig_indicator.update_layout(margin={"t":50,"b":0,"l":0,"r":0})

# Create the Dash app layout
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

dbc.Row([
    dbc.Col(
        dcc.Dropdown(
            id="route-type-dropdown",
            options=[
                {"label": "Optimized Route", "value": "optimized"},
                {"label": "Random Route",    "value": "random"}],
            value="optimized",
            clearable=False,
            style={"width": "250px"}),
        width={"size": 4, "offset": 4})], className="mb-3"),

    # Maplibre‑style map (now populated by callback)
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
     
    dbc.Row([
        dbc.Col(dcc.Graph(id="distance-indicator", figure=fig_indicator), width=4),
        dbc.Col(dcc.Graph(id="cumulative-distance-chart", figure=fig_cumulative), width=4),
        dbc.Col(dcc.Graph(id="distance-donut-chart",       figure=fig_donut),       width=4),
        ], className="mt-4"),        

], fluid=True, className="mt-4")

@app.callback(
    Output("maplibre-map", "figure"),
    Input("route-type-dropdown", "value")
)
def update_map(selected):
    df = route if selected == "optimized" else random_route
    fig = go.Figure()

    # Show all points
    fig.add_trace(go.Scattermapbox(
        lat=locations['latitude'],
        lon=locations['longitude'],
        mode='markers',
        marker=dict(size=8, color='blue'),
        name='Locations'
    ))
    # Draw the chosen route
    fig.add_trace(go.Scattermapbox(
        lat=list(df['latitude']) + [df['latitude'].iloc[0]],
        lon=list(df['longitude'])+ [df['longitude'].iloc[0]],
        mode='lines+markers',
        marker=dict(size=6, color='red'),
        line=dict(width=2),
        name=f"{selected.title()} Route"
    ))

    # Use `mapbox`, not `maplibre`
    fig.update_layout(
        mapbox={
            "style": "open-street-map",
            "center": {"lat": locations['latitude'].mean(), "lon": locations['longitude'].mean()},
            "zoom": 4
        },
        margin=dict(t=0, b=0, l=0, r=0)
    )
    return fig

if __name__ == '__main__':
    app.run(debug=True)

    cumulative = np.cumsum(legs_df['Distance_km'])
fig_cumulative = go.Figure()
fig_cumulative.add_trace(go.Scatter(
    x=legs_df['Leg'],
    y=cumulative,
    mode="lines+markers",
    line=dict(width=3),
    marker=dict(size=8)
))
fig_cumulative.update_layout(
    title="Cumulative Distance by Stop",
    xaxis_title="Leg",
    yaxis_title="Distance (km)",
    margin=dict(l=40, r=20, t=40, b=40))    


fig_donut = go.Figure(go.Pie(
    labels=legs_df['Leg'],
    values=legs_df['Distance_km'],
    hole=0.4,
    sort=False
))
fig_donut.update_layout(
    title="Distance Share per Leg",
    margin=dict(l=20, r=20, t=40, b=20))


improvement = (baseline_distance - distance) / baseline_distance * 100

fig_indicator = go.Figure(go.Indicator(
    mode="number+delta",
    value=distance,
    delta={"reference": baseline_distance, "relative": True, "valueformat": ".0%"},
    title={"text": "Optimized vs. Baseline<br><span style='font-size:0.7em;color:gray'>Total Distance (km)</span>"},
    number={"suffix": " km", "font": {"size": 36}},))

fig_indicator.update_layout(margin={"t":50,"b":0,"l":0,"r":0})

