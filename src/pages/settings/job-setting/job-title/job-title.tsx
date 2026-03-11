import JobTitleHeader from "./partials/job-title-header";
import JobTitleModal from "./partials/job-title-modal";
import JobTitleTable from "./partials/job-title-table";

export default function JobTitle() {
  return (
    <div className="u-flex-parent">
      <JobTitleHeader />
      <JobTitleTable />

      {/* ====================== Job Title Modal =========================== */}
      <JobTitleModal />
    </div>
  );
}
