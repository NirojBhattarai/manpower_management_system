import ExtendedForm from "@/components/extended-components/ExtendedForm";
import useCreatePermission from "../hooks/use-create-permission";
import PermissionForm from "./permission-form";

export default function CreatePermission() {
  const { formik, isLoading, roles } = useCreatePermission();
  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      <PermissionForm roles={roles} />
    </ExtendedForm>
  );
}
