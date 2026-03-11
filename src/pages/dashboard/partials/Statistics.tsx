import React, { useEffect, useMemo, useState } from "react";
import { RefreshCcw } from "lucide-react";
import { FaUserCheck, FaUsers } from "react-icons/fa";
import { BiSolidPlaneAlt } from "react-icons/bi";
import { TotalStatisticsDetailResponse } from "../interface/dashboard-interface";

interface IStatisticsProps {
  totalStatistics: TotalStatisticsDetailResponse;
}

interface StatCardProps {
  icon: React.ElementType;
  title: string;
  value: number | null;
  accent: string;
  iconColor: string;
  iconBg: string;
  index: number;
}

const StatCard: React.FC<StatCardProps> = React.memo(
  ({ icon: Icon, title, value, accent, iconColor, iconBg, index }) => {
    const isLoading = value === null;

    return (
      <div
        className="relative flex flex-col bg-white hover:shadow-lg px-6 py-6 border border-gray-100 rounded-2xl overflow-hidden transition-all hover:-translate-y-0.5 duration-300"
        style={{
          animationDelay: `${index * 80}ms`,
          boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        }}
      >
        <div
          className="-top-8 -right-8 absolute opacity-[0.07] blur-2xl rounded-full w-28 h-28"
          style={{ background: accent }}
        />

        <div className="flex items-center gap-3 mb-6">
          <div
            className="flex justify-center items-center rounded-xl w-9 h-9 shrink-0"
            style={{ background: iconBg }}
          >
            <Icon className="w-4 h-4" style={{ color: iconColor }} />
          </div>
          <p className="font-semibold text-[13px] text-gray-400 uppercase leading-none tracking-wide">
            {title}
          </p>
        </div>

        {isLoading ? (
          <div className="bg-gray-100 rounded-lg w-28 h-10 animate-pulse" />
        ) : (
          <div className="flex items-end gap-2">
            <span
              className="font-bold tabular-nums text-[2.6rem] text-gray-900 leading-none tracking-tight"
              style={{ fontFamily: "'DM Mono', 'Fira Mono', monospace" }}
            >
              {value.toLocaleString()}
            </span>
          </div>
        )}

        <div
          className="right-0 bottom-0 left-0 absolute opacity-80 rounded-b-2xl h-0.75"
          style={{ background: accent }}
        />
      </div>
    );
  },
);

StatCard.displayName = "StatCard";

interface StatsData {
  totalCandidates: number | null;
  visaInProcess: number | null;
  visaApproved: number | null;
  readyForDeparture: number | null;
}

const Statistics: React.FC<IStatisticsProps> = ({ totalStatistics }) => {
  const [rawStats, setRawStats] = useState<StatsData>({
    totalCandidates: null,
    visaInProcess: null,
    visaApproved: null,
    readyForDeparture: null,
  });

  const [animatedStats, setAnimatedStats] = useState<StatsData>(rawStats);

  useEffect(() => {
    if (!totalStatistics?.data) return;
    setRawStats({
      totalCandidates: totalStatistics.data.totalJobSeekers ?? 0,
      visaInProcess: totalStatistics.data.totalVisaProcess ?? 0,
      visaApproved: totalStatistics.data.totalVisaApproved ?? 0,
      readyForDeparture: totalStatistics.data.totalReadyForDeparture ?? 0,
    });
  }, [totalStatistics]);

  useEffect(() => {
    if (!rawStats.totalCandidates) return;
    const duration = 1400;
    const steps = 40;
    const stepTime = duration / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const easeOut = 1 - Math.pow(1 - currentStep / steps, 3);

      setAnimatedStats({
        totalCandidates: Math.floor(easeOut * (rawStats.totalCandidates ?? 0)),
        visaInProcess: Math.floor(easeOut * (rawStats.visaInProcess ?? 0)),
        visaApproved: Math.floor(easeOut * (rawStats.visaApproved ?? 0)),
        readyForDeparture: Math.floor(
          easeOut * (rawStats.readyForDeparture ?? 0),
        ),
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setAnimatedStats(rawStats);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [rawStats]);

  const cards = useMemo(
    () => [
      {
        icon: FaUsers,
        title: "Total Candidates",
        value: animatedStats.totalCandidates,
        accent: "linear-gradient(90deg, #7c3aed, #a78bfa)",
        iconColor: "#7c3aed",
        iconBg: "#f5f3ff",
      },
      {
        icon: RefreshCcw,
        title: "Visa in Process",
        value: animatedStats.visaInProcess,
        accent: "linear-gradient(90deg, #d97706, #fbbf24)",
        iconColor: "#d97706",
        iconBg: "#fffbeb",
      },
      {
        icon: FaUserCheck,
        title: "Visa Approved",
        value: animatedStats.visaApproved,
        accent: "linear-gradient(90deg, #059669, #34d399)",
        iconColor: "#059669",
        iconBg: "#ecfdf5",
      },
      {
        icon: BiSolidPlaneAlt,
        title: "Ready for Departure",
        value: animatedStats.readyForDeparture,
        accent: "linear-gradient(90deg, #0284c7, #38bdf8)",
        iconColor: "#0284c7",
        iconBg: "#f0f9ff",
      },
    ],
    [animatedStats],
  );

  return (
    <div className="mb-5 w-full">
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full">
        {cards.map((card, i) => (
          <StatCard key={card.title} {...card} index={i} />
        ))}
      </div>
    </div>
  );
};

export default Statistics;
