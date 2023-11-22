import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiSupport,
  HiTable,
  HiUser,
  HiViewBoards,
  HiOutlineCloudUpload,
} from "react-icons/hi";
import { useAuth } from "../contexts/AuthProvider";
import { jwtDecode } from "jwt-decode";

export const SideBar = () => {
  const { user } = useAuth();
  function getUserRole() {
    try {
      return user?.role;
    } catch (error) {
      return user?.role;
    }
  }

  const commonRoutes = [
    {
      id: "logout",
      link: "/logout",
      icon: HiTable,
      displayText: "Log out",
    },
  ];
  const adminRoutes = [
    {
      id: "uploadUser",
      link: "/admin/dashboard/uploadUser",
      icon: HiUser,
      displayText: "Register User",
    },
    {
      id: "manageUser",
      link: "/admin/dashboard/manageUser",
      icon: HiUser,
      displayText: "Manage User",
    },
  ];
  const sidebarItems = [
    {
      id: "dashboard",
      link: "/admin/dashboard",
      icon: HiChartPie,
      displayText: "Dashboard",
    },
    {
      id: "uploadBook",
      link: "/admin/dashboard/upload",
      icon: HiOutlineCloudUpload,
      displayText: "Upload Book",
    },
    {
      id: "manageBook",
      link: "/admin/dashboard/manage",
      icon: HiInbox,
      displayText: "ManageBooks",
    },

    {
      id: "orders",
      link: "/admin/dashboard/orders",
      icon: HiChartPie,
      displayText: "Orders",
    },
  ].concat(
    getUserRole() === "admin" ? [...adminRoutes, ...commonRoutes] : commonRoutes
  );

  return (
    <div>
      <Sidebar
        aria-label="Sidebar with content separator example"
        className="static"
      >
        <Sidebar.Logo
          href="#"
          // img="/favicon.svg"
          className="w-10 h-10 rounded-full"
          imgAlt="Flowbite logo"
        >
          <p>
            Hello, {user?.username || "Demo User"}
            {/* User */}
          </p>
        </Sidebar.Logo>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            {sidebarItems.map((item) => {
              return (
                <Sidebar.Item key={item.id} href={item.link} icon={item.icon}>
                  <p>{item.displayText}</p>
                </Sidebar.Item>
              );
            })}
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};
