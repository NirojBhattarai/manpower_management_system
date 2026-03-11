import ExtendedForm from "@/components/extended-components/ExtendedForm";
import { SupplierForm } from "./supplier-form";
import useCreateSupplier from "../hooks/use-create-supplier";

export default function CreateSupplier() {
  const { formik, isLoading } = useCreateSupplier();
  console.log(formik.errors, "Errors");
  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      <SupplierForm />
    </ExtendedForm>
  );
}
