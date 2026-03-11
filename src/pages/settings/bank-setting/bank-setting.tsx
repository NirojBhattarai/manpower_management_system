import BankHeader from "./partials/bank-header";
import BankModal from "./partials/bank-modal";
import BankTable from "./partials/bank-table";

export default function BankSetting() {
  return (
    <div className="u-flex-parent">
      <BankHeader />
      <BankTable />

      {/* =============== Bank Modal ========================= */}
      <BankModal />
    </div>
  );
}
