import Table from "@/components/Table";
import TableWrapper from "@/components/TableWrapper";
import useChequeReceivedList from "../hooks/use-cheque-received-list";
import ChequeReceivedColumn from "./cheque-received-column";

const ChequeReceivedTable = () => {
  const {
    receivedChequeListResponse,
    isLoading,
    rowSelection,
    setRowSelection,
  } = useChequeReceivedList();

  return (
    <TableWrapper
      isLoading={isLoading}
      isDataAvailable={receivedChequeListResponse?.data?.records?.length > 0}
    >
      <Table
        columns={ChequeReceivedColumn()}
        data={receivedChequeListResponse?.data?.records || []}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        totalItems={receivedChequeListResponse?.data?.totalRecords}
        totalPages={receivedChequeListResponse?.data?.totalPages}
      />
    </TableWrapper>
  );
};

export default ChequeReceivedTable;
