import { useState } from "react";
import ShramHeader from "./partials/shram-header";
import ShramTable from "./partials/shram-list";
import ShramModal from "./partials/shram-modal";
import ShramToTicket from "./partials/shram-to-ticket";
import { IShramListItem } from "./interface/shram-interface";

const Sharam = () => {
  const [selectedCandidates, setSelectedCandidates] = useState<
    IShramListItem[]
  >([]);
  return (
    <div className="u-flex-parent">
      <ShramHeader />
      <ShramTable
        selectedCandidates={selectedCandidates}
        setSelectedCandidates={setSelectedCandidates}
      />
      <ShramModal />
      <ShramToTicket selectedCandidates={selectedCandidates} />
    </div>
  );
};
export default Sharam;
