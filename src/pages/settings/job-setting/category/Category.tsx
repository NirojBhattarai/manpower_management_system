import CategoryHeader from "./partials/category-header";
import CategoryModal from "./partials/category-modal";
import CategoryTable from "./partials/category-table";

export default function Category() {
  return (
    <div className="u-flex-parent">
      <CategoryHeader />
      <CategoryTable />

      {/* ====================== Category Modal =========================== */}
      <CategoryModal />
    </div>
  );
}
