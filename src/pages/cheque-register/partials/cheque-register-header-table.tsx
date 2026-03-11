import PageHeader from "@/common/PageHeader";
import { PATH } from "@/constant/path";
import React from "react";
import { useMatch, useNavigate } from "react-router-dom";
import useIssuedChequeList from "../cheque-issued/hooks/use-cheque-issued-list";
import useRecievedChequeList from "../cheque-received/hooks/use-cheque-received-list";

export default function ChequeRegisterHeaderTable() {
  const isRootRoute = useMatch(PATH.accounting.chequeRegister.index);

  return (
    <React.Fragment>
      {isRootRoute && (
        <React.Fragment>
          <PageHeader title="Cheque Register" />
          <ChequeCardWContainer />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

function ChequeCardWContainer() {
  const navigate = useNavigate();

  const handleViewAllChequeIssued = React.useCallback(() => {
    navigate(PATH.accounting.chequeRegister.chequeIssued.index);
  }, []);

  const handleViewAllChequeReceived = React.useCallback(() => {
    navigate(PATH.accounting.chequeRegister.chequeReceived.index);
  }, []);

  const { issuedChequeListResponse } = useIssuedChequeList();
  const { receivedChequeListResponse } = useRecievedChequeList();

  const IssuedChequeCount = issuedChequeListResponse?.data?.totalRecords || 0;
  const ReceivedChequeCount =
    receivedChequeListResponse?.data?.totalRecords || 0;

  return (
    <div className="gap-6 grid grid-cols-1 my-6">
      <ChequeCard
        type="issued"
        handleViewAllClick={handleViewAllChequeIssued}
        chequeCount={IssuedChequeCount}
      />
      <ChequeCard
        type="received"
        handleViewAllClick={handleViewAllChequeReceived}
        chequeCount={ReceivedChequeCount}
      />
    </div>
  );
}

function ChequeCard({
  type,
  handleViewAllClick,
  chequeCount,
}: {
  type: "received" | "issued";
  handleViewAllClick: () => void;
  chequeCount: number;
}) {
  const isIssued = type === "issued";

  return (
    <div className="group relative flex flex-col justify-between bg-white shadow-sm hover:shadow-lg p-6 border border-slate-200 rounded-r-2xl transition-all hover:-translate-y-1 duration-300">
      {/* Accent Line */}
      <div
        className={`absolute top-0 left-0 h-full w-1 rounded-l-2xl ${
          isIssued ? "bg-rose-500" : "bg-emerald-500"
        }`}
      />

      {/* Header Section */}
      <div>
        <p className="text-slate-500 text-xs uppercase tracking-widest">
          {isIssued ? "Cheque Issued" : "Cheque Received"}
        </p>

        <p className="mt-3 font-semibold text-slate-800 text-5xl tracking-tight">
          {chequeCount}
        </p>

        <p className="mt-1 text-slate-400 text-sm">
          Total {isIssued ? "issued" : "received"} cheques
        </p>
      </div>

      {/* Divider */}
      <div className="bg-slate-100 my-6 h-px" />

      {/* Footer */}
      <div className="flex justify-between items-center">
        <p className="text-slate-500 text-sm">Manage records</p>

        <button
          onClick={(e) => {
            e.preventDefault();
            handleViewAllClick();
          }}
          className="inline-flex items-center gap-2 hover:bg-slate-100 px-4 py-2 border border-slate-300 hover:border-slate-400 rounded-lg font-medium text-slate-700 text-sm transition-all duration-200"
        >
          View All
          <svg
            className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-200"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2.5 6h7m0 0L7 3.5M9.5 6L7 8.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
