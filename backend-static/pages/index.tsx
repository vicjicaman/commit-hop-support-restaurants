import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.css";

import { Container, Row, Col, Badge } from "reactstrap";
import PageHandler from "common/page";
import { useRouter } from "next/router";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import dynamic from "next/dynamic";
const Map = dynamic(() => import("../components/map"), {
  ssr: false
});

const Home: NextPage = (props) => {
  return (
    <>
      <Head>
        <title>Support restaurants</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Map list={[]} />
    </>
  );
};

export default Home;
