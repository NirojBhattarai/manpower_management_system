import Table from "@/components/Table";
import TableWrapper from "@/components/TableWrapper";
import useEducationList from "./hooks/use-education-list";
import EducationColumns from "./education-column";

const EducationTable = () => {
  const { educationListResponse, isLoading, rowSelection, setRowSelection } =
    useEducationList();

  return (
    <TableWrapper
      wrapperClassName="mt-4"
      isLoading={isLoading}
      isDataAvailable={educationListResponse?.data?.records?.length > 0}
    >
      <Table
        columns={EducationColumns()}
        data={educationListResponse?.data?.records || []}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        totalItems={educationListResponse?.data?.totalRecords}
        totalPages={educationListResponse?.data?.totalPages}
      />
    </TableWrapper>
  );
};

export default EducationTable;
