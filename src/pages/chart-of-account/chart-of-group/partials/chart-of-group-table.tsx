import Table from "@/components/Table";
import TableWrapper from "@/components/TableWrapper";
import useChartOfAccountList from "../hooks/use-chart-of-group-list";
import ChartOfGroupColumn from "./chart-of-group-column";

const ChartOfGroupTable = () => {
  const { chartOfGroupListResponse, isLoading, rowSelection, setRowSelection } =
    useChartOfAccountList();
  return (
    <TableWrapper
      wrapperClassName="mt-4"
      isLoading={isLoading}
      isDataAvailable={chartOfGroupListResponse?.data?.records?.length > 0}
    >
      <Table
        columns={ChartOfGroupColumn()}
        data={chartOfGroupListResponse?.data?.records || []}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        totalItems={chartOfGroupListResponse?.data?.totalRecords}
        totalPages={chartOfGroupListResponse?.data?.totalPages}
      />
    </TableWrapper>
  );
};

export default ChartOfGroupTable;
