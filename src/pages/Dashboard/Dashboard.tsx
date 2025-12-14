import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { fetchCRMSetting } from "../../service/crmSetting";
import { getDashboard } from "../../service/dashboard";
import LoadingPage from "../Loading/Loading";
import StatsCard from "./component/StatsCard";
import Table from "../../component/table/Table";
import {
  absentColumn,
  activityColumns,
  anniversariesColumns,
  birthdayColumns,
} from "./component/columnsData";
import moment from "moment";
import { getAuthUserPermission, openInNewTab } from "../../util/ClientUtils";
import React from "react";
import Button from "../../component/form/Button";

const crmSessionData = JSON.parse(sessionStorage.getItem("CRM") as string);

function Dashboard() {
  const {
    data: crmData,
    isLoading: crmLoading,
    isSuccess: crmDataSuccess,
  } = useQuery({
    queryKey: ["crm-setting-list"],
    queryFn: fetchCRMSetting,
  });

  const { data: dashboadrData, isLoading: dashboadrLoading } = useQuery({
    queryKey: ["dashboard-list"],
    queryFn: getDashboard,
  });

  const navigate = useNavigate();

  if (crmLoading || dashboadrLoading) {
    return <LoadingPage />;
  }

  if (crmDataSuccess && !crmSessionData) {
    sessionStorage.setItem("CRM", JSON.stringify(crmData.data));
  }

  const handledDashboardData = dashboadrData ? dashboadrData : [];

  return (
    <div className="bg-white rounded-md">
      {/* <Header /> */}
      <div className="p-6">
        {getAuthUserPermission().includes("manage_tasks.view_all") && (
          <div className="flex">
            <div className="w-full mr-3">
              <h3 className="text-2xl font-bold mb-6">Today's Task</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <StatsCard
                  onClick={() => {
                    navigate("/task-list", {
                      state: {
                        taskStartDate: moment(new Date()).format("YYYY-MM-DD"),
                      },
                    });
                  }}
                  bgColor="#27005d"
                  label="Task Follow up today"
                  value={handledDashboardData?.tasks_followup_today || 0}
                />
                <StatsCard
                  onClick={() => {
                    navigate("/manage-leads", {
                      state: {
                        leadStartDate: moment(new Date()).format("YYYY-MM-DD"),
                      },
                    });
                  }}
                  bgColor="#7149c6"
                  label="Task Follow Up Today"
                  value={handledDashboardData?.leads_followup_today || 0}
                />
              </div>
            </div>
            <div className="w-full">
              <h3 className="text-2xl font-bold mb-6">Pending Items</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <StatsCard
                  onClick={() => openInNewTab("/task-list")}
                  bgColor="#27005d"
                  label="Task Follow Up"
                  value={handledDashboardData?.pending_task_followup || 0}
                />
                <StatsCard
                  onClick={() => openInNewTab("/manage-leads")}
                  bgColor="#7149c6"
                  label="Leads Follow Up"
                  value={handledDashboardData?.pending_lead_followup || 0}
                />
              </div>
            </div>
          </div>
        )}
        {getAuthUserPermission().includes("manage_clients.view_all") && (
          <React.Fragment>
            <h3 className="text-2xl font-bold mb-6">Client Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-4">
              <StatsCard
                onClick={() => navigate("/client-list")}
                bgColor="#153e90"
                label="Total Profile"
                value={handledDashboardData?.total_clients || 0}
              />
              <StatsCard
                onClick={() => navigate("/client-list")}
                bgColor="#ff5200"
                label="Last 30 days Created Profile"
                value={handledDashboardData?.last_30_days_clients || 0}
              />
              <StatsCard
                onClick={() => navigate("/client-list")}
                bgColor="#015551"
                label="Total Paid Profile"
                value={handledDashboardData?.total_paid_profiles || 0}
              />
              <StatsCard
                onClick={() => navigate("/client-list")}
                bgColor="#693382"
                label="Last 30 Days Paid Profile"
                value={handledDashboardData?.last_30_days_paid_profiles || 0}
              />
              <StatsCard
                onClick={() => navigate("/membership-expired")}
                bgColor="#480032"
                label="Total Membership Expired"
                value={handledDashboardData?.total_expired_memberships || 0}
              />
              <StatsCard
                onClick={() => navigate("/client-list")}
                bgColor="#007965"
                label="Total NRI Client"
                value={handledDashboardData?.total_nri_clients || 0}
              />
              <StatsCard
                onClick={() => navigate("/task-list")}
                bgColor="#1DB9C3"
                label="Total Task"
                value={handledDashboardData?.total_tasks || 0}
              />
              <StatsCard
                onClick={() =>
                  navigate("/task-list", {
                    state: {
                      taskPriority: "Urgent",
                    },
                  })
                }
                bgColor="#EA047E"
                label="Urget Task"
                value={handledDashboardData?.urgent_tasks || 0}
              />
              <StatsCard
                onClick={() => navigate("/task-list")}
                bgColor="#0F6292"
                label="Client Meeting"
                value={handledDashboardData?.clients_meetings || 0}
              />
              <StatsCard
                onClick={() => navigate("/task-list")}
                bgColor="#7149C6"
                label="Family Meeting"
                value={handledDashboardData?.family_meetings || 0}
              />
              <StatsCard
                onClick={() => navigate("/manage-leads")}
                bgColor="#27005D"
                label="Total Leads"
                value={handledDashboardData?.total_leads || 0}
              />
              <StatsCard
                onClick={() =>
                  navigate("/manage-leads", {
                    state: {
                      leadsDashboardThirtyDays: moment(new Date())
                        .subtract(30, "days")
                        .format("YYYY-MM-DD"),
                    },
                  })
                }
                bgColor="#FC2947"
                label="Last 30 Days Leads"
                value={handledDashboardData?.last_30_days_leads || 0}
              />
            </div>

            <div
              className="mb-2 bg-white p-4 rounded shadow ag-theme-alpine"
              // style={{ height: "300px" }}
            >
              <div className="flex justify-between mb-2">
                <h3 className="font-semibold text-black">
                  Today’s Client Birthday
                </h3>
                <Button
                  text="View More"
                  onClick={() => navigate("/client-list")}
                />
                {/* <a href="#" className="text-xs text-blue-500 underline">
                  View More
                </a> */}
              </div>
              <Table
                borderX
                columns={birthdayColumns}
                data={handledDashboardData?.todays_birthdays || []}
              />
            </div>
            <div className="mb-2 bg-white p-4 rounded shadow ag-theme-alpine">
              <div className="flex justify-between mb-2">
                <h3 className="font-semibold text-black">
                  Today’s Client Anniversaries
                </h3>
                <Button
                  text="View More"
                  // onClick={() => navigate("/activity-log")}
                />
                {/* <a href="#" className="text-xs text-blue-500 underline">
                  View More
                </a> */}
              </div>
              <Table
                borderX
                columns={anniversariesColumns}
                data={handledDashboardData?.todays_anniversaries || []}
              />
            </div>
          </React.Fragment>
        )}
        {/* <TodaysBirthday /> */}
        {/* <TodaysAnniversaries /> */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-6 mb-6">
          <div className="md:col-span-4">
            <div className="flex justify-between mb-2">
              <h3 className="font-semibold text-black">Absent Today</h3>
              <Button
                text="View More"
                // onClick={() => navigate("/activity-log")}
              />
              {/* <a href="#" className="text-xs text-blue-500 underline">
                View More
              </a> */}
            </div>
            <Table
              borderX
              columns={absentColumn}
              data={handledDashboardData?.absent_users}
            />
          </div>
          <div className="md:col-span-6">
            <div className="flex justify-between mb-2">
              <h3 className="font-semibold text-black">User Activity</h3>
              <Button
                text="View More"
                onClick={() => navigate("/activity-log")}
              />

              {/* <div
                className="text-xs cursor-pointer text-blue-500 underline"
                onClick={() => navigate("/activity-log")}
              >
                View More
              </div> */}
            </div>
            <Table
              borderX
              columns={activityColumns}
              data={handledDashboardData?.user_activity || []}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
