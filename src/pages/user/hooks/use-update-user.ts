import { useGetDataQuery, useUpdateDataMutation } from "@/api/api";
import { useFormik } from "formik";
import { apiTags } from "@/constant/tag";
import { endpoints } from "@/api/endpoints";
import { useUpdateModal } from "@/hooks/use-update-modal";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";
import useUserDetails from "./use-user-details";
import { UserSchemaType, UserValidationSchema } from "../schema/user-schema";
import { RoleListResponse } from "@/pages/role-permission/role/hooks/use-role-list";
import { IOption } from "@/components/form/form-input-select";

const useUpdateUser = () => {
  const [updateUser, { isLoading }] = useUpdateDataMutation();
  const { handleCloseModal, updateId } = useUpdateModal();
  const { userDetails, isLoading: isInitialLoading } = useUserDetails({
    id: updateId,
  });
  const initialValues: UserSchemaType = {
    name: userDetails?.data?.name || "",
    email: userDetails?.data?.email || "",
    phone: userDetails?.data?.phone || "",
    role: userDetails?.data?.role || "",
  };

  const formik = useFormik<UserSchemaType>({
    initialValues,
    validationSchema: UserValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const response = (await updateUser({
        data: values,
        url: endpoints.user.update.replace(":id", updateId ?? ""),
        invalidateTag: [apiTags.user.details, apiTags.user.list],
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

  const { data: roleList } = useGetDataQuery<{
    data: RoleListResponse;
  }>({ url: endpoints.role.list });

  const roles: IOption[] =
    roleList?.data?.records.map((role) => ({
      label: `${role?.label}`,
      value: role?.id,
    })) || [];

  return {
    formik,
    isLoading,
    isInitialLoading,
    roles,
  };
};

export default useUpdateUser;
