import { line, calendar, heart } from "../public/svg.js";
import Link from "next/link";

import cardStyle from "../styles/JobCard.module.css";
import Image from "next/image";
const JobCard = ({ job }) => {
  return (
    <Link href={`/jobs/${job.id}`} passHref={true}>
      <div className={cardStyle.cardContainer}>
        <Image
          className={cardStyle.cardImage}
          src={`http://localhost:1337${job.mainimg.url}`}
          width="515"
          height="321"
          alt={job.title}
        />
        <div className={cardStyle.description}>
          <div className={cardStyle.typeBox}>
            {line}
            <h5 className={cardStyle.type}>{job.type}</h5>
          </div>
          <div>
            <h3 className={cardStyle.title}>{job.title}</h3>
            <p className={cardStyle.introduction}>{job.Introduction}</p>
          </div>
        </div>
        <div className={cardStyle.footer}>
          <p>
            <span className={cardStyle.svg}>{calendar}</span>
            {job.date}
          </p>
          <p>
            <span className={cardStyle.svg}>{heart}</span> {5}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
