import React from "react";
import ExtendedForm from "@/components/extended-components/ExtendedForm";
import Breadcrumb from "@/components/reusable-component/Breadcrumb";
import PageHeader from "@/common/PageHeader";
import CompanyForm from "../../partials/company-form";
import { PATH } from "@/constant/path";
import useUpdateCompany from "./hooks/use-update-company";
import LoadingScreen from "@/components/reusable-component/LoadingScreen";

const UpdateCompany: React.FC = () => {
  const { formik, isInitialLoading, isLoading } = useUpdateCompany();
  return (
    <div className="u-flex-child">
      <Breadcrumb
        items={[
          { label: "Dashboard" },
          {
            label: "Company",
            to: PATH.company.index,
          },
          {
            label: "Update Company",
          },
        ]}
      />
      <div className="py-4">
        <PageHeader title="Update Company" />
      </div>
      <ExtendedForm formik={formik} isSubmitting={isLoading}>
        {isInitialLoading ? <LoadingScreen height="50vh" /> : <CompanyForm />}
      </ExtendedForm>
    </div>
  );
};

export default UpdateCompany;
