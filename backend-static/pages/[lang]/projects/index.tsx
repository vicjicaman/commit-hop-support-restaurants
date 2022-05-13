import type { NextPage } from "next";
import Head from "next/head";
import Donate from "components/donate";

import { Container, Row, Col, Alert } from "reactstrap";
import { PROJECT_LIST } from "common/queries/project";
import client from "utils/client";
import PageHandler, { pageConfig } from "common/page";
import Navbar from "common/navbar";
import ProjectCard from "common/content/project/card";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";

export async function getServerSideProps(cxt: any) {
  pageConfig(cxt);

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
        <title>Support Ukraine</title>
        <meta name="description" content="Please donate to the WCK fundraising" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar lang={lang} pathname={router.asPath} tag={null} />


      <Container>
        <Row className="m-4">
          <Col>
            <FormattedMessage id={"app.projects-description"} />
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

        <Row className="text-center">
          <Col>
            <Alert color="info">
              <p>
                <FormattedMessage id={"msg.fundraising"} />{" "}
              </p>
              <Donate />
            </Alert>
          </Col>
        </Row>
      </Container>


    </PageHandler>
  );
};

export default Page;
