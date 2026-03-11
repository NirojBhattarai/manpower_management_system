import { useEffect } from "react";
import { useFormikContext } from "formik";
import FormCheckbox from "@/components/form/form-checkbox";
import FormInputSelect, { IOption } from "@/components/form/form-input-select";
import useModuleList from "../hooks/use-get-module";
import { formatModuleName } from "@/utils/stringFormatter";
import { Loader } from "lucide-react";

const PermissionForm: React.FC<{ roles: IOption[] }> = ({ roles }) => {
  const { values, setFieldValue } = useFormikContext<any>();

  const adminAccess = values.adminAccess;
  const permissionScopes: string[] = values.permissionScopes || [];

  const { moduleListResponse, isLoading: isModulesLoading } = useModuleList();

  const MODULES = moduleListResponse?.data?.features || [];
  const ACTIONS = ["create", "read", "update", "delete"] as const;

  useEffect(() => {
    if (adminAccess) {
      setFieldValue("permissionScopes", []);
    }
  }, [adminAccess, setFieldValue]);

  const hasPermission = (module: string, action: string) =>
    permissionScopes.includes(`${action}:${module}`);

  const togglePermission = (
    module: string,
    action: string,
    checked: boolean,
  ) => {
    const key = `${action}:${module}`;
    setFieldValue(
      "permissionScopes",
      checked
        ? [...permissionScopes, key]
        : permissionScopes.filter((p) => p !== key),
    );
  };

  const isActionSelectedForAllModules = (action: string) =>
    MODULES.every((m) => permissionScopes.includes(`${action}:${m}`));

  const toggleActionForAllModules = (action: string, checked: boolean) => {
    if (checked) {
      const newPermissions = [
        ...permissionScopes,
        ...MODULES.map((m) => `${action}:${m}`),
      ];
      setFieldValue("permissionScopes", Array.from(new Set(newPermissions)));
    } else {
      setFieldValue(
        "permissionScopes",
        permissionScopes.filter((p) => !p.startsWith(`${action}:`)),
      );
    }
  };

  return (
    <div className="space-y-6">
      <FormInputSelect label="Role" name="role" options={roles} />

      <FormCheckbox
        label="Admin Access (Full Permissions)"
        name="adminAccess"
        labelClassName="font-semibold"
      />

      <div className="space-y-4">
        <div className="gap-x-6 grid grid-cols-6 font-semibold text-sm">
          <span>Module</span>
          <span />
          {ACTIONS.map((action) => (
            <div key={action} className="flex items-center gap-1">
              <FormCheckbox
                name={action}
                label={action}
                checked={isActionSelectedForAllModules(action)}
                disabled={adminAccess}
                onChange={(e) =>
                  toggleActionForAllModules(action, e.target.checked)
                }
                labelClassName="capitalize"
              />
            </div>
          ))}
        </div>

        <div className="border-t" />
        {!isModulesLoading ? (
          MODULES.map((module) => (
            <div key={module} className="items-center gap-x-6 grid grid-cols-6">
              <span className="font-semibold text-xs capitalize">
                {formatModuleName(module)}
              </span>

              <span />

              {ACTIONS.map((action) => (
                <FormCheckbox
                  key={`${action}:${module}`}
                  name={action}
                  label={action}
                  checked={hasPermission(module, action)}
                  disabled={adminAccess}
                  onChange={(e) =>
                    togglePermission(module, action, e.target.checked)
                  }
                  labelClassName="capitalize"
                />
              ))}
            </div>
          ))
        ) : (
          <div className="flex flex-col justify-center items-center gap-4">
            <Loader className="text-[#3437eb] animate-spin duration-300" />
            <p className="text-xs">Modules are loading please wait....</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PermissionForm;
