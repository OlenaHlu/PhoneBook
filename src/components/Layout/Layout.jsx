import { Suspense } from "react";
import AppBar from "../AppBar/AppBar";
import Loading from "../Loading/Loading";

const Layout = ({ children }) => {
  return (
    <div>
      <AppBar />
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
};

export default Layout;
