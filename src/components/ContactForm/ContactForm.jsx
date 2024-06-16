import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import { toast } from "react-toastify";
import { selectUser } from "../../redux/auth/selectors";

import css from "./ContactForm.module.css";

const initialValues = {
  name: "",
  number: "",
};

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

const ContactForm = () => {
  const dispatch = useDispatch();
  const nameFieldId = useId();
  const numberFieldId = useId();
  const { name } = useSelector(selectUser);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must not exceed 50 characters")

      .required("Name is required"),
    number: Yup.string()
      .min(7, "Number must be at least 7 characters")
      .max(15, "Number must not exceed 15 characters")
      .matches(/^\d{0,3}-?\d{0,2}-?\d{0,2}$/, "Invalid phone number format")
      .required("Number is required"),
  });

  const handleSubmit = (values, actions) => {
    values.id = nanoid();
    const { name, number } = values;
    dispatch(addContact({ name, number }))
      .unwrap()
      .then(() => {
        infoToast("Contact add successful!", "success");
      })
      .catch(() => {
        infoToast("Contact add failed!", "error");
      });
    actions.resetForm();
  };

  return (
    <>
      <p>Welcome, {name}!</p>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className={css.formContainer}>
          <div className={css.inputContainer}>
            <label className={css.inputTitle} htmlFor={nameFieldId}>
              Name
            </label>
            <Field
              className={css.inputItem}
              type="text"
              name="name"
              id={nameFieldId}
              placeholder="Enter your name"
            />
            <ErrorMessage className={css.formErr} name="name" component="div" />
          </div>

          <div className={css.inputContainer}>
            <label className={css.inputTitle} htmlFor={numberFieldId}>
              Number
            </label>
            <Field
              className={css.inputItem}
              type="text"
              name="number"
              id={numberFieldId}
              placeholder="Enter your phone number"
            />
            <ErrorMessage
              className={css.formErr}
              name="number"
              component="div"
            />
          </div>

          <button className={css.formBtn} type="submit">
            Add contact
          </button>
        </Form>
      </Formik>
    </>
  );
};

export default ContactForm;
