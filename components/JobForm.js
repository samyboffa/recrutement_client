import axios from "axios";
import { useForm } from "react-hook-form";
import Loader from "./Loader";
import { useState } from "react";
import style from "../styles/JobForm.module.css";
export default function JobForm({ jobid }) {
  const [loading, setloading] = useState(false);
  const [success, setsuccess] = useState(false);
  const [err, seterr] = useState(false);
  const status = "APPLY";
  const { register, handleSubmit } = useForm();
  const submitForm = async (values) => {
    setloading(true);
    setsuccess(false);
    seterr(false);
    const formData = new FormData();
    formData.append("files", values.cv[0]);
    const uploadRes = await axios.post(
      "http://localhost:1337/upload",
      formData
    );
    const cvId = uploadRes.data[0].id;
    const config = {
      multipart: true,
      method: "post",
      url: "http://localhost:1337/applications",
      data: {
        fullname: values.fullname,
        phone: values.phone,
        cv: cvId,
        email: values.email,
        jobofferid: jobid,
      },
    };
    try {
      const response = await axios(config);
      setloading(false);
      setsuccess(true);
    } catch (error) {
      seterr(true);
      setloading(false);
    }
  };
  return (
    <form className={style.formContainer} onSubmit={handleSubmit(submitForm)}>
      <h2>APPLY FOR THIS JOB</h2>
      <div className={style.form__group}>
        <input
          required
          type="text"
          name="fullname"
          id="name"
          {...register("fullname")}
          className={style.form__field}
          placeholder="Full Name"
        ></input>
        <label className={style.form__label}>Full Name</label>
      </div>
      <div className={style.form__group}>
        <input
          required
          type="email"
          name="email"
          {...register("email")}
          id="email"
          className={style.form__field}
          placeholder="E-Mail"
        ></input>
        <label className={style.form__label}>E-Mail</label>
      </div>
      <div className={style.form__group}>
        <input
          required
          type="text"
          name="phone"
          id="phone"
          {...register("phone")}
          className={style.form__field}
          placeholder="Phone"
        ></input>
        <label className={style.form__label}>Phone</label>
      </div>
      <div className={style.fileInputBox}>
        <label htmlFor="file-input" className={style.fileLabel}>
          <span>Upload Your CV</span>

          <br />
          <br />
          <input
            required
            type="file"
            name="cv"
            {...register("cv")}
            id="file-input"
            accept="application/msword, application/pdf"
            className={style.fileInput}
          />
          <br />
          <br />
          <span className={style.fileSupported}>
            Supported files : .docx , .pdf
          </span>
        </label>
      </div>

      <button className={style.submit}>
        {loading ? <Loader size="Small" /> : status}
      </button>
      {success ? <p className={style.success}> Appication sent </p> : null}
      {err ? (
        <p className={style.error}>
          {" "}
          Something went wrong. Please try again later
        </p>
      ) : null}
    </form>
  );
}
