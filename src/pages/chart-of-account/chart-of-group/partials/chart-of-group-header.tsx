import PageHeader from "@/common/PageHeader";
import SearchFilter from "@/components/search-filter";
import QUERY_PARAMS from "@/constant/query-params";
import { useAddModal } from "@/hooks/use-add-modal";
import React from "react";

const ChartOfGroupHeader = () => {
  const addModal = useAddModal(
    QUERY_PARAMS.chartOfAccount.group.createGroup.key,
    QUERY_PARAMS.chartOfAccount.group.createGroup.value,
  );
  return (
    <React.Fragment>
      <PageHeader title="Chart of Group" />
      <SearchFilter
        dateFilter={false}
        handleAddClick={addModal.handleOpenModal}
      />
    </React.Fragment>
  );
};

export default ChartOfGroupHeader;
