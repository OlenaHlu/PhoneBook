import ContactForm from "../ContactForm/ContactForm";
import SearchBox from "../SearchBox/SearchBox";
import ContactList from "../ContactList/ContactList";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { selectError, selectLoading } from "../../redux/selectors";
import { useEffect } from "react";
import { fetchContacts } from "../../redux/contactsOps";

import css from "./App.module.css";

function App() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.mainContainer}>
      <h1 className={css.mainTitle}>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      {loading && !error && <Loading />}
      {error && <Error />}
      <ContactList />
    </div>
  );
}

export default App;
