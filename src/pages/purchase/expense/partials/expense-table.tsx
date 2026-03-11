import TableWrapper from "@/components/TableWrapper";
import useExpenseList from "../hooks/use-expense-list";
import Table from "@/components/Table";
import ExpenseColumn from "./expense-column";

const ExpenseTable = () => {
  const { expenseListResponse, isLoading, rowSelection, setRowSelection } =
    useExpenseList();
  return (
    <TableWrapper
      isLoading={isLoading}
      isDataAvailable={expenseListResponse?.data?.records?.length > 0}
      wrapperClassName="mt-4"
    >
      <Table
        columns={ExpenseColumn()}
        data={expenseListResponse?.data?.records || []}
        getRowId={(row) => row?.id}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        totalItems={expenseListResponse?.data?.totalRecords}
        totalPages={expenseListResponse?.data?.totalPages}
      />
    </TableWrapper>
  );
};

export default ExpenseTable;
