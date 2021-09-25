import JobCard from "./JobCard";
import jobsStyle from "../styles/Jobs.module.css";

export const Jobs = ({ jobs }) => {
  return (
    <div className={jobsStyle.container}>
      {jobs.map((job, index) => (
        <JobCard job={job} key={index} />
      ))}
    </div>
  );
};
