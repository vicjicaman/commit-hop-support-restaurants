import type { NextPage } from "next";

export const getServerSideProps = async () => {
  return {
    redirect: {
      permanent: true,
      destination: '/en'
    }
  }
}

const Home: NextPage = (props) => {
  return null;
}

export default Home;
