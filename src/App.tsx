import React, { useState, useEffect } from 'react';
import { Route, TransportMode, Location } from './types';
import RouteMap from './components/RouteMap';
import RouteInfo from './components/RouteInfo';
import LocationSelector from './components/LocationSelector';

// Mumbai coordinates and routes
const MUMBAI_LOCATIONS: Record<string, Location> = {
  csmt: { name: 'CSMT', coordinates: [18.9398, 72.8354] },
  bandra: { name: 'Bandra', coordinates: [19.0596, 72.8295] },
  worli: { name: 'Worli', coordinates: [19.0178, 72.8478] },
  marineDrive: { name: 'Marine Drive', coordinates: [18.9825, 72.8315] },
  dadar: { name: 'Dadar', coordinates: [19.0178, 72.8478] },
  kurla: { name: 'Kurla', coordinates: [19.0870, 72.8890] },
  andheri: { name: 'Andheri', coordinates: [19.1136, 72.8697] },
  colaba: { name: 'Colaba', coordinates: [18.9067, 72.8147] },
  powai: { name: 'Powai', coordinates: [19.1176, 72.9060] }
};

const generateRoutes = (
  startCoords: [number, number],
  endCoords: [number, number],
  mode: TransportMode
): Route[] => {
  const trafficLevels: Route['trafficLevel'][] = ['low', 'moderate', 'heavy'];
  
  // Generate routes based on start and end points
  const routes = [
    {
      name: 'Direct Route',
      via: [],
      baseDistance: 10
    },
    {
      name: 'Alternative Route 1',
      via: [MUMBAI_LOCATIONS.dadar.coordinates],
      baseDistance: 12
    },
    {
      name: 'Alternative Route 2',
      via: [MUMBAI_LOCATIONS.kurla.coordinates],
      baseDistance: 14
    }
  ];

  return routes.map(template => ({
    id: Math.random().toString(),
    name: template.name,
    mode,
    distance: template.baseDistance + Math.random() * 2,
    duration: template.baseDistance * 3 + Math.random() * 20,
    trafficLevel: trafficLevels[Math.floor(Math.random() * trafficLevels.length)],
    coordinates: [startCoords, ...template.via, endCoords]
  }));
};

function App() {
  const [selectedMode, setSelectedMode] = useState<TransportMode>('car');
  const [startLocation, setStartLocation] = useState<Location>(MUMBAI_LOCATIONS.csmt);
  const [endLocation, setEndLocation] = useState<Location>(MUMBAI_LOCATIONS.bandra);
  const [routes, setRoutes] = useState<Route[]>([]);

  useEffect(() => {
    const newRoutes = generateRoutes(
      startLocation.coordinates,
      endLocation.coordinates,
      selectedMode
    );
    setRoutes(newRoutes);
  }, [startLocation, endLocation, selectedMode]);

  const handleModeChange = (mode: TransportMode) => {
    setSelectedMode(mode);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Mumbai Traffic & Route Optimizer
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
              <div className="grid grid-cols-2 gap-4">
                <LocationSelector
                  locations={MUMBAI_LOCATIONS}
                  selected={startLocation}
                  onSelect={setStartLocation}
                  label="Start Location"
                />
                <LocationSelector
                  locations={MUMBAI_LOCATIONS}
                  selected={endLocation}
                  onSelect={setEndLocation}
                  label="End Location"
                />
              </div>
            </div>
            <RouteMap
              routes={routes}
              startPoint={startLocation.coordinates}
              endPoint={endLocation.coordinates}
            />
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Location Details</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  <span>Start: {startLocation.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  <span>End: {endLocation.name}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              {routes.map(route => (
                <RouteInfo
                  key={route.id}
                  route={route}
                  onModeChange={handleModeChange}
                  selectedMode={selectedMode}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;