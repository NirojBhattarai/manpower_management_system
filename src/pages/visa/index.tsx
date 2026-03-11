import VisaTable from "./partials/visa-list";
import VisaToOrientation from "./partials/visa-to-orientation";
import VisaModal from "./partials/visa-modal";
import VisaHeader from "./partials/visa-header";
import { IVisaListItem } from "./interface/visa-interface";
import { useState } from "react";

const Visa = () => {
  const [selectedCandidates, setSelectedCandidates] = useState<IVisaListItem[]>(
    [],
  );
  return (
    <div className="u-flex-parent">
      <VisaHeader />
      <VisaTable
        selectedCandidates={selectedCandidates}
        setSelectedCandidates={setSelectedCandidates}
      />
      <VisaModal />
      <VisaToOrientation selectedCandidates={selectedCandidates} />
    </div>
  );
};
export default Visa;
