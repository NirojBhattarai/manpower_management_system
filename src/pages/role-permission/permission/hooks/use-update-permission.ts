import { useGetDataQuery, useUpdateDataMutation } from "@/api/api";
import { useFormik } from "formik";
import { apiTags } from "@/constant/tag";
import { endpoints } from "@/api/endpoints";
import { useUpdateModal } from "@/hooks/use-update-modal";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";
import {
  PermissionSchemaType,
  PermissionValidationSchema,
} from "../schema/permission-schema";
import usePermissionDetails from "./use-permission-details";
import { RoleListResponse } from "../../role/hooks/use-role-list";
import { IOption } from "@/components/form/form-input-select";

const useUpdatePermission = () => {
  const [updatePermission, { isLoading }] = useUpdateDataMutation();
  const { handleCloseModal, updateId } = useUpdateModal();
  const { permissionDetails, isLoading: isInitialLoading } =
    usePermissionDetails({
      id: updateId,
    });
  const initialValues: PermissionSchemaType = {
    role: permissionDetails?.data?.role?.id || "",
    adminAccess: permissionDetails?.data?.adminAccess || false,
    permissionScopes: permissionDetails?.data?.permissionScopes || [],
  };

  const formik = useFormik<PermissionSchemaType>({
    initialValues,
    validationSchema: PermissionValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const response = (await updatePermission({
        data: values,
        url: endpoints.permission.update.replace(":id", updateId ?? ""),
        invalidateTag: [apiTags.permission.details, apiTags.permission.list],
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

export default useUpdatePermission;
