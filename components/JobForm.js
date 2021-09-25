import axios from "axios";
import { useForm } from "react-hook-form";
import style from "../styles/JobForm.module.css";
export default function JobForm({ jobid }) {
  const { register, handleSubmit } = useForm();
  const submitForm = async (values) => {
    const config = {
      method: "post",
      url: "http://localhost:1337/applications",
      data: {
        fullname: values.fullname,
        phone: values.phone,
        cv: values.cv[0],
        email: values.email,
        jobofferid: jobid,
      },
    };
    const response = await axios(config);
    console.log(response);
    // c'est pas encore terminé
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
            // accept="application/msword, application/pdf"
            className={style.fileInput}
          />
          <br />
          <br />
          <span className={style.fileSupported}>
            Supported files : .docx , .pdf
          </span>
        </label>
      </div>
      <button className={style.submit}>APPLY</button>
    </form>
  );
}
