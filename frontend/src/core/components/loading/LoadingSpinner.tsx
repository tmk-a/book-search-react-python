import { FadeLoader } from "react-spinners";
import "./LoadingSpinner.scss";

const LoadingSpinner = () => {
  return (
    <div className="spinner">
      <FadeLoader height={20} margin={5} radius={5} width={5} color="#6c8e7d" />
    </div>
  );
};

export default LoadingSpinner;
