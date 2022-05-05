import type { NextPage } from "next";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;




export const getServerSideProps = async () => {
  return {
    redirect: {
      permanent: true,
      destination: '/en/restaurant'
    }
  }
}

const Home: NextPage = (props) => {
  return null;
}

export default Home;
