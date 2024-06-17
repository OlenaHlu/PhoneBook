import { useId } from "react";
import css from "./SearchBox.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setStatusFilter } from "../../redux/filters/slice";
import {
  selectNameFilter,
  selectNumberFilter,
} from "../../redux/filters/selectors";

const SearchBox = () => {
  const searchId = useId();
  const dispatch = useDispatch();
  const name = useSelector(selectNameFilter);
  const number = useSelector(selectNumberFilter);

  const handleSearch = (event) => {
    const query = event.target.value.trim();
    dispatch(
      setStatusFilter({
        name: query.toLowerCase(),
        number: query,
      })
    );
  };

  return (
    <div className={css.serchForm}>
      <label className={css.searchTitle} htmlFor={`${searchId}-name`}>
        Find contacts
      </label>
      <input
        className={css.serchInput}
        type="text"
        id={`${searchId}-name`}
        value={name || number}
        onChange={handleSearch}
        placeholder="Enter name or number..."
      />
    </div>
  );
};

export default SearchBox;
