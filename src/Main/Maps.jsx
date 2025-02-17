import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';
import LoadingSpinner from '../Common/LoadingSpinner';

// Fix Leaflet icon issue
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconShadow from 'leaflet/dist/images/marker-shadow.png';

// Set up default marker icon
const defaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerIconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = defaultIcon;

function Maps({ onLoad, loading }) {
  const [position] = useState([28.6139, 77.2090]); // Default to Delhi coordinates
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (mapReady) {
      onLoad();
    }
  }, [mapReady, onLoad]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[400px] bg-gray-100 rounded-lg">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg"
    >
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        whenReady={() => setMapReady(true)}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            Your current location
          </Popup>
        </Marker>
      </MapContainer>
    </motion.div>
  );
}

export default Maps; 