import { RiUser6Fill } from "react-icons/ri";
import { MdPhone } from "react-icons/md";
import css from "./Contact.module.css";
import { useDispatch } from "react-redux";
import { editContact } from "../../redux/contacts/operations";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { openModal } from "../../redux/modal/slice";

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

  const handleDelete = () => {
    dispatch(openModal(id));
  };

  const handleEdit = ({ name, number }) => {
    dispatch(editContact({ id, name, number }))
      .unwrap()
      .then(() => {
        infoToast("Edit success!", "success");
      })
      .catch(() => {
        infoToast("Edit failed!", "error");
      });
  };

  return (
    <div className={css.contactContainer}>
      <div className={css.contactItem}>
        <RiUser6Fill />
        <p className={css.contactName}>{name}</p>
      </div>
      <div className={css.contactItem}>
        <MdPhone />
        <p>{number}</p>
      </div>

      <button className={css.deleteBtn} type="submit" onClick={handleEdit}>
        Update
      </button>
      <button className={css.deleteBtn} type="button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default Contact;
