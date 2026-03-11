import TableWrapper from "@/components/TableWrapper";
import usePersonalDetailsList from "./personal-details/hooks/use-personal-details-list";
import Table from "@/components/Table";
import CandidateColumns from "./candidates-column";

const CandidatesTable = () => {
  const {
    personalDetailsListResponse,
    isLoading,
    rowSelection,
    setRowSelection,
  } = usePersonalDetailsList();
  return (
    <TableWrapper
      wrapperClassName="mt-4"
      isLoading={isLoading}
      isDataAvailable={personalDetailsListResponse?.data?.records?.length > 0}
    >
      <Table
        columns={CandidateColumns()}
        data={personalDetailsListResponse?.data?.records || []}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        totalItems={personalDetailsListResponse?.data?.totalRecords}
        totalPages={personalDetailsListResponse?.data?.totalPages}
      />
    </TableWrapper>
  );
};

export default CandidatesTable;
