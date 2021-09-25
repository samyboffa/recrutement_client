import style from "../../../styles/JobDetail.module.css";
import axios from "axios";
import Image from "next/image";

import { calendar, candidate, heart, line } from "../../../public/svg";
import { MyParagraphe } from "../../../components/MyParagraphe";
import JobForm from "../../../components/JobForm";

const index = ({ job }) => {
  return (
    <div className={style.container}>
      <div className={style.typeBox}>
        {line}
        <h5 className={style.type}>{job.type}</h5>
      </div>
      <h1 className={style.title}>{job.title}</h1>
      <div className={style.infoTitle}>
        <p>
          <span className={style.svg}>{calendar}</span>
          {job.date}
        </p>
        <p>
          <span className={style.svg}>{candidate}</span>
          By {job.creator}
        </p>
        <p>
          <span className={style.svg}>{heart}</span> {5}
        </p>
      </div>
      <Image
        src={`http://localhost:1337${job.mainimg.url}`}
        alt={job.title}
        width="1070"
        height="670"
      />
      <MyParagraphe title={job.intro_company_title} body={job.intro_campany} />
      <div className={style.imageBlock}>
        {job.images.map((image, index) => (
          <div key={index} className={style.images}>
            <Image
              className={style.imagesInside}
              alt={image.name}
              src={`http://localhost:1337${image.url}`}
              width="460"
              height="307"
            />
          </div>
        ))}
      </div>
      <MyParagraphe
        title={job.job_description_title}
        body={job.job_description}
      />

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
