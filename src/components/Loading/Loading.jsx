import { DNA } from "react-loader-spinner";
import css from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={css.loader}>
      <DNA
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
};
export default Loading;
