import JobOfferTable from "./partials/job-offer-table";
import JobOfferToMedical from "./partials/job-offer-to-medical";
import JobOfferModal from "./partials/job-offer-modal";
import JobOfferHeader from "./partials/job-offer-header";
import { IJobOfferListItem } from "./interface/job-offer-interface";
import { useState } from "react";

const JobOffer = () => {
  const [selectedCandidates, setSelectedCandidates] = useState<
    IJobOfferListItem[]
  >([]);
  return (
    <div className="u-flex-parent">
      <JobOfferHeader />
      <JobOfferTable
        selectedCandidates={selectedCandidates}
        setSelectedCandidates={setSelectedCandidates}
      />
      <JobOfferModal />
      <JobOfferToMedical selectedCandidates={selectedCandidates} />
    </div>
  );
};

export default JobOffer;
