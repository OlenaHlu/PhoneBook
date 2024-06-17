import { useEffect } from "react"; //
import { useDispatch, useSelector } from "react-redux"; //
import DocumentTitle from "../../components/DocumentTitle/DocumentTitle"; //
import { selectLoading } from "../../redux/contacts/selectors"; //
import { fetchContacts } from "../../redux/contacts/operations"; //
import ContactList from "../../components/ContactList/ContactList"; //
import ContactForm from "../../components/ContactForm/ContactForm"; //
import SearchBox from "../../components/SearchBox/SearchBox"; //
import { toast } from "react-toastify"; //
import ModalForm from "../../components/ModalForm/ModalForm";

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

function ContactsPage() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchContacts())
      .unwrap()
      .then(() => {})
      .catch(() => {
        infoToast("Oops something went wrong!", "error");
      });
  }, [dispatch]);

  return (
    <>
      <DocumentTitle>Your contacts</DocumentTitle>
      <ContactForm />
      <SearchBox />
      <div>{loading && "Request in progress..."}</div>
      <ContactList />
      <ModalForm />
    </>
  );
}
export default ContactsPage;
