import InterviewTable from "./partials/interview-table";
import MoveToJobOffer from "./partials/move-to-job-offer";
import InterviewHeader from "./partials/interview-header";
import InterviewModal from "./partials/interview-modal";
import { IInterviewScheduleListItem } from "./interface/interview-schedule-interface";
import { useState } from "react";

const Interview = () => {
  const [selectedCandidates, setSelectedCandidates] = useState<
    IInterviewScheduleListItem[]
  >([]);
  return (
    <div className="u-flex-parent">
      <InterviewHeader />
      <InterviewTable
        selectedCandidates={selectedCandidates}
        setSelectedCandidates={setSelectedCandidates}
      />
      <InterviewModal />
      <MoveToJobOffer selectedCandidates={selectedCandidates} />
    </div>
  );
};

export default Interview;
