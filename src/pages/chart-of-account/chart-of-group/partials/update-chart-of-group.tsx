import ExtendedForm from "@/components/extended-components/ExtendedForm";
import useUpdateChartOfAccount from "../hooks/use-update-chart-of-group";
import LoadingScreen from "@/components/reusable-component/LoadingScreen";
import ChartOfGroupForm from "./chart-of-group-form";

const UpdateChartOfGroup = () => {
  const { formik, isLoading, isInitialLoading } = useUpdateChartOfAccount();
  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      {isInitialLoading ? <LoadingScreen /> : <ChartOfGroupForm />}
    </ExtendedForm>
  );
};

export default UpdateChartOfGroup;
