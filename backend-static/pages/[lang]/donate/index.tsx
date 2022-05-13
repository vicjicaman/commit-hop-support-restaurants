import type { NextPage } from "next";
import Head from "next/head";

import { Container, Row, Col, Button } from "reactstrap";
import PageHandler, { pageConfig } from "common/page";
import Navbar from "common/navbar";
import Donate from "components/donate";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";

export async function getServerSideProps(cxt: any) {
  pageConfig(cxt);
  
  return {
    props: {

      lang: cxt.params.lang,
    },
  };
}

const Page: NextPage = (props) => {
  const { lang } = props as any;
  const router = useRouter();
  return (
    <PageHandler lang={lang}>
      <Head>
        <title>Support Ukraine</title>
        <meta name="description" content="Please donate to the WCK fundraising" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar lang={lang} pathname={ router.asPath} tag={null} />
      <Container className="mt-4">
        <Row>
          <Col>
            <p>
              <FormattedMessage id="msg.intro" />{" "}
              <b>
                <a href="https://wck.org/" target="_blank">
                  World Central Kitchen
                </a>
              </b>
            </p>
            <p>
              <FormattedMessage id="msg.goal" />
            </p>
            <p>
              <FormattedMessage id="msg.cta" />
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <Donate/>
          </Col>
        </Row>
      </Container>
    </PageHandler>
  );
};

export default Page;
