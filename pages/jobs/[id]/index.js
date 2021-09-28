import style from "../../../styles/JobDetail.module.css";
import axios from "axios";
import Image from "next/image";
import moment from "moment";
import { calendar, candidate, heart, line } from "../../../public/svg";
import ophtalmologue from "../../../public/ophtalmo.jpg";
import orthoptiste from "../../../public/orthoptiste.jpg";
import JobForm from "../../../components/JobForm";

const index = ({ job }) => {
  return (
    <div className={style.container}>
      <div className={style.typeBox}>
        {line}
        <h5 className={style.type}>{job.type.toUpperCase()}</h5>
      </div>
      <h1 className={style.title}>{job.title}</h1>
      <div className={style.infoTitle}>
        <p>
          <span className={style.svg}>{calendar}</span>
          {moment(job.date).format("L")}
        </p>
        <p>
          <span className={style.svg}>{candidate}</span>
          By {job.creator}
        </p>
      </div>
      <Image
        src={job.type === "ophtalmologue" ? ophtalmologue : orthoptiste}
        alt={job.title}
        width="1070"
        height="670"
      />
      <p className={style.jobDescription}>{job.job_description}</p>
      <div className={style.imageBlock}>
        {/* {job.images.map((image, index) => (
          <div key={index} className={style.images}>
            <Image
              className={style.imagesInside}
              alt={image.name}
              src={`http://localhost:1337${image.url}`}
              width="460"
              height="307"
            />
          </div>
        ))} */}
      </div>

      <JobForm jobid={job.id} />
    </div>
  );
};

export const getStaticProps = async (context) => {
  const res = await axios.get(
    `http://localhost:1337/jobs?id=${context.params.id}`
  );

  const job = await res.data[0];

  return {
    props: {
      job,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await axios.get(`http://localhost:1337/jobs`);

  const jobs = await res.data;

  const ids = jobs.map((job) => job.id);
  const paths = ids.map((id) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: false,
  };
};
export default index;
