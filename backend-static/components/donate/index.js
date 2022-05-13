import "bootstrap/dist/css/bootstrap.css";
import { Container, Row, Col, Button } from "reactstrap";
import Navbar from "common/navbar";
import { FormattedMessage } from "react-intl";


  export default () => <Button
    className="text-capitalize"
    color="success"
    onClick={() => {
      window.open(
        `https://donate.wck.org/give/f3789323/#!/donation/checkout`,
        "_blank"
      );
    }}
  >
    <FormattedMessage id="app.donate" />
  </Button>