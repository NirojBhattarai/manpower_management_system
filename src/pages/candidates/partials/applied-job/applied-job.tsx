import AppliedJobHeader from "./applied-job-header";
import AppliedJobModal from "./applied-job-modal";
import AppliedJobTable from "./applied-job-table";

export default function AppliedJobTab() {
  return (
    <div className="u-flex-parent">
      <AppliedJobHeader />
      <AppliedJobTable />

      {/* =============== Applied Job Modal ========================= */}
      <AppliedJobModal />
    </div>
  );
}
