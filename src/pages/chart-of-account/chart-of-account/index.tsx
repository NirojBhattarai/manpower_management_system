import AccountTable from "./partials/chart-of-account-table";
import ChartOfAccountModal from "./partials/chart-of-account-modal";
import ChartOfAccountHeader from "./partials/chart-of-account-header";

const ChartOfAccount = () => {
  return (
    <div className="u-flex-parent">
      <ChartOfAccountHeader />
      <AccountTable />

      {/* Modal Of Chart of Account */}
      <ChartOfAccountModal />
    </div>
  );
};

export default ChartOfAccount;
