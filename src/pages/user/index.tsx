import UserHeader from "./partials/user-header";
import UserModal from "./partials/user-modal";
import UserTable from "./partials/user-table";

export default function User() {
  return (
    <div className="u-flex-parent">
      <UserHeader />
      <UserTable />

      {/* ============= User Modal ============= */}
      <UserModal />
    </div>
  );
}
