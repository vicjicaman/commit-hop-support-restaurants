import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.css";

import Navbar from "../../components/navbar";
import { Container, Row, Col, Badge } from "reactstrap";
import { RESTAURANT_LIST } from "../../queries/restaurant";
import client from "../../utils/client";

export async function getServerSideProps(cxt) {
  const { data } = await client.query({
    query: RESTAURANT_LIST,
  });

  return {
    props: {
      list: data.viewer.account.restaurants.list,
      lang: cxt.params.lang,
    },
  };
}

const Home: NextPage = ({ list, lang }) => {
  const money = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  });

  return (
    <>
      <Head>
        <title>Support restaurants</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar lang={lang} />
      <Container>
        {list.map(
          ({ id, name, images, description, receivedDonations }: any) => (
            <Row key={id} className="m-4">
              <Col>
                <img className="w-50" src={images[0]} />
              </Col>
              <Col>
                <b>{name}</b>
                <p>{description}</p>
                <div>
                  <Badge color="primary" pill>
                    {money.format(receivedDonations)}
                  </Badge>
                </div>
              </Col>
              <Col>
                <a href={`/listing/${lang}/view/${id}`}>View</a>
              </Col>
            </Row>
          )
        )}
      </Container>
    </>
  );
};

export default Home;