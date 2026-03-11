import { useUpdateDataMutation } from "@/api/api";
import { useFormik } from "formik";
import { apiTags } from "@/constant/tag";
import { endpoints } from "@/api/endpoints";
import { useUpdateModal } from "@/hooks/use-update-modal";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";
import useRoleDetails from "./use-role-details";
import { RoleSchemaType, RoleValidationSchema } from "../schema/role-schema";

const useUpdateRole = () => {
  const [updateRole, { isLoading }] = useUpdateDataMutation();
  const { handleCloseModal, updateId } = useUpdateModal();
  const { roleDetails, isLoading: isInitialLoading } = useRoleDetails({
    id: updateId,
  });
  const initialValues: RoleSchemaType = {
    label: roleDetails?.data?.label || "",
  };

  const formik = useFormik<RoleSchemaType>({
    initialValues,
    validationSchema: RoleValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const response = (await updateRole({
        data: values,
        url: endpoints.role.update.replace(":id", updateId ?? ""),
        invalidateTag: [apiTags.role.details, apiTags.role.list],
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

  return {
    formik,
    isLoading,
    isInitialLoading,
  };
};

export default useUpdateRole;
