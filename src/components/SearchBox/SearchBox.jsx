import { useId } from "react";
import css from "./SearchBox.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectNameFilter } from "../../redux/filters/selectors";
import { setStatusFilter } from "../../redux/filters/slice";

const SearchBox = () => {
  const searchId = useId();
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);

  const handleSearch = (event) => {
    const name = event.target.value.trim();
    dispatch(setStatusFilter(name));
  };

  return (
    <div className={css.container}>
      <div className={css.formContainer}>
        <label className={css.inputLabel} htmlFor={searchId}>
          Find contacts by name/number
        </label>
        <input
          className={css.input}
          type="text"
          id={searchId}
          value={filter}
          onChange={handleSearch}
          name="name"
        />
      </div>
    </div>
  );
};

export default SearchBox;
