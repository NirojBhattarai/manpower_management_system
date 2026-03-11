import Table from "@/components/Table";
import TableWrapper from "@/components/TableWrapper";
import useAppliedJobList from "./hooks/use-applied-job-list";
import AppliedJobColumns from "./applied-job-column";
const AppliedJobTable = () => {
  const { appliedJobListResponse, isLoading, rowSelection, setRowSelection } =
    useAppliedJobList();

  return (
    <TableWrapper
      wrapperClassName="mt-4"
      isLoading={isLoading}
      isDataAvailable={appliedJobListResponse?.data?.records?.length > 0}
    >
      <Table
        columns={AppliedJobColumns()}
        data={appliedJobListResponse?.data?.records || []}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        totalItems={appliedJobListResponse?.data?.totalRecords}
        totalPages={appliedJobListResponse?.data?.totalPages}
      />
    </TableWrapper>
  );
};

export default AppliedJobTable;
