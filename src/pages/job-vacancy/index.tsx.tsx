import JobVacancyHeader from "./partials/job-vacancy-header";
import JobVacancyTable from "./partials/job-vacancy-table";

export default function JobVacancy() {
  return (
    <div className="u-flex-parent">
      <JobVacancyHeader />
      <JobVacancyTable />
    </div>
  );
}
