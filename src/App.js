import React, { useRef, useState } from 'react';
import Map from 'react-map-gl';

export default function App() {
  const mapRef = useRef();
  const [viewState, setViewState] = useState({
    longitude: 35.2255,
    latitude: 31.7849,
    zoom: 8,
  });

  return (
    <Map
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      style={{ width: '100vw', height: '100vh' }}
      id="map"
      ref={mapRef}
      mapStyle="mapbox://styles/sparkangel/cl9i824d7003l15nwjrwbhsck"
      mapboxAccessToken={process.env.REACT_APP_KEY_MAP}
    />
  );
}
