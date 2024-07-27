import { Sidebar } from "flowbite-react";
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const DashSidebar = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
      <Sidebar className="w-full md:w-56">
        <Sidebar.Items>
          <Sidebar.ItemGroup className="flex flex-col gap-1">
            <Link to="/dashboard?tab=dash">
              <Sidebar.Item active icon={HiChartPie} as="div">
                Dashboard
                </Sidebar.Item>
            </Link>

            <Link to="/dashboard?tab=profile">
              <Sidebar.Item
                active
                icon={HiUser}
                label={currentUser.isAdmin ? "Admin" : "User"}
                labelColor="dark"
                as="div"
              >
                Profile
              </Sidebar.Item>
            </Link>

            {currentUser.isAdmin && (
              <Link to="/dashboard?tab=posts">
                <Sidebar.Item active icon={HiDocumentText} as="div">
                  Posts
                </Sidebar.Item>
              </Link>
            )}
            <>
              <Link to="/dashboard?tab=users">
                <Sidebar.Item active icon={HiOutlineUserGroup} as="div">
                  Users
                </Sidebar.Item>
              </Link>
              <Link to="/dashboard?tab=comments">
                <Sidebar.Item active icon={HiAnnotation} as="div">
                  Comments
                </Sidebar.Item>
              </Link>
            </>

            <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer">
              Sign Out
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default DashSidebar;
