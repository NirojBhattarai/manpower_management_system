import ExtendedForm from "@/components/extended-components/ExtendedForm";
import { SupplierForm } from "./supplier-form";
import useUpdateSupplier from "../hooks/use-update-supplier";
import LoadingScreen from "@/components/reusable-component/LoadingScreen";

export default function UpdateSupplier() {
  const { formik, isInitialLoading, isLoading } = useUpdateSupplier();

  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      {isInitialLoading ? <LoadingScreen /> : <SupplierForm />}
    </ExtendedForm>
  );
}
