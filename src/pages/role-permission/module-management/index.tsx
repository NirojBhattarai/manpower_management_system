import PageHeader from "@/common/PageHeader";
import ModuleManagementForm from "./partials/module-management-form";

export default function ModuleManagement() {
  return (
    <div className="u-flex-parent">
      <PageHeader title="Module Management" />
      <ModuleManagementForm />
    </div>
  );
}
