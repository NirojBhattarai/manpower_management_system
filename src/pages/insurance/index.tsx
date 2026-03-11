import InsuranceTable from "./partials/insurance-list";
import InsuranceToShram from "./partials/insurance-to-shram";
import InsuranceHeader from "./partials/insurance-header";
import InsuranceModal from "./partials/insurance-modal";
import { IInsuranceListItem } from "./interface/insurance-interface";
import { useState } from "react";

const Insurance = () => {
  const [selectedCandidates, setSelectedCandidates] = useState<
    IInsuranceListItem[]
  >([]);
  return (
    <div className="u-flex-parent">
      <InsuranceHeader />
      <InsuranceTable
        selectedCandidates={selectedCandidates}
        setSelectedCandidates={setSelectedCandidates}
      />
      <InsuranceModal />
      <InsuranceToShram selectedCandidates={selectedCandidates} />
    </div>
  );
};

export default Insurance;
