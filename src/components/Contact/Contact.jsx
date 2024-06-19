import { RiUser6Fill } from "react-icons/ri";
import { MdPhone } from "react-icons/md";
import css from "./Contact.module.css";
import { useDispatch } from "react-redux";
import { editContact } from "../../redux/contacts/operations";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { openModal } from "../../redux/modal/slice";
import { useState } from "react";

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

const Contact = ({ contact: { id, name, number } }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [updateContact, setUpdateContact] = useState({ name, number });

  const onChange = (event) =>
    setUpdateContact((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  const handleStartEditing = () => setIsEditing(true);
  const handleStopEditing = () => setIsEditing(false);

  const handleEdit = () => {
    dispatch(editContact({ id, ...updateContact }))
      .unwrap()
      .then(() => {
        infoToast("Edit success!", "success");
        setIsEditing(false);
      })
      .catch(() => {
        infoToast("Edit failed!", "error");
      });
  };

  const handleDelete = () => {
    dispatch(openModal(id));
  };

  return (
    <div className={css.container}>
      <div className={css.contactContainer}>
        <div className={css.contactItem}>
          <RiUser6Fill className={css.icon} />
          {isEditing ? (
            <input
              className={css.contactNameInput}
              name="name"
              value={updateContact.name}
              onChange={onChange}
            />
          ) : (
            <p className={css.contactName}>{name}</p>
          )}
        </div>
        <div className={css.contactItem}>
          <MdPhone className={css.icon} />
          {isEditing ? (
            <input
              className={css.contactNumberInput}
              name="number"
              value={updateContact.number}
              onChange={onChange}
            />
          ) : (
            <p>{number}</p>
          )}
        </div>

        {isEditing ? (
          <>
            <button
              className={css.deleteBtn}
              type="button"
              onClick={handleEdit}
            >
              Update
            </button>
            <button
              className={css.deleteBtn}
              type="button"
              onClick={handleStopEditing}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            className={css.deleteBtn}
            type="button"
            onClick={handleStartEditing}
          >
            Edit
          </button>
        )}

        <button className={css.deleteBtn} type="button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Contact;
