import Table from "@/components/Table";
import { DashboardTableColumns } from "./partials/DashboardTableColumns";
import DashboardBarChart from "./partials/BarChart";
import Statistics from "./partials/Statistics";
import useGetTotalStatistics from "./hooks/use-get-total-statistics";
import { useState } from "react";
import dayjs from "dayjs";
import useGetActivities from "./hooks/use-get-activities";
import LoadingScreen from "@/components/reusable-component/LoadingScreen";

const Dashboard = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf("month"));
  const year = currentMonth.format("YYYY");
  const month = currentMonth.format("MMMM");
  const { totalStatisticsResponse } = useGetTotalStatistics({ year, month });
  const { activitiesResponse, isLoading } = useGetActivities();
  return (
    <div className="max-w-full overflow-y-scroll no-scrollbar">
      <Statistics totalStatistics={totalStatisticsResponse} />

      <div className="flex md:flex-row flex-col gap-4 mb-5 w-full">
        <div className="flex justify-center items-center bg-white rounded-lg w-full">
          <DashboardBarChart
            totalStatistics={totalStatisticsResponse}
            currentMonth={currentMonth}
            onMonthChange={setCurrentMonth}
          />
        </div>
      </div>

      <div className="bg-white mt-5 p-2 rounded-lg overflow-x-visible">
        <h2 className="mb-2 font-semibold text-gray-800 text-lg">
          Recent Activities and alerts
        </h2>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <div className="border-gray-200 border-t rounded-lg">
            <Table
              columns={DashboardTableColumns}
              data={activitiesResponse?.data?.records || []}
              totalItems={activitiesResponse?.data?.totalRecords}
              totalPages={activitiesResponse?.data?.totalPages}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
