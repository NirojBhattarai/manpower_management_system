import EducationHeader from "./education-header";
import EducationModal from "./education-modal";
import EducationTable from "./education-table";

export default function EducationInfo() {
  return (
    <div className="u-flex-parent">
      <EducationHeader />
      <EducationTable />

      {/* =============== Education Modal ========================= */}
      <EducationModal />
    </div>
  );
}
