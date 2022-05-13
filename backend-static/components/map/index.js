import { useWindowSize } from '../useWindowSize';
import { Container, Row, Col, Badge } from "reactstrap";
import "leaflet/dist/leaflet.css";
import { FormattedMessage, useIntl } from "react-intl";
import { flagStyle } from "common/lang";
import Donate from "components/donate";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import {
  MapContainer,
  Tooltip,
  Marker,
  Popup,
  TileLayer
} from "react-leaflet";
import L from "leaflet";

const iconsUrl = {
  red: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  blue: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png"
}

const icons = {
  red: new L.Icon({
    iconUrl:
      iconsUrl.red,
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    shadowSize: [41, 41],
  }),
  blue: new L.Icon({
    iconUrl:
      iconsUrl.blue,
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    shadowSize: [41, 41],
  })
}


const Tag = ({ tag }) => <Badge className="text-white mr-1" color={"primary"} key={tag}>{tag}</Badge>

const countries = [{ code: "pl", latitude: 52.23, longitude: 21.011111 },
{ code: "sk", latitude: 48.143889, longitude: 17.109722 },
{ code: "hu", latitude: 47.4925, longitude: 19.051389 },
{ code: "ro", latitude: 44.4325, longitude: 26.103889 },
{ code: "md", latitude: 47.022778, longitude: 28.835278 },
{ code: "ua", latitude: 50.45, longitude: 30.523333 }]

export default function ({ markers }) {
  const initPosition = [49, 22];
  const size = useWindowSize();
  const intl = useIntl();
  const lang = intl.locale;
  /*
    <Tooltip direction="top" permanent>
              <img style={flagStyle} src={`/flags/${code}.png`} />
            </Tooltip>
  */
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
        countries.map(({ code, latitude, longitude }) => <Marker key={code} position={[latitude, longitude]} icon={new L.Icon({
          iconUrl:
            `/flags/${code}.png`,
          iconSize: [40, 25]
        })} >

        </Marker>)
      }

      {
        markers.map(({ list, icon }) => {
          return list.map(({ id, name, country, latitude, longitude, images }) => {
            const flag = <img style={flagStyle} src={`/flags/${country}.png`} />
            return <Marker key={id} position={[latitude, longitude]} icon={icons[icon]} >
              <Popup>
                <img className='w-100' src={images[0]} />
                <p><b>{name}</b>  {flag}</p>
              </Popup>
              <Tooltip>
                {name} {flag}
              </Tooltip>
            </Marker>
          })
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

          {
            markers.map(({ title, description, icon }, idx) => {
              return <Row key={idx} className="text-center">
                <Col>
                  <p>
                    <img style={{
                      width: 15,
                    }} src={iconsUrl[icon]} />{" "}
                    <b className="text-capitalize">
                      <FormattedMessage id={title} />
                    </b>  <FormattedMessage id={description} />
                  </p>
                </Col>
              </Row>
            })
          }

          <Row className="text-center">
            <Col>
              <p>
                <FormattedMessage id={"msg.fundraising"} />{" "}
              </p>
              <Donate/>
            </Col>
          </Row>
        </Container>
      </div>


    </MapContainer> : null
  )
}
