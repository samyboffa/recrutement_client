import { line, calendar, heart } from "../public/svg.js";
import Link from "next/link";
import ophtalmologue from "../public/ophtalmo.jpg";
import orthoptiste from "../public/orthoptiste.jpg";
import moment from "moment";
import cardStyle from "../styles/JobCard.module.css";
import Image from "next/image";
const JobCard = ({ job }) => {
  return (
    <Link href={`/jobs/${job.id}`} passHref={true}>
      <div className={cardStyle.cardContainer}>
        <Image
          className={cardStyle.cardImage}
          src={job.type === "ophtalmologue" ? ophtalmologue : orthoptiste}
          width="515"
          height="321"
          alt={job.title}
        />
        <div className={cardStyle.description}>
          <div className={cardStyle.typeBox}>
            {line}
            <h5 className={cardStyle.type}>{job.type.toUpperCase()}</h5>
          </div>
          <div>
            <h3 className={cardStyle.title}>{job.title}</h3>
            <p className={cardStyle.introduction}>{job.Introduction}</p>
          </div>
        </div>
        <div className={cardStyle.footer}>
          <p>
            <span className={cardStyle.svg}>{calendar}</span>
            {moment(job.date).format("L")}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
