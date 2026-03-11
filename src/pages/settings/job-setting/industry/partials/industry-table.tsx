import Table from "@/components/Table";
import TableWrapper from "@/components/TableWrapper";
import IndustryColumn from "./industry-column";
import useGetAllIndustry from "../hooks/use-get-all-industry";

const IndustryTable = () => {
  const { industryListResponse, isLoading, rowSelection, setRowSelection } =
    useGetAllIndustry();
  return (
    <TableWrapper
      wrapperClassName="mt-4"
      isLoading={isLoading}
      isDataAvailable={industryListResponse?.data?.records?.length > 0}
    >
      <Table
        columns={IndustryColumn()}
        data={industryListResponse?.data?.records || []}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        totalItems={industryListResponse?.data?.totalRecords}
        totalPages={industryListResponse?.data?.totalPages}
      />
    </TableWrapper>
  );
};

export default IndustryTable;
