import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/operations";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { useId } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiUser6Fill } from "react-icons/ri";
import { MdPhone } from "react-icons/md";

import * as Yup from "yup";

import css from "./LoginForm.module.css";

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

const LoginForm = () => {
  const dispatch = useDispatch();
  const emailId = useId();
  const passwordId = useId();

  const contactsSchema = Yup.object().shape({
    email: Yup.string()
      .min(7, "Too Short!")
      .max(30, "Too Long!")
      .required("Required!"),
    password: Yup.string()
      .min(7, "Too Short!")
      .max(30, "Too Long!")
      .required("Required!"),
  });

  const handleSubmit = (values, action) => {
    const { email, password } = values;
    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        infoToast("Login successful!", "success");
      })
      .catch(() => {
        infoToast("Login failed!", "error");
      });
    action.resetForm();
  };

  return (
    <div className={css.container}>
      <div className={css.formContainer}>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={contactsSchema}
          onSubmit={handleSubmit}
        >
          <Form className={css.form}>
            <p className={css.formTitle}>Login Form</p>
            <div>
              <label className={css.formInputLabel} htmlFor={emailId}>
                Email
              </label>
              <div className={css.iconPosition}>
                <RiUser6Fill className={css.icon} />
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
                <MdPhone className={css.icon} />
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
              Log In
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
//

export default LoginForm;
