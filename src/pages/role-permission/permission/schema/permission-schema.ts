import * as Yup from "yup";

const permissionSchema = Yup.object().shape({
  role: Yup.string().required("Role is required"),
  adminAccess: Yup.boolean().optional(),
  permissionScopes: Yup.array().optional(),
});

export type PermissionSchemaType = Yup.InferType<typeof permissionSchema>;
export const PermissionValidationSchema = permissionSchema;
