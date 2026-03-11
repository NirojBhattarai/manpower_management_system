import SupplierHeader from "./partials/supplier-header";
import SupplierModal from "./partials/supplier-modal";
import SupplierTable from "./partials/supplier-table";

export default function Supplier() {
  return (
    <div className="u-flex-parent">
      <SupplierHeader />
      <SupplierTable />

      {/* ================= Supplier Modal ======================== */}
      <SupplierModal />
    </div>
  );
}
