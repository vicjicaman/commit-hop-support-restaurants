import type { NextPage } from "next";
import Head from "next/head";
import Donate from "components/donate";

import { Container, Row, Col, Alert } from "reactstrap";
import { OPENSOURCE_LIST } from "common/queries/opensource";
import client from "utils/client";
import PageHandler, { pageConfig } from "common/page";
import Navbar from "common/navbar";
import OpensourceContent from "common/opensource/content";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";


export async function getServerSideProps(cxt: any) {
  pageConfig(cxt);

  const { data } = await client.query({
    query: OPENSOURCE_LIST,
    fetchPolicy: "no-cache"
  });

  return {
    props: {
      list: data.viewer.account.opensources.list,
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
            <FormattedMessage id={"app.opensource-description"} />
          </Col>
        </Row>

        {list.map((opensource: any) => {
          const {
            id
          } = opensource;
          return (
            <Row key={id} className="m-4">
              <OpensourceContent opensource={opensource} />

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
