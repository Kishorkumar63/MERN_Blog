import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../compnents/DashSidebar";
import DashProfile from "../compnents/DashProfile";
import { Dashpost } from "../compnents/Dashpost";
export const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
    console.log(tabFromUrl);
  }, [location.search]);
  return (
    <div>
      <div className="">
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {/* Profile.... */}
      {tab === "profile" && <DashProfile />}
      {tab === "posts" && <Dashpost />}
    </div>
  );
};
