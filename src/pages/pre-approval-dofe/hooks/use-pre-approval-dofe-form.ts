import { useFormikContext } from "formik";
import { useCallback } from "react";

const usePreApprovalDofeForm = () => {
  const { values, setValues, validateForm, touched, setTouched } =
    useFormikContext<any>();
  // ========================== Handle Add Job =========================
  const handleAddJob = useCallback(async () => {
    const errors = await validateForm();
    const tempJobDetailsError = errors?.temp_job_details;
    if (tempJobDetailsError && Object.keys(tempJobDetailsError).length > 0) {
      setTouched({
        ...touched,
        temp_job_details: {
          jobTitle: true,
          male: true,
          female: true,
          basicSalaryNPR: true,
          basicSalaryAED: true,
          contractPeriod: true,
          workingCity: true,
          workingDays: true,
          workingHours: true,
          experience: true,
          academicQualification: true,
          years: true,
        },
      });
      return;
    }
    setValues({
      ...values,
      jobvacancy: [
        ...values.jobvacancy,
        {
          jobTitle: values?.temp_job_details?.jobTitle,
          male: values?.temp_job_details?.male,
          female: values?.temp_job_details?.female,
          basicSalaryNPR: values?.temp_job_details?.basicSalaryNPR,
          basicSalaryAED: values?.temp_job_details?.basicSalaryAED,
          contractPeriod: values?.temp_job_details?.contractPeriod,
          workingCity: values?.temp_job_details?.workingCity,
          workingDays: values?.temp_job_details?.workingDays,
          workingHours: values?.temp_job_details?.workingHours,
          experience: values?.temp_job_details?.experience,
          academicQualification:
            values?.temp_job_details?.academicQualification,
          years: values?.temp_job_details?.years || "N/A",
        },
      ],
      temp_job_details: {
        jobTitle: "",
        male: "",
        female: "",
        basicSalaryNPR: "",
        basicSalaryAED: "",
        contractPeriod: "",
        workingCity: "",
        workingDays: "",
        workingHours: "",
        experience: false,
        academicQualification: "",
        years: "",
      },
    });
    setTouched({
      ...touched,
      temp_job_details: {
        jobTitle: false,
        male: false,
        female: false,
        basicSalaryNPR: false,
        basicSalaryAED: false,
        contractPeriod: false,
        workingCity: false,
        workingDays: false,
        workingHours: false,
        experience: false,
        academicQualification: false,
        years: false,
      },
    });
  }, [values, setValues]);

  // ========================== Handle Edit Job =========================
  const handleEditJob = useCallback(
    (index: number) => {
      const jobToEdit = values?.jobvacancy[index];
      setValues({
        ...values,
        temp_job_details: {
          ...jobToEdit,
        },
        edit_index: index,
      });
    },
    [values, setValues],
  );

  // ========================== Handle Update Job =========================
  const handleUpdateJob = useCallback(async () => {
    if (values?.edit_index === null || values?.edit_index === undefined) return;

    // Force validate the form
    const errors = await validateForm();
    const tempJobDetailsError = errors?.temp_job_details;
    if (tempJobDetailsError && Object.keys(tempJobDetailsError).length > 0) {
      setTouched({
        temp_job_details: {
          jobTitle: true,
          male: true,
          female: true,
          basicSalaryNPR: true,
          basicSalaryAED: true,
          contractPeriod: true,
          workingCity: true,
          workingDays: true,
          workingHours: true,
          experience: true,
          academicQualification: true,
          years: true,
        },
      });
      return;
    }
    // update the job details
    const updateJobDetails = [...values?.jobvacancy];
    updateJobDetails[values?.edit_index] = {
      ...values?.temp_job_details,
      years: values.temp_job_details.experience
        ? (values.temp_job_details.years ?? "N/A")
        : "N/A",
    };
    setValues({
      ...values,
      jobvacancy: [...updateJobDetails],
      temp_job_details: {
        jobTitle: "",
        male: "",
        female: "",
        basicSalaryNPR: "",
        basicSalaryAED: "",
        contractPeriod: "",
        workingCity: "",
        workingDays: "",
        workingHours: "",
        experience: false,
        academicQualification: "",
        years: "",
      },
      edit_index: null,
    });
    setTouched({
      ...touched,
      temp_job_details: {
        jobTitle: false,
        male: false,
        female: false,
        basicSalaryNPR: false,
        basicSalaryAED: false,
        contractPeriod: false,
        workingCity: false,
        workingDays: false,
        workingHours: false,
        experience: false,
        academicQualification: false,
        years: false,
      },
    });
  }, [values, setValues]);

  // ========================== Handle Cancel Update Job =========================
  const handleCancelUpdateJob = useCallback(() => {
    setValues({
      ...values,
      temp_job_details: {
        jobTitle: "",
        male: "",
        female: "",
        basicSalaryNPR: "",
        basicSalaryAED: "",
        contractPeriod: "",
        workingCity: "",
        workingDays: "",
        workingHours: "",
        experience: false,
        academicQualification: "",
        years: "",
      },
      edit_index: null,
    });
  }, [values, setValues]);

  // ========================== Handle Delete Job =========================
  const handleDeleteJob = useCallback(
    (index: number) => {
      const filterJobDetails = values?.jobvacancy?.filter(
        (_: any, i: number) => i !== index,
      );
      setValues({
        ...values,
        jobvacancy: [...filterJobDetails],
        temp_job_details:
          values?.edit_index === index
            ? {
                jobTitle: "",
                male: "",
                female: "",
                basicSalaryNPR: "",
                basicSalaryAED: "",
                contractPeriod: "",
                workingCity: "",
                workingDays: "",
                workingHours: "",
                experience: false,
                academicQualification: "",
                years: "",
              }
            : { ...values?.temp_job_details },
        edit_index: values?.edit_index === index ? null : values?.edit_index,
      });
    },
    [values],
  );

  // ======================== Is Editing Mode ====================
  const isEditMode =
    values?.edit_index !== null && values?.edit_index !== undefined;

  return {
    handleAddJob,
    handleEditJob,
    handleUpdateJob,
    handleDeleteJob,
    handleCancelUpdateJob,
    values,
    isEditMode,
  };
};

export default usePreApprovalDofeForm;
