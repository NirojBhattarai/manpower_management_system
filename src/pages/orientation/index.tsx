import OrientationTable from "./partials/orientation-list";
import OrientationToInsurance from "./partials/orientation-to-insurance";
import OrientationModal from "./partials/orientation-modal";
import OrientationHeader from "./partials/orientation-header";
import { IOrientationListItem } from "./interface/orientation-interface";
import { useState } from "react";

const Orientation = () => {
  const [selectedCandidates, setSelectedCandidates] = useState<
    IOrientationListItem[]
  >([]);
  return (
    <div className="u-flex-parent">
      <OrientationHeader />
      <OrientationTable
        selectedCandidates={selectedCandidates}
        setSelectedCandidates={setSelectedCandidates}
      />
      <OrientationModal />
      <OrientationToInsurance selectedCandidates={selectedCandidates} />
    </div>
  );
};

export default Orientation;
