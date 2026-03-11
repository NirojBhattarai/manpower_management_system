import Table from "@/components/Table";
import TableWrapper from "@/components/TableWrapper";
import BankColumns from "./bank-column";
import useBankList from "../hooks/use-bank-list";

const BankTable = () => {
  const { bankListResponse, isLoading, rowSelection, setRowSelection } =
    useBankList();
  return (
    <TableWrapper
      wrapperClassName="mt-4"
      isLoading={isLoading}
      isDataAvailable={bankListResponse?.data?.records?.length > 0}
    >
      <Table
        columns={BankColumns()}
        data={bankListResponse?.data?.records || []}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        totalItems={bankListResponse?.data?.totalRecords}
        totalPages={bankListResponse?.data?.totalPages}
      />
    </TableWrapper>
  );
};

export default BankTable;
