import { FaHome } from "react-icons/fa";
import { IoMdPeople } from "react-icons/io";
import { MdOutlineExplore } from "react-icons/md";
import { CiBookmark } from "react-icons/ci";
import { IoCreateOutline } from "react-icons/io5";
export const sidebarLinks = [
  {
    icon: <FaHome />,
    route: "/home",
    label: "Home",
  },
  {
    icon: <MdOutlineExplore />,
    route: "/home/explore",
    label: "Explore",
  },
  {
    icon: <IoMdPeople />,
    route: "/home/all-users",
    label: "People",
  },
  {
    icon: <CiBookmark />,
    route: "/home/saved",
    label: "Saved",
  },
  {
    icon: <IoCreateOutline />,
    route: "/home/create-post",
    label: "Create Post",
  },
];

export const bottombarLinks = [
  {
    icon: <FaHome />,
    route: "/home",
    label: "Home",
  },
  {
    icon: <MdOutlineExplore />,
    route: "/home/explore",
    label: "Explore",
  },
  {
    icon: <IoMdPeople />,
    route: "/home/all-users",
    label: "People",
  },
  {
    icon: <IoCreateOutline />,
    route: "/home/create-post",
    label: "Create Post",
  },
];

export const naviBar = [
  {
    name: "Posts",
    value: "post",
  },
  {
    name: "Liked",
    value: "like",
  },
  {
    name: "Saved",
    value: "saved",
  },
];
