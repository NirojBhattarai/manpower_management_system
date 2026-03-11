import PageHeader from "@/common/PageHeader";
import SearchFilter from "@/components/search-filter";
import QUERY_PARAMS from "@/constant/query-params";
import { useAddModal } from "@/hooks/use-add-modal";
import React from "react";

interface IMembershipHeaderProps {
  isDataAvailable: boolean;
}

const MembershipHeader: React.FC<IMembershipHeaderProps> = ({
  isDataAvailable,
}) => {
  const addModal = useAddModal(
    QUERY_PARAMS.membership.createMembership.key,
    QUERY_PARAMS.membership.createMembership.value,
  );

  return (
    <>
      <PageHeader title="Membership Information" />

      {!isDataAvailable && (
        <SearchFilter
          searchFilter={false}
          dateFilter={false}
          handleAddClick={addModal.handleOpenModal}
        />
      )}
    </>
  );
};

export default MembershipHeader;
