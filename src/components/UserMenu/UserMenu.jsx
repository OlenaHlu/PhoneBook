import { useDispatch } from "react-redux";
import { logout } from "../../redux/auth/operations";

const UserMenu = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <button type="button" onClick={() => dispatch(logout())}>
        Log Out
      </button>
    </div>
  );
};

export default UserMenu;
