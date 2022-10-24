import React, { useRef, useState } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import RedPin from './sources/pin.png';
import YellowPin from './sources/yellowPin.svg';
import GreyPin from './sources/greyPin.svg';

export default function App() {
  const mapRef = useRef();
  const [viewState, setViewState] = useState({
    longitude: 35.2255,
    latitude: 31.7849,
    zoom: 11.5,
  });

  const [showEvents, setShowEvents] = useState(true);
  const [showAtractions, setShowAtractions] = useState(true);
  const [showRests, setShowRests] = useState(true);

  const eventsCoord = [
    { long: 35.235556, lat: 31.777778 },
    { long: 35.21336, lat: 31.76846 },
    { long: 35.223842, lat: 31.748633 },
    { long: 35.23146, lat: 31.782827 },
  ];

  const atractionsCoord = [
    { long: 35.223606, lat: 31.779146 },
    { long: 35.244048, lat: 31.779474 },
    { long: 35.229978, lat: 31.783853 },
  ];

  const restCoord = [
    { long: 35.176944, lat: 31.749444 },
    { long: 35.175426, lat: 31.74627 },
    { long: 35.244167, lat: 31.7925 },
  ];

  return (
    <Map
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      style={{ width: '100vw', height: '100vh' }}
      id="map"
      ref={mapRef}
      mapStyle="mapbox://styles/sparkangel/cl9i824d7003l15nwjrwbhsck"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
    >
      <NavigationControl
        showCompass={false}
        showZoom
        style={{ display: 'flex' }}
      />

      <div className="butns">
        <button
          className={`${!showEvents ? 'notActive' : 'none'}`}
          onClick={() => setShowEvents(!showEvents)}
        >
          EVENTS
        </button>
        <button
          className={`${!showAtractions ? 'notActive' : 'none'}`}
          onClick={() => setShowAtractions(!showAtractions)}
        >
          ATRACTIONS
        </button>
        <button
          className={`${!showRests ? 'notActive' : 'none'}`}
          onClick={() => setShowRests(!showRests)}
        >
          RESTAURANTS
        </button>
      </div>

      {showEvents &&
        eventsCoord.map(it => (
          <Marker
            longitude={it.long}
            latitude={it.lat}
            anchor="bottom"
            onClick={() => console.log('click')}
            style={{ cursor: 'pointer' }}
            key={it.long}
          >
            <img
              src={RedPin}
              alt="pin"
              width={viewState.zoom * 1.5}
              height={viewState.zoom * 2.1}
            />
          </Marker>
        ))}
      {showAtractions &&
        atractionsCoord.map(it => (
          <Marker
            longitude={it.long}
            latitude={it.lat}
            anchor="bottom"
            onClick={() => console.log('click')}
            style={{ cursor: 'pointer' }}
            key={it.long}
          >
            <img
              src={YellowPin}
              alt="pin"
              width={viewState.zoom * 1.7}
              height={viewState.zoom * 2.7}
            />
          </Marker>
        ))}
      {showRests &&
        restCoord.map(it => (
          <Marker
            longitude={it.long}
            latitude={it.lat}
            anchor="bottom"
            onClick={() => console.log('click')}
            style={{ cursor: 'pointer' }}
            key={it.long}
          >
            <img
              src={GreyPin}
              alt="pin"
              width={viewState.zoom * 1.7}
              height={viewState.zoom * 2.7}
            />
          </Marker>
        ))}
    </Map>
  );
}
