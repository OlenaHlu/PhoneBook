import { RiUser6Fill } from "react-icons/ri";
import { MdPhone } from "react-icons/md";
import css from "./Contact.module.css";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsOps";

const Contact = ({ contact: { id, name, number } }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(id));
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

      <button className={css.deleteBtn} type="button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default Contact;
