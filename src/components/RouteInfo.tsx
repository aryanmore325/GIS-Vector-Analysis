import { Route, TransportMode } from '../types';

interface RouteInfoProps {
  route: Route;
  onModeChange: (mode: TransportMode) => void;
  selectedMode: TransportMode;
}

const transportLabels = {
  car: 'Car',
  bus: 'Bus',
  bicycle: 'Bike',
  walking: 'Walk'
};

export default function RouteInfo({ route, onModeChange, selectedMode }: RouteInfoProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">{route.name}</h3>
        {route === route && (
          <div className="flex gap-2">
            {Object.keys(transportLabels).map((mode) => (
              <button
                key={mode}
                onClick={() => onModeChange(mode as TransportMode)}
                className={`px-3 py-1.5 rounded-md font-medium text-sm transition-colors ${
                  selectedMode === mode
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {transportLabels[mode as TransportMode]}
              </button>
            ))}
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Distance:</span>
          <span className="font-medium">{route.distance.toFixed(1)} km</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Duration:</span>
          <span className="font-medium">{Math.round(route.duration)} min</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Traffic:</span>
          <span className={`font-medium ${
            route.trafficLevel === 'low' ? 'text-green-500' :
            route.trafficLevel === 'moderate' ? 'text-yellow-500' :
            'text-red-500'
          }`}>
            {route.trafficLevel.charAt(0).toUpperCase() + route.trafficLevel.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
}