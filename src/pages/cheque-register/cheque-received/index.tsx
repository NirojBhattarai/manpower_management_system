import ChequeReceivedHeader from "./partials/cheque-received-header";
import ChequeReceivedModal from "./partials/cheque-received-modal";
import ChequeReceivedTable from "./partials/cheque-received-table";

const ChequeReceived = () => {
  return (
    <div className="u-flex-parent">
      <ChequeReceivedHeader />
      <ChequeReceivedTable />

      {/* Cheque Received Modal */}
      <ChequeReceivedModal />
    </div>
  );
};

export default ChequeReceived;
