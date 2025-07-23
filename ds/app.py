import time
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
from geopy.distance import geodesic
from dash import Dash, dcc, html, Input, Output
import dash_bootstrap_components as dbc

# Load dataset
data = pd.read_csv('ds/data.csv')
locations = data[['name', 'latitude', 'longitude']]

# Create random route
random_route = locations.sample(frac=1, random_state=7).reset_index(drop=True)

# Function to calculate total distance of a route
def total_distance(route):
    distance = 0
    for i in range(len(route) - 1):
        start = (route.iloc[i]['latitude'], route.iloc[i]['longitude'])
        end = (route.iloc[i + 1]['latitude'], route.iloc[i + 1]['longitude'])
        distance += geodesic(start, end).km
    return distance

# Calculate the baseline distance of the random route
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

# Optimized route
route, distance, duration = nearest_neighbor(locations)

# Add 'type' for dropdown comparison
random_route['type'] = 'Random Route'
route['type'] = 'Optimized Route'

# Leg distances
leg_dists = []
for i in range(len(route) - 1):
    start = (route.iloc[i]['latitude'], route.iloc[i]['longitude'])
    end = (route.iloc[i + 1]['latitude'], route.iloc[i + 1]['longitude'])
    d = geodesic(start, end).km
    leg_dists.append({'Leg': f"{route.iloc[i]['name']} → {route.iloc[i+1]['name']}", 'Distance_km': d})

leg_dists_df = pd.DataFrame(leg_dists)

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
    title= {
        'text': "Cumulative Distance by Stop",
        'x': 0.5,
        'xanchor': 'center',
        'yanchor': 'top',
        'font': {'size': 20}
    },
    xaxis_title="Leg",
    yaxis_title="Distance (km)",
    margin=dict(l=40, r=20, t=40, b=40))

# Donut Chart (Share per Leg)
fig_donut = go.Figure(go.Pie(
    labels=leg_dists_df['Leg'],
    values=leg_dists_df['Distance_km'],
    hole=0.4,
    sort=False,
))
fig_donut.update_layout(
    title={'text': "Distance Share per Leg", 'x': 0.5, 'xanchor': 'center', 'yanchor': 'top', 'font': {'size': 20}},
    margin=dict(l=40, r=40, t=40, b=40),
    legend=dict(
        x=1.02,
        y=0.5,
        xanchor='left',
        yanchor='middle')
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
    margin=dict(t=40, b=120),
    title={'text': 'Estimated Travel Time per Leg', 'x': 0.5, 'xanchor': 'center', 'yanchor': 'top', 'font': {'size': 20}}
)

# Initialize Dash App
app = Dash(__name__, external_stylesheets=[dbc.themes.BOOTSTRAP])

# Layout
app.layout = dbc.Container([
    dbc.Row([
        dbc.Col(dbc.Card(dbc.CardBody([
            html.H1("Route Optimization Dashboard", className="text-center mb-4"),
            html.Hr()
        ])), width=12)
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
            width={"size": 4, "offset": 4}
        )
    ], className="mb-3"),

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
                          f"Optimized Distance: {distance:.2f} km | Time: {duration:.2f} sec</sub>",
                    hovermode='closest',
                    mapbox=dict(
                        style='open-street-map',
                        center=dict(lat=locations['latitude'].mean(), lon=locations['longitude'].mean()),
                        zoom=4
                    ),
                    margin=dict(t=60, b=60)
                )
            ), width=12
        )
    ]),

    dbc.Row([
        dbc.Col(dcc.Graph(
            id='distance-bar-chart',
            figure=px.bar(
                leg_dists_df,
                x='Leg',
                y='Distance_km',
                color='Distance_km',
                color_continuous_scale=px.colors.sequential.Oranges,
                hover_data={'Distance_km': ':.1f'},
                labels={'Distance_km': 'Distance (km)'},
                title='Optimized Route: Distance per Leg'
            ).update_layout(
                xaxis_tickangle=-45,
                margin=dict(t=60, b=150)
            )
        ), width=12)
    ]),

    dbc.Row([
        dbc.Col(dcc.Graph(id="distance-indicator", 
                          figure=fig_indicator), 
                          width=4),
    ]),       

    dbc.Row([
        dbc.Col(dcc.Graph(id="cumulative-distance-chart", 
                          figure=fig_cumulative), 
                          width=4),
    ]),

    dbc.Row([
        dbc.Col(dcc.Graph(id="distance-donut-chart", 
                          figure=fig_donut), 
                          width=4),
    ], className="mt-4"),

    dbc.Row([
        dbc.Col(dcc.Graph(id="travel-time-chart", figure=fig_time), width=12)
    ], className="mt-4")

], fluid=True)

# Callback for route type switch
@app.callback(
    Output("maplibre-map", "figure"),
    Input("route-type-dropdown", "value")
)
def update_map(selected):
    df = route if selected == "optimized" else random_route
    fig = go.Figure()

    fig.add_trace(go.Scattermapbox(
        lat=locations['latitude'],
        lon=locations['longitude'],
        mode='markers',
        marker=dict(size=8, color='blue'),
        name='Locations'
    ))

    fig.add_trace(go.Scattermapbox(
        lat=list(df['latitude']) + [df['latitude'].iloc[0]],
        lon=list(df['longitude']) + [df['longitude'].iloc[0]],
        mode='lines+markers',
        marker=dict(size=6, color='red'),
        line=dict(width=2),
        name=f"{selected.title()} Route"
    ))

    fig.update_layout(
        mapbox=dict(
            style="open-street-map",
            center={"lat": locations['latitude'].mean(), "lon": locations['longitude'].mean()},
            zoom=4
        ),
        margin=dict(t=0, b=0, l=0, r=0)
    )
    return fig

if __name__ == '__main__':
    app.run(debug=True)
