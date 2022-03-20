import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { RESTAURANT_FIND } from "../../queries/restaurant";
import { useQuery } from "@apollo/client";
import { useWindowSize } from "../../components/useWindowSize";

import {
  MapContainer,
  Tooltip,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { LatLngTuple, LatLng } from "leaflet";

function LocationMarker({ setPosition, position }: any) {
  const map = useMapEvents({
    click(e) {
      //console.log(e.latlng);
      setPosition(e.latlng);
    },
    locationfound(e: any) {},
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

const Markers = ({ position }: any) => {
  const { loading, error, data } = useQuery(RESTAURANT_FIND, {
    variables: {
      latitude: position ? position.lat : 52.012551077226085,
      longitude: position ? position.lng : 22.926438847190745,
    },
  });

  //if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      {!loading &&
        data.viewer.account.restaurants.find.map(
          ({ id, name, latitude, longitude, images }: any) => (
            <Marker key={id} position={[latitude, longitude]}>
              <Tooltip>
                <b>{name}</b>
                <img
                  style={{ width: "200px", display: "block" }}
                  src={images[0]}
                />
              </Tooltip>
            </Marker>
          )
        )}
    </>
  );
};

export const Component = () => {
  const [width, height] = useWindowSize();
  const initPosition: LatLngTuple = [50.012551077226085, 22.926438847190745];

  const [position, setPosition] = useState<LatLng | null>(null);

  if (height === 0) {
    return null;
  }

  /*TODO*/
  /*Add debounce to height changes*/
  /*Get top of map and substract it from the total height*/
  return (
    <MapContainer
      key={height}
      style={{ height: height + "px" }}
      center={initPosition}
      zoom={8}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LocationMarker position={position} setPosition={setPosition} />

      {position && <Markers position={position} />}
    </MapContainer>
  );
};
/*
const {
  viewer: {
    account: {
      restaurants: { find },
    },
  },
} = data;
*/
