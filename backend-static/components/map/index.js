import { useWindowSize } from '../useWindowSize';
import { Container, Row, Col, Badge } from "reactstrap";
import "leaflet/dist/leaflet.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

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

var markerIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  shadowSize: [41, 41],
});

const Tag = ({tag}) => <Badge className="text-white mr-1" color={"primary"} key={tag}>{tag}</Badge>

export default function ({ list }) {
  const initPosition = [52.012551077226085, 22.926438847190745];
  const size = useWindowSize();

  return (
    size ? <MapContainer
      key={size.height}
      style={{ height: size.height - 70 + "px" }}
      center={initPosition}
      zoom={8}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />


    </MapContainer> : null
  )
}
