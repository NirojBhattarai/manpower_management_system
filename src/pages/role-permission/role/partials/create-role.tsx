import ExtendedForm from "@/components/extended-components/ExtendedForm";
import RoleForm from "./role-form";
import useCreateRole from "../hooks/use-create-role";

export default function CreateRole() {
  const { formik, isLoading } = useCreateRole();
  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      <RoleForm />
    </ExtendedForm>
  );
}
