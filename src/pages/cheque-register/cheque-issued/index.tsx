import ChequeIssuedHeader from "./partials/cheque-issued-header";
import ChequeIssuedModal from "./partials/cheque-issued-modal";
import ChequeIssuedTable from "./partials/cheque-issued-table";

const ChequeIssued = () => {
  return (
    <div className="u-flex-parent">
      <ChequeIssuedHeader />
      <ChequeIssuedTable />

      {/* Cheque Issued Modal */}
      <ChequeIssuedModal />
    </div>
  );
};

export default ChequeIssued;
