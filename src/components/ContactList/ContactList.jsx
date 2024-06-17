import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";
import { useSelector } from "react-redux";
import { selectContacts } from "../../redux/contacts/selectors";

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  return (
    <>
      <ul className={css.component}>
        {contacts.map((contact) => {
          return (
            <li className={css.contactList} key={contact.id}>
              <Contact contact={contact} />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ContactList;
