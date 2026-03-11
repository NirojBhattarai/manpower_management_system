import { useUpdateDataMutation } from "@/api/api";
import { useUpdateModal } from "@/hooks/use-update-modal";
import {
  ChartOfAccountSchemaType,
  chartOfAccountValidation,
} from "../schema/chart-of-account-schema";
import { useFormik } from "formik";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";
import useChartOfAccountDetails from "./use-chart-of-account-details";

const useUpdateChartOfAccount = () => {
  const { updateId, handleCloseModal } = useUpdateModal();
  const [updateChartOfAccount, { isLoading }] = useUpdateDataMutation();
  const { chartOfAccountDetail, isLoading: isInitialLoading } =
    useChartOfAccountDetails({
      id: updateId ?? "",
    });
  const initialValues: ChartOfAccountSchemaType = {
    accountName: chartOfAccountDetail?.data?.accountName || "",
    code: chartOfAccountDetail?.data?.code || "",
    description: chartOfAccountDetail?.data?.description || "",
    group: chartOfAccountDetail?.data?.group?.id || "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: chartOfAccountValidation,
    enableReinitialize: true,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const response = (await updateChartOfAccount({
        data: values,
        url: endpoints.chartOfAccount.account.update.replace(
          ":id",
          updateId ?? "",
        ),
        invalidateTag: [
          apiTags.chartOfAccount.account.details,
          apiTags.chartOfAccount.account.list,
        ],
      })) as ApiResponse;

      handleResponse({
        response,
        setErrorCallBack: setErrors,
        handleOnSuccess: () => {
          resetForm();
          handleCloseModal();
        },
      });
    },
  });

  return { formik, isLoading, isInitialLoading };
};

export default useUpdateChartOfAccount;
