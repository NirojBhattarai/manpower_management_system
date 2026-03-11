import Table from "@/components/Table";
import TableWrapper from "@/components/TableWrapper";
import JobVacancyColumns from "./job-vacancy-column";
import useJobVacancyList from "../hooks/use-job-vacancy-list";

const JobVacancyTable = () => {
  const { jobVacancyListResponse, isLoading, rowSelection, setRowSelection } =
    useJobVacancyList();

  return (
    <TableWrapper
      wrapperClassName="mt-4"
      isLoading={isLoading}
      isDataAvailable={jobVacancyListResponse?.data?.records?.length > 0}
    >
      <Table
        columns={JobVacancyColumns()}
        data={jobVacancyListResponse?.data?.records || []}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        totalItems={jobVacancyListResponse?.data?.totalRecords}
        totalPages={jobVacancyListResponse?.data?.totalPages}
      />
    </TableWrapper>
  );
};

export default JobVacancyTable;
