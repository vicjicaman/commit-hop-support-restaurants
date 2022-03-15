import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { RESTAURANT_FIND } from "../../queries";
import { useQuery } from "@apollo/client";

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { LatLngTuple, LatLng } from "leaflet";

function LocationMarker() {
  const [position, setPosition] = useState<LatLng | null>(null);
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

export const Component = () => {
  const { loading, error, data } = useQuery(RESTAURANT_FIND);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const {
    viewer: {
      account: {
        restaurants: { list },
      },
    },
  } = data;

  const position: LatLngTuple = [52.012551077226085, 22.926438847190745];

  return (
    <MapContainer style={{ height: "800px" }} center={position} zoom={10}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LocationMarker />
    </MapContainer>
  );
};
