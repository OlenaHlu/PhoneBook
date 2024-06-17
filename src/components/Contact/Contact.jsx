import { RiUser6Fill } from "react-icons/ri";
import { MdPhone } from "react-icons/md";
import css from "./Contact.module.css";
import { useDispatch, useSelector } from "react-redux";
import { editContact } from "../../redux/contacts/operations";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { openModal } from "../../redux/modal/slice";
import { startEditing, stopEditing } from "../../redux/contacts/slice.js";

const Contact = ({ contact: { id, name, number } }) => {
  const dispatch = useDispatch();
  const isEditing = useSelector((state) => state.contacts.isEditing);

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

  const handleDelete = () => {
    dispatch(openModal(id));
  };

  const handleEdit = () => {
    dispatch(editContact({ id, name, number }))
      .unwrap()
      .then(() => {
        infoToast("Edit success!", "success");
      })
      .catch(() => {
        infoToast("Edit failed!", "error");
      });
  };

  const handleStartEditing = () => {
    dispatch(startEditing());
  };

  const handleStopEditing = () => {
    dispatch(stopEditing());
  };

  return (
    <div className={css.contactContainer}>
      <div className={css.contactItem}>
        <RiUser6Fill />
        {isEditing ? (
          <input
            className={css.contactNameInput}
            value={name}
            onChange={(event) =>
              dispatch(editContact({ id, name: event.target.value, number }))
            }
          />
        ) : (
          <p className={css.contactName}>{name}</p>
        )}
      </div>
      <div className={css.contactItem}>
        <MdPhone />
        {isEditing ? (
          <input
            className={css.contactNumberInput}
            value={number}
            onChange={(event) =>
              dispatch(editContact({ id, name, number: event.target.value }))
            }
          />
        ) : (
          <p>{number}</p>
        )}
      </div>

      {isEditing ? (
        <>
          <button className={css.deleteBtn} type="submit" onClick={handleEdit}>
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
  );
};

export default Contact;
