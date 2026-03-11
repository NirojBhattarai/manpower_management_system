import ExtendedForm from "@/components/extended-components/ExtendedForm";
import RoleForm from "./role-form";
import useUpdateRole from "../hooks/use-update-role";
import LoadingScreen from "@/components/reusable-component/LoadingScreen";

export default function UpdateRole() {
  const { formik, isLoading, isInitialLoading } = useUpdateRole();
  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      {isInitialLoading ? (
        <LoadingScreen message="Loading role details..." />
      ) : (
        <RoleForm />
      )}
    </ExtendedForm>
  );
}
