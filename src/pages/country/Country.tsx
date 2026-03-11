import CountryHeader from "./partials/country-header";
import CountryModal from "./partials/country-modal";
import CountryTable from "./partials/country-table";

export default function Role() {
  return (
    <div className="u-flex-parent">
      <CountryHeader />
      <CountryTable />

      {/* =============== Country Modal ========================= */}
      <CountryModal />
    </div>
  );
}
