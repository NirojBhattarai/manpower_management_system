import PermissionHeader from "./partials/permission-header";
import PermissionTable from "./partials/permission-list";
import PermissionModal from "./partials/permission-modal";

export default function Permission() {
  return (
    <div className="u-flex-parent">
      <PermissionHeader />
      <PermissionTable />

      {/* =============== Permission Modal ========================= */}
      <PermissionModal />
    </div>
  );
}
