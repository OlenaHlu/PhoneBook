import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";
import { useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/selectors";

const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);
  return (
    <ul className={css.component}>
      {contacts.map((contact) => {
        return (
          <li className={css.contactList} key={contact.id}>
            <Contact contact={contact} />
          </li>
        );
      })}
    </ul>
  );
};

export default ContactList;
