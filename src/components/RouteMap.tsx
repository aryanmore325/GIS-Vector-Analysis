import { MapContainer, TileLayer, Polyline, Marker } from 'react-leaflet';
import { Route } from '../types';
import 'leaflet/dist/leaflet.css';

interface RouteMapProps {
  routes: Route[];
  startPoint: [number, number] | null;
  endPoint: [number, number] | null;
}

const getTrafficColor = (level: Route['trafficLevel']) => {
  switch (level) {
    case 'low': return '#22c55e';
    case 'moderate': return '#eab308';
    case 'heavy': return '#ef4444';
    default: return '#3b82f6';
  }
};

export default function RouteMap({ routes, startPoint, endPoint }: RouteMapProps) {
  return (
    <MapContainer
      center={[19.0760, 72.8777]}
      zoom={12}
      className="w-full h-[500px] rounded-lg shadow-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {routes.map(route => (
        <Polyline
          key={route.id}
          positions={route.coordinates}
          color={getTrafficColor(route.trafficLevel)}
          weight={5}
        />
      ))}
      {startPoint && <Marker position={startPoint} />}
      {endPoint && <Marker position={endPoint} />}
    </MapContainer>
  );
}