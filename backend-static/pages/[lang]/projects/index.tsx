import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.css";

import { Container, Row, Col, Alert } from "reactstrap";
import { PROJECT_LIST } from "common/queries/project";
import client from "utils/client";
import PageHandler from "common/page";
import Navbar from "common/navbar";
import ProjectCard from "common/content/project/card";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;



export async function getServerSideProps(cxt: any) {

  const { data } = await client.query({
    query: PROJECT_LIST,
    fetchPolicy: "no-cache"
  });

  return {
    props: {
      list: data.viewer.account.projects.list,
      lang: cxt.params.lang,
    },
  };
}

const Page: NextPage = (props) => {
  const { list, lang } = props as any;
  const router = useRouter();
  return (
    <PageHandler lang={lang}>
      <Head>
        <title>Support restaurants</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar lang={lang} pathname={router.asPath} tag={null} />


      <Container>
        <Row className="m-4">
          <Col>
            <Alert color="info"><FormattedMessage id={"app.projects-description"} /></Alert>
          </Col>
        </Row>

        {list.map((project: any) => {
          const {
            id
          } = project;
          return (
            <Row key={id} className="m-4">
              <ProjectCard project={project} />
            </Row>
          );
        })}
      </Container>

    </PageHandler>
  );
};

export default Page;
