import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { RESTAURANT_FIND } from "../../queries/restaurant";
import { useQuery } from "@apollo/client";
import { useWindowSize } from "../../components/useWindowSize";
import { useParams, Link, useNavigate } from "react-router-dom";

import {
  MapContainer,
  Tooltip,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { LatLngTuple, LatLng } from "leaflet";
import L from "leaflet";

function LocationMarker({ setPosition, position }: any) {
  const map = useMapEvents({
    click(e) {
      //console.log(e.latlng);
      setPosition(e.latlng);
    },
    locationfound(e: any) {},
  });

  var greenIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return position === null ? null : (
    <Marker position={position} icon={greenIcon}></Marker>
  );
}

const Markers = ({ position }: any) => {
  const params = useParams();
  const navigate = useNavigate();
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
            <Marker
              key={id}
              position={[latitude, longitude]}
              eventHandlers={{
                click: (e) => {
                  navigate(`/listing/${params.lang}/view/${id}`);
                  //console.log("marker clicked", e);
                },
              }}
            >
              <Tooltip direction="top" offset={[0, -10]}>
                <b>{name}</b>
                <img
                  style={{ width: "100px", marginLeft: "10px" }}
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
