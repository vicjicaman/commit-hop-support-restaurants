import type { NextPage } from "next";

export const getServerSideProps = async (cxt: any) => {
  return {
    redirect: {
      permanent: true,
      destination: `/${cxt.params.lang}/map`
    }
  }
}

const Home: NextPage = (props) => {
  return null;
}

export default Home;
