import DocumentHeader from "./partials/document-header";
import DocumentModal from "./partials/document-modal";
import DocumentTable from "./partials/document-table";

export default function DocumentSetting() {
  return (
    <div className="u-flex-parent">
      <DocumentHeader />
      <DocumentTable />

      {/* =============== Document Modal ========================= */}
      <DocumentModal />
    </div>
  );
}
