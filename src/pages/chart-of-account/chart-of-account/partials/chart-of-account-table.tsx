import Table from "@/components/Table";
import TableWrapper from "@/components/TableWrapper";
import useChartOfAccountList from "../hooks/use-chart-of-account-list";
import ChartOfAccountColumn from "./chart-of-account-column";

const ChartOfAccountTable = () => {
  const {
    chartOfAccountListResponse,
    isLoading,
    rowSelection,
    setRowSelection,
  } = useChartOfAccountList();
  return (
    <TableWrapper
      wrapperClassName="mt-4"
      isLoading={isLoading}
      isDataAvailable={chartOfAccountListResponse?.data?.records?.length > 0}
    >
      <Table
        columns={ChartOfAccountColumn()}
        data={chartOfAccountListResponse?.data?.records || []}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        totalItems={chartOfAccountListResponse?.data?.totalRecords}
        totalPages={chartOfAccountListResponse?.data?.totalPages}
      />
    </TableWrapper>
  );
};

export default ChartOfAccountTable;
