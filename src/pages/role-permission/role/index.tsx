import RoleHeader from "./partials/role-header";
import RoleTable from "./partials/role-list";
import RoleModal from "./partials/role-modal";

export default function Role() {
  return (
    <div className="u-flex-parent">
      <RoleHeader />
      <RoleTable />

      {/* =============== Role Modal ========================= */}
      <RoleModal />
    </div>
  );
}
