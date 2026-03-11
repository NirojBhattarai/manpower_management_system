import OrientationInstituteHeader from "./partials/orientation-institute-header";
import OrientationInstituteTable from "./partials/orientation-institute-table";
import OrientationInstituteModal from "./partials/orientation-institute-modal";

export default function OrientationInstitute() {
  return (
    <div className="u-flex-parent">
      <OrientationInstituteHeader />
      <OrientationInstituteTable />

      {/* ============== Orientation Institute Modal ================= */}
      <OrientationInstituteModal />
    </div>
  );
}
