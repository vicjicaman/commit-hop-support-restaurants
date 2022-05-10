import { useWindowSize } from '../useWindowSize';
import { Container, Row, Col, Badge } from "reactstrap";
import "leaflet/dist/leaflet.css";
import { FormattedMessage } from "react-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { flagStyle } from "common/lang";

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

const Tag = ({ tag }) => <Badge className="text-white mr-1" color={"primary"} key={tag}>{tag}</Badge>

export default function ({ list, title, description }) {
  const initPosition = [49, 22];
  const size = useWindowSize();

  return (
    size ? <MapContainer
      key={size.height}
      style={{ height: size.height - 70 + "px" }}
      center={initPosition}
      zoom={7}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {
        list.map(({ id, name, country, latitude, longitude, images }) => {
          const flag = <img style={flagStyle} src={`/flags/${country}.png`} />
          return <Marker key={id} position={[latitude, longitude]} icon={markerIcon} >
            <Popup>
              <img className='w-100' src={images[0]} />
              <p><b>{name}</b>  {flag}</p>
            </Popup>

            <Tooltip>
              {name} {flag}
            </Tooltip>

          </Marker>
        })
      }

      <div
        style={{
          position: "absolute",
          width: size.width > 500 ? 500 : size.width,
          height: 500,
          top: 0,
          right: 20,
          zIndex: 500,
        }}
      >
        <Container className="bg-white m-2 p-2">
          <Row className="p-1 text-center text-capitalize">
            <Col>
              <h5>
                <FormattedMessage id={title} />
              </h5>
            </Col>
          </Row>
          <Row className="p-1 text-center">
            <Col>
              <p>
                <FormattedMessage id={description} />
              </p>
            </Col>
          </Row>
        </Container>
      </div>


    </MapContainer> : null
  )
}
