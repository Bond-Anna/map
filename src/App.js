import React, { useRef, useState } from 'react';
import Map, { NavigationControl, Source, Layer, Marker } from 'react-map-gl';
import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer,
} from './layers.js';
import { data, eventsCoord, atractionsCoord, restCoord } from './data';
import RedPin from './sources/pin.png';
import YellowPin from './sources/yellowPin.svg';
import GreyPin from './sources/greyPin.svg';

export default function App() {
  const mapRef = useRef(null);
  const [viewState, setViewState] = useState({
    longitude: 35.2255,
    latitude: 31.7849,
    zoom: 11.5,
  });

  const [showEvents, setShowEvents] = useState(true);
  const [showAtractions, setShowAtractions] = useState(true);
  const [showRests, setShowRests] = useState(true);

  return (
    <Map
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      style={{ width: '100vw', height: '100vh' }}
      id="map"
      ref={mapRef}
      maxZoom={20}
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
      <Source
        id="earthquakes"
        type="geojson"
        data={data}
        cluster={true}
        clusterMaxZoom={9}
        clusterRadius={50}
      >
        <Layer {...clusterLayer} />
        <Layer {...clusterCountLayer} />
        <Layer {...unclusteredPointLayer} />
      </Source>
    </Map>
  );
}
