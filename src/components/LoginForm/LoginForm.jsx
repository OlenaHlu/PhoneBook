import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/operations";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { useId } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as Yup from "yup";

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
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={contactsSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div>
          <label htmlFor={emailId}>Email</label>
          <Field
            type="email"
            name="email"
            id={emailId}
            placeholder="Enter your email..."
          />
          <ErrorMessage name="email" component="div" />
        </div>
        <div>
          <label htmlFor={passwordId}>Password</label>
          <Field
            type="password"
            name="password"
            id={passwordId}
            placeholder="Enter your password..."
          />
          <ErrorMessage name="password" component="div" />
        </div>
        <button type="submit">Log In</button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
