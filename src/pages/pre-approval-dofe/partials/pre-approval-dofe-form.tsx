import InputDate from "@/components/form/form-input-date";
import FormSelect, { IOption } from "@/components/form/form-input-select";
import InputText from "@/components/form/FormInputText";
import FormInputPdf from "@/components/form/FormInputPdf";
import { CircleX, PlusCircle } from "lucide-react";
import FormSwitch from "@/components/form/FormSwitch";
import { useFormikContext } from "formik";
import { PreApprovalDofeFormType } from "../schema/pre-approval-dofe-schema";
import React, { useMemo, useRef } from "react";
import { cn } from "@/lib/utils";
import usePreApprovalDofeForm from "../hooks/use-pre-approval-dofe-form";
import TableWrapper from "@/components/TableWrapper";
import Table from "@/components/Table";
import { ColumnDef } from "@tanstack/react-table";
import TableAction from "@/components/TableAction";
import { getFileIcon } from "@/utils/getFileIcon";
import { Jobvacancy } from "../interface/preapprovaldofe-interface";
import useJobTitleList from "@/pages/settings/job-setting/job-title/hooks/use-job-title-list";
import FormAsyncInputSelect from "@/components/form/form-async-input-select";
import { endpoints } from "@/api/endpoints";

// =========================== Pre Approval Step - 1 Form ===============================
export const PreApprovalFormStep1 = () => {
  const formik = useFormikContext<PreApprovalDofeFormType>();
  const fileInputRef = useRef<{ reset: () => void }>(null);
  const handleAddDocument = () => {
    const { document, documentType } = formik.values;
    if (!documentType || !document) return;

    // Add to documents array
    formik.setValues({
      ...formik.values,
      documents: [
        ...(formik.values.documents || []),
        { document, documentType },
      ],
      documentType: "", // clear select
      document: "", // optional for state
    });

    // Reset the file input visually
    fileInputRef.current?.reset();
  };

  const handleRemoveDocument = (index: number) => {
    formik.setValues({
      ...formik.values,
      documents:
        formik.values.documents &&
        formik.values.documents.filter((_: any, i: number) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      <div className="gap-8 grid grid-cols-4 col-span-2">
        <FormAsyncInputSelect
          fetchUrl={`${endpoints.country.list}`}
          label="Country"
          name="country"
          labelKey="country"
          valueKey="id"
        />
        <FormAsyncInputSelect
          fetchUrl={`${endpoints.company.list}`}
          label="Recruitment Company"
          name="company"
          labelKey="companyName"
          valueKey="id"
          dependedValueKey="country"
          dependedValue={formik.values.country}
          disabled={formik.values.country ? false : true}
        />
        <InputText
          label="Pre Approval Certifcate Number"
          name="preApprovalCertificateNumber"
        />
        <FormInputPdf
          label="Pre Approval Certifcate Pdf"
          name="preApprovalCertificatePDF"
        />
      </div>

      <div className="gap-6 grid grid-cols-4 col-span-2">
        <InputDate label="Pre Approval Date" name="preApprovalDate" />
        <InputDate label="Pre Approval Validity" name="preApprovalValidity" />
        <InputText label="Pre LT number" name="preltNumber" />
        <InputText label="Chalani Number" name="chalaniNumber" />
      </div>

      {/* Documents */}
      <div className="flex flex-col gap-6 p-4 border-2 border-dotted">
        <div className="gap-6 grid grid-cols-2">
          <FormSelect
            label="Document Type"
            name="documentType"
            options={[
              {
                label: "Embassy Attested Demand Letter",
                value: "demand-letter",
              },
              { label: "Power of Attorney", value: "power-of-attorney" },
              { label: "Contract", value: "contract" },
              { label: "Aggrement", value: "agreement" },
              { label: "Trade Licence", value: "trade-license" },
              { label: "Quota Approval", value: "quota-approval" },
            ]}
          />
          <FormInputPdf
            label="Document"
            name="document"
            handleDeleteRef={fileInputRef}
          />
        </div>

        <div className="col-span-2">
          <Button variant="add" handleClick={handleAddDocument}>
            <div className="flex justify-center items-center gap-2">
              <PlusCircle size={16} className="rounded-lg text-white" />
              <span>Add</span>
            </div>
          </Button>
        </div>
      </div>
      {formik.values?.documents?.some(
        (doc: { document: string | File; documentType: string }) =>
          doc.document || doc.documentType,
      ) && (
        <div className="flex flex-wrap gap-4 col-span-2">
          {formik?.values?.documents?.map((item, index) => {
            const fileUrl = item?.document;

            const displayName = item?.documentType
              ? item.documentType
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (c) => c.toUpperCase())
              : "File";

            const handleOpenFile = (doc?: string | File) => {
              if (typeof doc !== "string") return;
              window.open(doc, "_blank", "noopener,noreferrer");
            };

            return (
              <div
                key={index}
                title="Click to open document"
                onClick={() => handleOpenFile(fileUrl)}
                className="group relative flex flex-col justify-center items-center bg-white hover:shadow-sm border border-gray-200 hover:border-primary/60 border-dashed rounded-lg w-24 h-24 transition-all duration-200 cursor-pointer"
              >
                <div className="mb-1">{getFileIcon(fileUrl)}</div>
                <p
                  className="px-1 text-gray-700 text-xs text-center line-clamp-1"
                  title={displayName}
                >
                  {displayName}
                </p>

                <button
                  type="button"
                  aria-label="Remove document"
                  className="-top-2 -right-2 absolute bg-white hover:bg-red-50 opacity-0 group-hover:opacity-100 p-1 border border-gray-200 rounded-full hover:text-red-600 transition-all duration-150"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveDocument(index);
                  }}
                >
                  <CircleX size={14} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// =========================== Pre Approval Step - 2 Form ===============================
export const PreApprovalFormStep2 = () => {
  const {
    values,
    handleAddJob,
    isEditMode,
    handleUpdateJob,
    handleCancelUpdateJob,
  } = usePreApprovalDofeForm();
  return (
    <div className="space-y-6">
      <p>Job Details</p>
      <div className="space-y-4">
        <div className="gap-6 grid grid-cols-3">
          <FormAsyncInputSelect
            fetchUrl={endpoints.jobsetting.jobTitle.list}
            label="Job Title"
            name="temp_job_details.jobTitle"
            labelKey="jobtitle"
            valueKey="id"
          />
          <div className="gap-x-4 grid grid-cols-2">
            <InputText label="Male" name="temp_job_details.male" />
            <InputText label="Female" name="temp_job_details.female" />
          </div>
          <div className="gap-x-4 grid grid-cols-2">
            <InputText
              label="Basic Salary (AED)"
              name="temp_job_details.basicSalaryAED"
            />
            <InputText
              label="Basic Salary (NPR)"
              name="temp_job_details.basicSalaryNPR"
            />
          </div>
        </div>

        <div className="gap-6 grid grid-cols-4">
          <InputText
            label="Working Hours"
            name="temp_job_details.workingHours"
            placeholder=""
          />
          <InputText
            label="Working Days"
            name="temp_job_details.workingDays"
            placeholder=""
          />
          <InputText
            label="Contract Period (Years)"
            name="temp_job_details.contractPeriod"
            placeholder=""
          />
          <InputText label="Working City" name="temp_job_details.workingCity" />
          <div className="grid grid-cols-2">
            <FormSwitch title="Experience" name="temp_job_details.experience" />
            {values?.temp_job_details?.experience ? (
              <InputText label="In (Years)" name="temp_job_details.years" />
            ) : null}
          </div>
          <FormSelect
            label="Academic Qualification"
            name="temp_job_details.academicQualification"
            options={[
              { label: "Below 10", value: "below 10" },
              { label: "10", value: "10" },
              { label: "+2", value: "+2" },
              { label: "Bachelor", value: "bachelor" },
              { label: "Master Degree", value: "master degree" },
              { label: "PHD", value: "phd" },
            ]}
          />
          <div className="flex justify-center items-center pt-5 w-fit">
            {isEditMode ? (
              <div className="flex justify-center items-center gap-x-4">
                <Button variant="update" handleClick={handleUpdateJob}>
                  Update
                </Button>
                <Button variant="delete" handleClick={handleCancelUpdateJob}>
                  Cancel
                </Button>
              </div>
            ) : (
              <div className="flex justify-center items-center gap-x-4">
                <Button variant="add" handleClick={handleAddJob}>
                  Add
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <JobDetailsTable />
    </div>
  );
};

// =========================== Pre Approval Step - 3 Form ===============================
export const PreApprovalFormStep3 = () => {
  return (
    <div className="gap-6 grid grid-cols-6">
      <FormSwitch title="Food" name="food" />
      <FormSwitch title="Accommodation" name="accomodation" />
      <FormSwitch title="Transportation" name="transportation" />
      <FormSwitch title="Free Visa" name="freevisa" />
      <FormSwitch title="Free Ticket" name="freeticket" />
      <FormSwitch title="Over Time" name="overtime" />
    </div>
  );
};

// ============================ Payments Table =================================
const JobDetailsTable = () => {
  const { values } = usePreApprovalDofeForm();
  return (
    <TableWrapper
      isLoading={false}
      isDataAvailable={values?.jobvacancy?.length > 0}
    >
      <Table
        isPagination={false}
        columns={JobDetailsColumn()}
        data={values?.jobvacancy}
      />
    </TableWrapper>
  );
};

// ============================= Payment Columns =====================================
const JobDetailsColumn = (): ColumnDef<Jobvacancy>[] => {
  const { handleEditJob, handleDeleteJob } = usePreApprovalDofeForm();
  const { jobTitleListResponse } = useJobTitleList();
  const jobTitles: IOption[] = [];
  jobTitleListResponse?.data?.records?.forEach((item) => {
    jobTitles.push({ value: item.id, label: item.jobtitle });
  });
  const jobTitleMap = useMemo(() => {
    const map: Record<string, string> = {};
    jobTitles.forEach((jt) => {
      map[jt.value] = jt.label;
    });
    return map;
  }, [jobTitles]);

  return [
    {
      header: "Job Title",
      accessorKey: "jobTitle",
      cell: ({ row }) => jobTitleMap[row.original.jobTitle] ?? "-",
      size: 200,
    },
    {
      header: "Male",
      accessorKey: "male",
    },
    {
      header: "Female",
      accessorKey: "female",
    },
    {
      header: "Basic Salary NPR",
      accessorKey: "basicSalaryNPR",
    },
    {
      header: "Basic Salary AED",
      accessorKey: "basicSalaryAED",
    },
    {
      header: "Working City",
      accessorKey: "workingCity",
    },
    {
      header: "Working Days",
      accessorKey: "workingDays",
    },
    {
      header: "Working Hours",
      accessorKey: "workingHours",
    },
    {
      header: "Contract Period",
      accessorKey: "contractPeriod",
    },
    {
      header: "Experience Years",
      accessorKey: "years",
      cell: ({ row }) =>
        row?.original?.experience ? row?.original?.years : "N/A",
    },
    {
      header: "Academic Qualification",
      accessorKey: "academicQualification",
      cell: ({ row }) => {
        return (
          <span className="capitalize">
            {row?.original?.academicQualification
              ? row?.original?.academicQualification
              : "N/A"}
          </span>
        );
      },
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: ({ row }) => (
        <TableAction
          edit={{
            active: true,
            onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              handleEditJob(row?.index);
            },
          }}
          del={{
            active: true,
            onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              handleDeleteJob(row?.index);
            },
          }}
        />
      ),
      size: 200,
      maxSize: 200,
    },
  ];
};

// ==================================== Button Component ================================
type ButtonVariant = "add" | "update" | "delete";
const Button = ({
  children,
  handleClick,
  variant,
  disabled = false,
}: {
  children: React.ReactNode;
  handleClick: () => void;
  variant: ButtonVariant;
  disabled?: boolean;
}) => {
  const baseStyle =
    "px-4 py-2 flex items-center justify-center typo-mid-bd-reg rounded-lg cursor-pointer transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants: Record<ButtonVariant, string> = {
    add: "text-white bg-secondary-500 hover:bg-secondary-700",
    update: "text-white bg-primary-500 hover:bg-primary-700",
    delete: "text-white bg-error-delete hover:bg-red-700",
  };
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        handleClick();
      }}
      className={cn(baseStyle, variants[variant])}
    >
      {children}
    </button>
  );
};
