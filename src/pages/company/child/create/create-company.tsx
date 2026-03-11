import React from "react";
import ExtendedForm from "@/components/extended-components/ExtendedForm";
import Breadcrumb from "@/components/reusable-component/Breadcrumb";
import useCreateCompany from "./hooks/use-create-comapny";
import CompanyForm from "../../partials/company-form";
import { PATH } from "@/constant/path";
import PageHeader from "@/common/PageHeader";

const CreateCompany: React.FC = () => {
  const { formik, isCompanyLoading } = useCreateCompany();
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
            label: "Create",
          },
        ]}
      />
      <div className="py-4">
        <PageHeader title="Add Company" />
      </div>
      <ExtendedForm formik={formik} isSubmitting={isCompanyLoading}>
        <CompanyForm />
      </ExtendedForm>
    </div>
  );
};

export default CreateCompany;
