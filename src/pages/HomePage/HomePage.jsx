import DocumentTitle from "../../components/DocumentTitle/DocumentTitle";
import css from "./HomePage.module.css";

function HomePage() {
  return (
    <>
      <DocumentTitle>Home</DocumentTitle>
      <div>
        <h1 className={css.title}>Welcome to the Phone Book! </h1>
      </div>
    </>
  );
}

export default HomePage;
