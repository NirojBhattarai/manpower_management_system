import Table from "@/components/Table";
import TableWrapper from "@/components/TableWrapper";
import useJobTitleList from "../hooks/use-job-title-list";
import JobTitleColumns from "./job-title-column";

const JobTitleTable = () => {
  const { jobTitleListResponse, isLoading, rowSelection, setRowSelection } =
    useJobTitleList();
  return (
    <TableWrapper
      wrapperClassName="mt-4"
      isLoading={isLoading}
      isDataAvailable={jobTitleListResponse?.data?.records?.length > 0}
    >
      <Table
        columns={JobTitleColumns()}
        data={jobTitleListResponse?.data?.records || []}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        totalItems={jobTitleListResponse?.data?.totalRecords}
        totalPages={jobTitleListResponse?.data?.totalPages}
      />
    </TableWrapper>
  );
};

export default JobTitleTable;
