import IndustryHeader from "./partials/industry-header";
import IndustryModal from "./partials/industry-modal";
import IndustryTable from "./partials/industry-table";

export default function Industry() {
  return (
    <div className="u-flex-parent">
      <IndustryHeader />
      <IndustryTable />

      {/* ====================== Industry Modal =========================== */}
      <IndustryModal />
    </div>
  );
}
