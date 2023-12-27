import "./style.css";
import { Outlet } from "react-router-dom";

import Topbar from "../components/shared/Topbar";
import LeftBar from "../components/shared/LeftBar";
import Bottombar from "../components/shared/Bottombar";
import RightBar from "../components/shared/RightBar";

export const RouteLayout = () => {
  return (
    <div className="route_layout">
      <Topbar />
      <LeftBar />

      <section className="outlet_Renderer">
        <Outlet />
      </section>
      <RightBar />
      <Bottombar />
    </div>
  );
};
