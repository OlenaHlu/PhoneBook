import { useId } from "react";
import css from "./SearchBox.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectNameFilter } from "../../redux/selectors";
import { setStatusFilter } from "../../redux/filtersSlice";

const SearchBox = () => {
  const searchId = useId();
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);

  const handleSearch = (event) => {
    const name = event.target.value.trim();
    dispatch(setStatusFilter(name));
  };

  return (
    <div className={css.serchForm}>
      <label className={css.searchTitle} htmlFor={searchId}>
        Find contacts by name
      </label>
      <input
        className={css.serchInput}
        type="text"
        id={searchId}
        value={filter}
        onChange={handleSearch}
        name="name"
      />
    </div>
  );
};

export default SearchBox;
