import React from "react";
import PageHeader from "@/common/PageHeader";
import { PATH } from "@/constant/path";
import ComapnyTable from "./partials/company-table";
import SearchFilter from "@/components/search-filter";
import { useNavigate } from "react-router-dom";
import CompanyModal from "./partials/company-modal";

const Company: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="u-flex-parent">
      <PageHeader title="Company" />
      <SearchFilter
        dateFilter={false}
        handleAddClick={() => {
          navigate(PATH.company.create);
        }}
      />
      <ComapnyTable />

      {/* ====================== Company Modal =========================== */}
      <CompanyModal />
    </div>
  );
};

export default Company;
