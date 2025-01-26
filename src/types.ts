export interface Route {
  id: string;
  mode: TransportMode;
  distance: number;
  duration: number;
  trafficLevel: TrafficLevel;
  coordinates: [number, number][];
  name: string;
}

export interface Location {
  name: string;
  coordinates: [number, number];
}

export type TransportMode = 'car' | 'bus' | 'bicycle' | 'walking';
export type TrafficLevel = 'low' | 'moderate' | 'heavy';