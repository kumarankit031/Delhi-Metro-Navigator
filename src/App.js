import React, { useState } from 'react';
import MapComponent from './components/mapComponent';
import { stations } from './data/stations';
import { dijkstra } from './utils/dijkstra';
import { stationsGraph } from './data/stationsGraph';
import './index.css';

function App() {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [path, setPath] = useState([]);

  const handleCalculatePath = () => {
    if (source && destination) {
      const shortestPath = dijkstra(stationsGraph, source, destination);
      const pathStations = shortestPath.map(name => 
        stations.find(station => station.name === name)
      ).filter(station => station); 
      setPath(pathStations);
    }
  };

  return (
      <div className="fixed top-0 left-0 w-full p-4 z-50">
          <h1 className='bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-4xl font-bold text-center py-4 shadow-lg'>Delhi Metro Navigation</h1>

      <div className="flex flex-col items-center space-y-4 mt-6">
        <div className="flex items-center space-x-4">
          <label className="text-lg font-semibold text-gray-800">Source:</label>
          <select 
            onChange={e => setSource(e.target.value)} 
            value={source}
            className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
          <option value="">Select Source</option>
          {stations.map((station, idx) => (
            <option key={idx} value={station.name}>{station.name}</option>
          ))}
          </select>
        </div>

      <div className="flex items-center space-x-4">
        <label className="text-lg font-semibold text-gray-800">Destination:</label>
        <select 
          onChange={e => setDestination(e.target.value)} 
          value={destination}
          className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
        <option value="">Select Destination</option>
        {stations.map((station, idx) => (
          <option key={idx} value={station.name}>{station.name}</option>
        ))}
        </select>
      </div>

    <button 
      onClick={handleCalculatePath}
      className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      Calculate Path
    </button>
    </div>


    <MapComponent path={path} />
  </div>
  );
}

export default App;
