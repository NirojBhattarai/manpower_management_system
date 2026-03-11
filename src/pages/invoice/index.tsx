import InvoiceHeader from "./partials/invoice-header";
import InvoiceModal from "./partials/invoice-modal";
import InvoiceTable from "./partials/invoice-table";

const Invoice = () => {
  return (
    <div className="u-flex-parent">
      <InvoiceHeader />
      <InvoiceTable />
      <InvoiceModal />
    </div>
  );
};

export default Invoice;
