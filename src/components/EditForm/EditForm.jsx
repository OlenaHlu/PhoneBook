import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { editContact } from "../../redux/contacts/operations";

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

const EditForm = ({ contact: { id, name, number }, onClose }) => {
  const dispatch = useDispatch();
  const nameFieldId = useId();
  const numberFieldId = useId();

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

  const handleUpdate = (values, actions) => {
    const { name, number } = values;
    dispatch(editContact({ id, name, number }))
      .unwrap()
      .then(() => {
        infoToast("Contact add successful!", "success");
      })
      .catch(() => {
        infoToast("Contact add failed!", "error");
      });
    actions.resetForm();
    onClose();
  };

  return (
    <Formik
      initialValues={{
        name: name || "",
        number: number || "",
      }}
      onSubmit={handleUpdate}
      validationSchema={validationSchema}
    >
      <Form>
        <div>
          <label htmlFor={nameFieldId}>Name</label>
          <Field
            type="text"
            name="name"
            id={nameFieldId}
            placeholder="Enter name"
          />
          <ErrorMessage name="name" component="div" />
        </div>
        <div>
          <label htmlFor={numberFieldId}>Number</label>
          <Field
            type="text"
            name="number"
            id={numberFieldId}
            placeholder="Enter phone number"
          />
          <ErrorMessage name="number" component="div" />
        </div>
        <div>
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </Form>
    </Formik>
  );
};
export default EditForm;
