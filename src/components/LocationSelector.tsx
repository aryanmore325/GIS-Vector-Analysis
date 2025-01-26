import React from 'react';
import { Location } from '../types';

interface LocationSelectorProps {
  locations: Record<string, Location>;
  selected: Location;
  onSelect: (location: Location) => void;
  label: string;
}

export default function LocationSelector({
  locations,
  selected,
  onSelect,
  label
}: LocationSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        value={selected.name}
        onChange={(e) => {
          const location = Object.values(locations).find(
            loc => loc.name === e.target.value
          );
          if (location) {
            onSelect(location);
          }
        }}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
      >
        {Object.values(locations).map((location) => (
          <option key={location.name} value={location.name}>
            {location.name}
          </option>
        ))}
      </select>
    </div>
  );
}