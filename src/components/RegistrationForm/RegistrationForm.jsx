import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { useId } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import css from "./RegistrationForm.module.css";
import { RiLockPasswordLine } from "react-icons/ri";
import { RiUser6Fill } from "react-icons/ri";
import { MdPhone } from "react-icons/md";

const infoToast = (message, type) => {
  toast(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: type === "success" ? "light" : "colored",
    type: type,
  });
};

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const emailId = useId();
  const passwordId = useId();
  const nameId = useId();

  const registerSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(20, "Too Long!")
      .required("Required"),
    email: Yup.string()
      .email("Invalid email format")
      .min(7, "Too Short!")
      .max(30, "Too Long!")
      .required("Required"),
    password: Yup.string()
      .min(7, "too Short!")
      .max(30, "Too Long!")
      .required("Required"),
  });

  const handleSubmit = (values, action) => {
    const { name, email, password } = values;

    dispatch(register({ name, email, password }))
      .unwrap()
      .then(() => {
        infoToast("Registration successful", "success");
      })
      .catch(() => {
        infoToast("Registration failed", "error");
      });
    action.resetForm();
  };

  return (
    <div className={css.container}>
      <div className={css.formContainer}>
        <Formik
          onSubmit={handleSubmit}
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={registerSchema}
        >
          <Form className={css.form}>
            <p className={css.formTitle}>Create your account</p>
            <div>
              <label className={css.formInputLabel} htmlFor={nameId}>
                Username
              </label>
              <div className={css.iconPosition}>
                <RiUser6Fill className={css.icon} />
                <Field
                  className={css.input}
                  type="text"
                  name="name"
                  id={nameId}
                  placeholder="Enter your name..."
                />
              </div>
              <ErrorMessage className={css.error} name="name" component="div" />
            </div>
            <div>
              <label className={css.formInputLabel} htmlFor={emailId}>
                Email
              </label>
              <div className={css.iconPosition}>
                <MdPhone className={css.icon} />
                <Field
                  className={css.input}
                  type="email"
                  name="email"
                  id={emailId}
                  placeholder="Enter your email..."
                />
              </div>
              <ErrorMessage
                className={css.error}
                name="email"
                component="div"
              />
            </div>
            <div>
              <label className={css.formInputLabel} htmlFor={passwordId}>
                Password
              </label>
              <div className={css.iconPosition}>
                <RiLockPasswordLine className={css.icon} />
                <Field
                  className={css.input}
                  type="password"
                  name="password"
                  id={passwordId}
                  placeholder="Enter your password..."
                />
              </div>
              <ErrorMessage
                className={css.error}
                name="password"
                component="div"
              />
            </div>
            <button className={css.btn} type="submit">
              Register
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default RegistrationForm;
