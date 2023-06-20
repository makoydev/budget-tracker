import { Outlet, useLoaderData } from "react-router-dom";
import wave from "../assets/wave.svg";
import Nav from "../components/Nav";
import { fetchData } from "../helpers";

interface LoaderData {
  userName: string | null;
}

export function mainLoader(): LoaderData {
  const userName = fetchData("userName");
  return { userName };
}

const Main: React.FC = () => {
  const { userName } = useLoaderData() as LoaderData;

  return (
    <div className="layout">
      <Nav userName={userName} />
      <main>
        <Outlet />
      </main>
      <img src={wave} alt="" />
    </div>
  );
};

export default Main;
