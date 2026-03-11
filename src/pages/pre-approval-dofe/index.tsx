import PreApprovalDofeTable from "./partials/pre-approval-dofe-table";
import PreApprovalDofeHeader from "./partials/pre-approval-dofe-header";
import PreApprovalDofeModal from "./partials/pre-approval-dofe-modal";

const PreApprovalDofe = () => {
  return (
    <div className="u-flex-parent">
      <PreApprovalDofeHeader />
      <PreApprovalDofeTable />
      {/* Pre Approval DOFE Modal */}
      <PreApprovalDofeModal />
    </div>
  );
};

export default PreApprovalDofe;
