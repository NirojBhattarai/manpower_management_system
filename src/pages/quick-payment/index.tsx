import QuickPaymentHeader from "./partials/quick-payment-header";
import QuickPaymentModal from "./partials/quick-payment-modal";
import QuickPaymentTable from "./partials/quick-payment-table";

const QuickPayment = () => {
  return (
    <div className="u-flex-parent">
      <QuickPaymentHeader />
      <QuickPaymentTable />
      <QuickPaymentModal />
    </div>
  );
};

export default QuickPayment;
