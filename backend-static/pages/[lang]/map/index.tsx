import type { NextPage } from "next";
import Head from "next/head";

import { RESTAURANT_LIST } from "common/queries/restaurant";
import { BORDERPOINT_LIST } from "common/queries/border-point";
import { INFOLOCATION_LIST } from "common/queries/info-location";
import client from "utils/client";
import PageHandler, { pageConfig } from "common/page";
import Navbar from "common/navbar";
import { useRouter } from "next/router";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("../../../components/map"), {
  ssr: false
});


export async function getServerSideProps(cxt: any) {
  pageConfig(cxt);

  const restaurantPromise = client.query({
    query: RESTAURANT_LIST,
    fetchPolicy: "no-cache"
  });

  const borderPromise = client.query({
    query: BORDERPOINT_LIST,
    fetchPolicy: "no-cache"
  });

  const infoPromise = client.query({
    query: INFOLOCATION_LIST,
    fetchPolicy: "no-cache"
  });

  const [{ data: restaurantData }, { data: borderData }, { data: infoData }] = await Promise.all([restaurantPromise, borderPromise, infoPromise]);

  const markers = [
    {
      list: infoData.viewer.account.infoLocations.list,
      icon: "green",
      title: "app.info-locations",
      description: "app.info-locations-description"
    }, {
      list: restaurantData.viewer.account.restaurants.list,
      icon: "blue",
      title: "app.restaurants",
      description: "app.restaurants-description"
    },
    {
      list: borderData.viewer.account.borderPoints.list,
      icon: "red",
      title: "app.distribution-points",
      description: "app.distribution-points-description"
    }]

  return {
    props: {
      markers,
      lang: cxt.params.lang,
    },
  };
}

const Page: NextPage = (props) => {
  const { markers, lang } = props as any;
  const router = useRouter();
  return (
    <PageHandler lang={lang}>
      <Head>
        <title>Support Ukraine</title>
        <meta name="description" content="Please donate to the WCK fundraising" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar lang={lang} pathname={router.asPath} tag={null} />
      <Map markers={markers} />
    </PageHandler>
  );
};

export default Page;