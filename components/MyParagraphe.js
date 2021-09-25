import style from "../styles/TextField.module.css";

export const MyParagraphe = ({ title, body }) => {
  return (
    <div className={style.container}>
      <h1>{title}</h1>
      <p>{body}</p>
    </div>
  );
};
