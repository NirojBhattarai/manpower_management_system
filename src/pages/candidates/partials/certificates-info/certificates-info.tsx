import CertificateHeader from "./certificate-header";
import CertificateModal from "./certificate-modal";
import CertificateTable from "./certificate-table";

export default function CertificateInfoTab() {
  return (
    <div className="u-flex-parent">
      <CertificateHeader />
      <CertificateTable />

      {/* =============== Certificate Modal ========================= */}
      <CertificateModal />
    </div>
  );
}
