import PageHeader from "@/common/PageHeader";
import SearchFilter from "@/components/search-filter";
import { PATH } from "@/constant/path";
import React from "react";
import { useNavigate } from "react-router-dom";

const CandidateHeader = () => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <PageHeader title="Candidates" />
      <SearchFilter
        dateFilter={false}
        handleAddClick={() => {
          navigate(PATH.candidate.create);
        }}
      />
    </React.Fragment>
  );
};

export default CandidateHeader;
