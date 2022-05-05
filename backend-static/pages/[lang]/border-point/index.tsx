import type { NextPage } from "next";
import Head from "next/head";
import getConfig from 'next/config';
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.css";

import { Container, Row, Col, Badge } from "reactstrap";
import { BORDERPOINT_LIST } from "common/queries/border-point";
import client from "utils/client";
import PageHandler from "common/page";
import Navbar from "common/navbar";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";

import dynamic from "next/dynamic";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

const Map = dynamic(() => import("../../../components/map"), {
  ssr: false
});



export async function getServerSideProps(cxt: any) {
  const { data } = await client.query({
    query: BORDERPOINT_LIST,
    fetchPolicy: "no-cache"
  });

  return {
    props: {
      list: data.viewer.account.borderPoints.list,
      lang: cxt.params.lang
    },
  };
}

const Page: NextPage = (props) => {
  const { list, lang, scope } = props as any;
  const router = useRouter();

  return (
    <PageHandler lang={lang}>
      <Head>
        <title>Support restaurants</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar lang={lang} pathname={router.asPath} tag={null} />
      <Map list={list} title={"app.distribution-points"} description={"app.distribution-points-description"}  />
    </PageHandler>
  );
};

export default Page;
