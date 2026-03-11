import { useState } from "react";
import { IMedicalListItem } from "./interface/medical-interface";
import MedicalHeader from "./partials/medical-header";
import MedicalTable from "./partials/medical-list";
import MedicalModal from "./partials/medical-modal";
import MedicalToVisa from "./partials/medical-to-visa";

const Medical = () => {
  const [selectedCandidates, setSelectedCandidates] = useState<
    IMedicalListItem[]
  >([]);
  return (
    <div className="u-flex-parent">
      <MedicalHeader />
      <MedicalTable
        selectedCandidates={selectedCandidates}
        setSelectedCandidates={setSelectedCandidates}
      />
      <MedicalModal />
      <MedicalToVisa selectedCandidates={selectedCandidates} />
    </div>
  );
};

export default Medical;
