import PageHeader from "@/common/PageHeader";
import SearchFilter from "@/components/search-filter";
import { PATH } from "@/constant/path";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function JobVacancyHeader() {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <PageHeader title="Job Vacancy" />
      <SearchFilter
        dateFilter={false}
        handleAddClick={() => {
          navigate(PATH.preApprovalDofe.create);
        }}
      />
    </React.Fragment>
  );
}
