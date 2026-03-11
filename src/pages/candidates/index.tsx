import CandidateHeader from "./partials/candidate-header";
import CandidatesModal from "./partials/candidates-modal";
import CandidatesTable from "./partials/candidates-table";

const Candidates = () => {
  return (
    <div className="u-flex-parent">
      <CandidateHeader />
      <CandidatesTable />
      <CandidatesModal />
    </div>
  );
};

export default Candidates;
