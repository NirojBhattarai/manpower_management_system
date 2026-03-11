import { useState } from "react";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Text,
  Cell,
} from "recharts";
import {
  Stages,
  TotalStatisticsDetailResponse,
} from "../interface/dashboard-interface";

const CHART_CONFIG = {
  colors: {
    primary: "#3b82f6",
    secondary: "#e2e8f0",
    text: "#64748b",
    grid: "#e2e8f0",
  },
  typography: {
    fontSize: 12,
    fontFamily: "inherit",
  },
  animationDuration: 400,
};

interface IStatisticsProps {
  totalStatistics: TotalStatisticsDetailResponse;
  currentMonth: dayjs.Dayjs;
  onMonthChange: (date: dayjs.Dayjs) => void;
}

const ChartCard = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col bg-white p-6 md:p-8 border border-gray-100 rounded-3xl w-full h-full">
    {children}
  </div>
);

interface ChartHeaderProps {
  currentMonth: dayjs.Dayjs;
  onPrev: () => void;
  onNext: () => void;
}

const ChartHeader = ({ currentMonth, onPrev, onNext }: ChartHeaderProps) => (
  <div className="flex justify-between items-center gap-4 mb-8">
    <div>
      <h3 className="font-semibold text-gray-950 text-xl">
        Monthly Recruitment Overview
      </h3>
      <p className="text-slate-500 text-sm">Recruitment stages breakdown</p>
    </div>
    <div className="flex items-center gap-1.5 bg-gray-50 shadow-inner px-2 py-1 border border-gray-200 rounded-full">
      <button
        onClick={onPrev}
        className="hover:bg-white hover:shadow p-1.5 rounded-full text-slate-500 hover:text-blue-600 active:scale-95 transition-all duration-150"
        aria-label="Previous Month"
      >
        <ChevronLeft size={18} />
      </button>
      <span className="w-27.5 font-medium text-slate-700 text-sm text-center select-none">
        {currentMonth.format("MMMM YYYY")}
      </span>
      <button
        onClick={onNext}
        className="hover:bg-white hover:shadow p-1.5 rounded-full text-slate-500 hover:text-blue-600 active:scale-95 transition-all duration-150"
        aria-label="Next Month"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  </div>
);

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-gray-950 shadow-xl p-3 px-4 border border-gray-800 rounded-xl text-white">
        <p className="mb-1 text-slate-400 text-xs">{data.name}</p>
        <p className="font-bold text-lg">
          {data.value.toLocaleString()}{" "}
          <span className="font-medium text-slate-300 text-xs">units</span>
        </p>
      </div>
    );
  }
  return null;
};

const EmptyState = () => (
  <div className="flex flex-col flex-1 justify-center items-center bg-slate-50 border border-slate-200 border-dashed rounded-2xl h-80 min-h-80">
    <p className="font-semibold text-slate-600">No Data Available</p>
    <p className="mt-1 text-slate-500 text-sm">
      Try switching to a different month.
    </p>
  </div>
);

const DashboardBarChart: React.FC<IStatisticsProps> = ({
  totalStatistics,
  currentMonth,
  onMonthChange,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const barGraphData = [
    {
      month: totalStatistics?.data?.month,
      stages: totalStatistics?.data?.stages?.map((stage: Stages) => ({
        name: stage.name,
        value: stage.count,
      })),
    },
  ];

  const BAR_COLORS = [
    "#3b82f6", // blue
    "#10b981", // emerald
    "#f59e0b", // amber
    "#ef4444", // red
    "#8b5cf6", // violet
    "#06b6d4", // cyan
    "#f97316", // orange
  ];

  const monthData = barGraphData.find(
    (item) =>
      dayjs(item.month, "YYYY-MM").format("YYYY-MM") ===
      currentMonth.format("YYYY-MM"),
  );

  const chartData = monthData ? monthData.stages : [];

  const handlePrevMonth = () =>
    onMonthChange(currentMonth.subtract(1, "month"));

  const handleNextMonth = () => onMonthChange(currentMonth.add(1, "month"));

  const barSize = window.innerWidth < 768 ? 24 : 40;

  return (
    <ChartCard>
      <ChartHeader
        currentMonth={currentMonth}
        onPrev={handlePrevMonth}
        onNext={handleNextMonth}
      />

      {chartData?.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex-1 w-full min-h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
              barSize={barSize}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <CartesianGrid
                vertical={false}
                stroke={CHART_CONFIG.colors.grid}
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={({ x, y, payload }) => {
                  const lines = payload.value.split("\n");
                  return (
                    <Text
                      x={x}
                      y={y + 8}
                      width={barSize * 2}
                      textAnchor="middle"
                      verticalAnchor="start"
                      fill={CHART_CONFIG.colors.text}
                      fontSize={CHART_CONFIG.typography.fontSize}
                      lineHeight="16px"
                    >
                      {lines.join(" ")}
                    </Text>
                  );
                }}
                interval={0}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: CHART_CONFIG.colors.text,
                  fontSize: CHART_CONFIG.typography.fontSize,
                  dx: -5,
                }}
                tickFormatter={(value) => value.toLocaleString()}
              />

              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "transparent" }}
              />

              <Bar
                dataKey="value"
                background={{
                  fill: CHART_CONFIG.colors.secondary,
                  radius: 8,
                  opacity: 0.3,
                }}
                radius={[8, 8, 0, 0]}
                animationDuration={CHART_CONFIG.animationDuration}
              >
                {chartData?.map((_entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    cursor="pointer"
                    fill={BAR_COLORS[index % BAR_COLORS.length]}
                    fillOpacity={
                      activeIndex === null || activeIndex === index ? 1 : 0.3
                    }
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </ChartCard>
  );
};

export default DashboardBarChart;
