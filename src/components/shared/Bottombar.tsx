import "./style.css";
import { NavLink, useLocation } from "react-router-dom";

import { bottombarLinks } from "../../constants/Constant";

const Bottombar = () => {
  const { pathname } = useLocation();
  return (
    <div className="bottom-bar">
      <ul className="bottom-avlinks">
        {bottombarLinks.map((nav, i) => {
          const isActive = pathname === nav.route;
          return (
            <li key={i}>
              <NavLink
                className={`nav-bottom-li ${isActive && "activeClassbottom"} `}
                to={nav.route}
              >
                <span className="icon-btm">{nav.icon}</span>
                <span className="bottom-icon-label">{nav.label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Bottombar;
