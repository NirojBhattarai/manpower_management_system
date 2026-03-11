import Table from "@/components/Table";
import TableWrapper from "@/components/TableWrapper";
import useQuickPaymentList from "../hooks/use-quick-payment-list";
import QuickPaymentColumns from "./quick-payment-column";

const QuickPaymentTable = () => {
  const { quickPaymentListResponse, isLoading, rowSelection, setRowSelection } =
    useQuickPaymentList();
  return (
    <TableWrapper
      isDataAvailable={quickPaymentListResponse?.data?.records?.length > 0}
      isLoading={isLoading}
    >
      <Table
        columns={QuickPaymentColumns()}
        data={quickPaymentListResponse?.data?.records || []}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        totalPages={quickPaymentListResponse?.data?.totalPages}
        totalItems={quickPaymentListResponse?.data?.totalRecords}
      />
    </TableWrapper>
  );
};
export default QuickPaymentTable;
