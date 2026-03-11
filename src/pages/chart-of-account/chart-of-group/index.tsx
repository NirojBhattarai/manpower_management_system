import ChartOfGroupHeader from "./partials/chart-of-group-header";
import ChartOfGroupModal from "./partials/chart-of-group-modal";
import ChartOfGroupTable from "./partials/chart-of-group-table";

const ChartOfGroup = () => {
  return (
    <div className="u-flex-parent">
      <ChartOfGroupHeader />
      <ChartOfGroupTable />

      {/* Modal Of Chart of Account */}
      <ChartOfGroupModal />
    </div>
  );
};

export default ChartOfGroup;
