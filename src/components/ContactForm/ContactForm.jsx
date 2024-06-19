import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import { toast } from "react-toastify";
import { selectUser } from "../../redux/auth/selectors";
import { RiUser6Fill } from "react-icons/ri";
import { MdPhone } from "react-icons/md";
import css from "./ContactForm.module.css";
import { FaFaceSmileBeam } from "react-icons/fa6";

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
      .min(3, "Too Short!")
      .max(30, "Too Long!")
      .required("Required"),
    number: Yup.string()
      .min(9, "Too Short!")
      .max(12, "Too Long!")
      .matches(
        /^\d{0,3}-?\d{0,2}-?\d{0,2}(-?\d{0,3})?$/,
        "Invalid phone number format"
      )
      .required("Required"),
  });

  const handleSubmit = (values, actions) => {
    values.id = nanoid();
    const { name, number } = values;
    console.log("Submitting contact:", { name, number });

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
    <div className={css.container}>
      <div className={css.formContainer}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Form className={css.form}>
            <p className={css.formTitle}>
              Bring Someone New Onboard!
              <span>
                <FaFaceSmileBeam className={css.smileIcon} />
              </span>
            </p>
            <div className={css.inputContainer}>
              <label className={css.formInputLabel} htmlFor={nameFieldId}>
                Name
              </label>
              <div className={css.iconPosition}>
                <RiUser6Fill className={css.icon} />
                <Field
                  className={css.input}
                  type="text"
                  name="name"
                  id={nameFieldId}
                  placeholder="Enter name"
                />
              </div>
              <ErrorMessage className={css.error} name="name" component="div" />
            </div>

            <div className={css.inputContainer}>
              <label className={css.formInputLabel} htmlFor={numberFieldId}>
                Number
              </label>
              <div className={css.iconPosition}>
                <MdPhone className={css.icon} />
                <Field
                  className={css.input}
                  type="text"
                  name="number"
                  id={numberFieldId}
                  placeholder="Enter phone number"
                />
              </div>
              <ErrorMessage
                className={css.error}
                name="number"
                component="div"
              />
            </div>

            <button className={css.btn} type="submit">
              Add contact
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ContactForm;
