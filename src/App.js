import './App.css';
import React, { useState, useCallback } from 'react';
import Select from './components/Select';

// Constants
// Assume the time it takes to travel between floors is in seconds
const FLOOR_TRAVEL_TIME = 10;
const MAX_FLOORS = 50;
const FLOORS = [];
for (let i = 0; i < MAX_FLOORS; i++) {
  FLOORS.push(i + 1);
}

export const calculateTravelTime = (startingFloor, destinationFloors) => {
  let numFloorsTraveled = 0;
  const floorsVisited = [startingFloor, ...destinationFloors];
  for (let i = 1; i < floorsVisited.length; i++) {
    numFloorsTraveled += Math.abs(floorsVisited[i] - floorsVisited[i - 1]);
  }

  return {
    floorsVisited,
    travelTime: numFloorsTraveled * FLOOR_TRAVEL_TIME
  };
}

function App({startingFloor = FLOORS[0], destinationFloors = [] }) {
  const [startFloor, setStartFloor] = useState(startingFloor);
  const handleStartFloorChange = useCallback(value => {
    setStartFloor(value);
  }, []);

  const [destinations, setDestinations] = useState(destinationFloors);
  const handleDestinationFloorChange = useCallback(value => {
    setDestinations(value);
  }, []);

  const onCalculateTravelTime = useCallback(() => {
    const { floorsVisited, travelTime } = calculateTravelTime(startFloor, destinations);

    document.getElementById("floors_visited").innerText = `Floors visited: ${floorsVisited.join(", ")}`;
    document.getElementById("total_time").innerText = `Total time: ${travelTime} seconds`;
  }, [startFloor, destinations]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-input">
          <label>Starting Floor:</label>
          <Select options={FLOORS} onChange={handleStartFloorChange} />
        </div>
        
        <div className="App-input">
          <label>Floors to Visit:</label>
          <Select multiple options={FLOORS} onChange={handleDestinationFloorChange} />
        </div>
        <button
          disabled={destinations.length === 0}
          title={destinations.length === 0 ? "Please select floors to visit" : undefined}
          onClick={onCalculateTravelTime}
        >
          Calculate Travel Time
        </button>
        <div id="floors_visited" />
        <div id="total_time" />
      </header>
    </div>
  );
}

export default App;
