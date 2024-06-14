import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import { nanoid } from "nanoid";
import css from "./ContactForm.module.css";

import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsOps";

const initialValues = {
  name: "",
  number: "",
};
const ContactForm = () => {
  const nameFieldId = useId();
  const numberFieldId = useId();

  const dispatch = useDispatch();

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
    const { name } = values;
    const { number } = values;
    dispatch(addContact({ name, number }));
    actions.resetForm();
  };

  return (
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
          />
          <ErrorMessage className={css.formErr} name="number" component="div" />
        </div>

        <button className={css.formBtn} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
