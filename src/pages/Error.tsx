import { useRouteError, Link, useNavigate } from "react-router-dom";
import { HomeIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

interface CustomError {
  message?: string;
  statusText?: string;
}

const Error: React.FC = () => {
  const error = useRouteError() as CustomError;
  const navigate = useNavigate();

  const errorMessage =
    error.message || error.statusText || "An unknown error occurred.";

  return (
    <div className="error">
      <h1>Uh oh! We’ve got a problem.</h1>
      <p>{errorMessage}</p>
      <div className="flex-md">
        <button className="btn btn--dark" onClick={() => navigate(-1)}>
          <ArrowUturnLeftIcon width={20} />
          <span>Go Back</span>
        </button>
        <Link to="/" className="btn btn--dark">
          <HomeIcon width={20} />
          <span>Go home</span>
        </Link>
      </div>
    </div>
  );
};

export default Error;
