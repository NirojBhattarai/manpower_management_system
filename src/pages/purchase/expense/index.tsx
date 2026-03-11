import ExpenseTable from "./partials/expense-table";
import ExpenseModal from "./partials/expense-modal";
import ExpenseHeader from "./partials/expense-header";

const Expense = () => {
  return (
    <div className="u-flex-parent">
      <ExpenseHeader />
      <ExpenseTable />

      {/* =============== Modal of Expense ================= */}
      <ExpenseModal />
    </div>
  );
};

export default Expense;
