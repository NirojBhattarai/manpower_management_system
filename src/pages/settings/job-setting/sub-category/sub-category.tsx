import SubCategoryTable from "./partials/sub-category-table";
import SubCategoryHeader from "./partials/subcategory-header";
import SubCategoryModal from "./partials/subcategory-modal";

export default function SubCategory() {
  return (
    <div className="u-flex-parent">
      <SubCategoryHeader />
      <SubCategoryTable />

      {/* ====================== Sub Category Modal =========================== */}
      <SubCategoryModal />
    </div>
  );
}
