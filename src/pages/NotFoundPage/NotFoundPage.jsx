import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <p>
      Sorry, page not found! Please go to <Link to="/">Home Page!</Link>
    </p>
  );
}

export default NotFoundPage;
