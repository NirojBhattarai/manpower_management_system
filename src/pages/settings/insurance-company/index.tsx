import InsuranceCompanyModal from "./partials/insurance-comapany-modal";
import InsuranceCompanyHeader from "./partials/insurance-company-header";
import InsuranceCompanyTable from "./partials/insurance-company-table";

export default function InsuranceComapany() {
  return (
    <div className="u-flex-parent">
      <InsuranceCompanyHeader />
      <InsuranceCompanyTable />

      {/* ====================== Insurance Company Modal =========================== */}
      <InsuranceCompanyModal />
    </div>
  );
}
