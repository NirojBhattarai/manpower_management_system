import { useUpdateDataMutation } from "@/api/api";
import { useUpdateModal } from "@/hooks/use-update-modal";
import { useFormik } from "formik";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";
import useChartOfGroupDetails from "./use-chart-of-group-details";
import {
  ChartOfGroupSchemaType,
  chartOfGroupValidation,
} from "../schema/chart-of-group-schema";

const useUpdateChartOfGroup = () => {
  const { updateId, handleCloseModal } = useUpdateModal();
  const [updateChartOfGroup, { isLoading }] = useUpdateDataMutation();
  const { chartOfGroupDetail, isLoading: isInitialLoading } =
    useChartOfGroupDetails({ id: updateId ?? "" });
  const initialValues: ChartOfGroupSchemaType = {
    groupName: chartOfGroupDetail?.data?.groupName || "",
    under: chartOfGroupDetail?.data?.under || "",
    description: chartOfGroupDetail?.data?.description || "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: chartOfGroupValidation,
    enableReinitialize: true,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const response = (await updateChartOfGroup({
        data: values,
        url: endpoints.chartOfAccount.group.update.replace(
          ":id",
          updateId ?? "",
        ),
        invalidateTag: [
          apiTags.chartOfAccount.group.details,
          apiTags.chartOfAccount.group.list,
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

export default useUpdateChartOfGroup;
