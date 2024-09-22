import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { stations } from '../data/stations';
import L from 'leaflet';

// Metro icon
const metroIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/6851/6851539.png', // Replace with working icon URL
  iconSize: [25, 25],
  iconAnchor: [12, 25]
});

// Helper component to update map bounds and zoom based on the path
const UpdateMapBounds = ({ positions }) => {
  const map = useMap();

  useEffect(() => {
    if (positions.length > 0) {
      const bounds = L.latLngBounds(positions);
      map.fitBounds(bounds); // Fit the map view to the path
    }
  }, [positions, map]);

  return null;
};

const MapComponent = ({ path }) => {
  const positions = path.map(station => [station.lat, station.lng]);

  return (
    <MapContainer center={[28.6139, 77.2090]} zoom={11} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {stations.map((station, idx) => (
        <Marker key={idx} position={[station.lat, station.lng]} icon={metroIcon}>
          <Tooltip direction="top" offset={[0, -10]} permanent>
            {station.name}
          </Tooltip>
        </Marker>
      ))}

      {positions.length > 0 && (
        <>
          <Polyline positions={positions} color="blue" />
          <UpdateMapBounds positions={positions} />
        </>
      )}
    </MapContainer>
  );
};

export default MapComponent;
