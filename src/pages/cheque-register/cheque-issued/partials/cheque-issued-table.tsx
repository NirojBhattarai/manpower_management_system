import Table from "@/components/Table";
import TableWrapper from "@/components/TableWrapper";
import ChequeIssuedColumn from "./cheque-issued-column";
import useIssuedChequeList from "../hooks/use-cheque-issued-list";

const ChequeIssuedTable = () => {
  const { issuedChequeListResponse, isLoading, rowSelection, setRowSelection } =
    useIssuedChequeList();
  return (
    <TableWrapper
      isLoading={isLoading}
      isDataAvailable={issuedChequeListResponse?.data?.records.length > 0}
    >
      <Table
        data={issuedChequeListResponse?.data?.records || []}
        columns={ChequeIssuedColumn()}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        totalItems={issuedChequeListResponse?.data?.totalRecords}
        totalPages={issuedChequeListResponse?.data?.totalPages}
      />
    </TableWrapper>
  );
};

export default ChequeIssuedTable;
