import PageHeader from "@/common/PageHeader";
import SearchFilter from "@/components/search-filter";
import QUERY_PARAMS from "@/constant/query-params";
import { useAddModal } from "@/hooks/use-add-modal";
import React from "react";

export default function UserHeader() {
  const addUser = useAddModal(
    QUERY_PARAMS.user.createUser.key,
    QUERY_PARAMS.user.createUser.value
  );
  return (
    <React.Fragment>
      <PageHeader title="User" />
      <SearchFilter dateFilter handleAddClick={addUser.handleOpenModal} />
    </React.Fragment>
  );
}
