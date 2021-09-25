import Head from "next/head";
import axios from "axios";
import { Jobs } from "../components/Jobs";

export default function Home({ jobs }) {
  return (
    <div>
      <Head>
        <title>Recrutement</title>
        <meta name="Recrutement" content="Recrutement" />
      </Head>
      <div>
        <Jobs jobs={jobs} />
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await axios.get(`http://localhost:1337/jobs`);
  const jobs = await res.data;
  return {
    props: {
      jobs,
    },
  };
};
