import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

function NotFoundPage() {
  return (
    <p className={css.notFound}>
      Sorry, page not found! Please go to{" "}
      <Link to="/" className={css.link}>
        Home Page!
      </Link>
    </p>
  );
}

export default NotFoundPage;
