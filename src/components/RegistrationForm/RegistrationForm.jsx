import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { useId } from "react";
import { toast } from "react-hot-toast";
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
    <Formik
      onSubmit={handleSubmit}
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={registerSchema}
    >
      <Form>
        <div>
          <label htmlFor={nameId}>Username</label>
          <Field
            type="text"
            name="name"
            id={nameId}
            placeholder="Enter your name..."
          />
          <ErrorMessage name="name" component="div" />
        </div>
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
        <button type="submit">Register</button>
      </Form>
    </Formik>
  );
};

export default RegistrationForm;
