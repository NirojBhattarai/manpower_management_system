import ExtendedForm from "@/components/extended-components/ExtendedForm";
import ChartOfAccountForm from "./chart-of-group-form";
import useCreateChartOfAccount from "../hooks/use-create-chart-of-group";

const CreateChartOfGroup = () => {
  const chartOfGroup = useCreateChartOfAccount();

  return (
    <ExtendedForm
      formik={chartOfGroup.formik}
      isSubmitting={chartOfGroup.isLoading}
    >
      <ChartOfAccountForm />
    </ExtendedForm>
  );
};

export default CreateChartOfGroup;
