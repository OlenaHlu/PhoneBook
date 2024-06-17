import { useEffect, lazy } from "react"; //
import { useDispatch, useSelector } from "react-redux"; //
import { Route, Routes } from "react-router-dom"; //
import Layout from "../Layout/Layout"; //
import PrivateRoute from "../PrivateRoute"; //
import RestrictedRoute from "../RestrictedRoute"; //
import { refreshUser } from "../../redux/auth/operations"; //
import { selectIsRefreshing } from "../../redux/auth/selectors"; //
import Loading from "../Loading/Loading"; //
import { ToastContainer } from "react-toastify"; //

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const ContactsPage = lazy(() =>
  import("../../pages/ContactsPage/ContactsPage")
);
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const RegistrationPage = lazy(() =>
  import("../../pages/RegistrationPage/RegistrationPage")
);

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <div>
      <Loading />
    </div>
  ) : (
    <Layout>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/register"
          element={
            <RestrictedRoute
              redirectTo="/contacts"
              component={<RegistrationPage />}
            />
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute redirectTo="/contacts" component={<LoginPage />} />
          }
        />
        <Route
          path="/contacts"
          element={
            <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
