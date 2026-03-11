import ExperienceHeader from "./experience-header";
import ExperienceModal from "./experience-modal";
import ExperienceTable from "./experience-table";

export default function ExperienceInfoTab() {
  return (
    <div className="u-flex-parent">
      <ExperienceHeader />
      <ExperienceTable />

      {/* =============== Education Modal ========================= */}
      <ExperienceModal />
    </div>
  );
}
