import MedicalInstituteModal from "./partials/medical-institute-modal";
import MedicalInstituteHeader from "./partials/medical-institute-header";
import MedicalInstituteTable from "./partials/medical-institute-table";

export default function MedicalInstitute() {
  return (
    <div className="u-flex-parent">
      <MedicalInstituteHeader />
      <MedicalInstituteTable />

      {/* ========================== Medical Institute Modal ====================== */}
      <MedicalInstituteModal />
    </div>
  );
}
