import InputSearchSelect from "@/components/form/form-input-select";
import InputText from "@/components/form/FormInputText";
import FormInputImage from "@/components/form/FormInputPhoto";
import FormAsyncInputSelect from "@/components/form/form-async-input-select";
import { endpoints } from "@/api/endpoints";

const CompanyForm = () => {
  return (
    <div className="gap-5 grid grid-cols-1">
      {/* Company Info */}
      <p className="mt-5 text-text-400 typo-xl-bd-reg">Company Information</p>
      <div className="gap-8 grid grid-cols-5">
        <div className="col-span-2">
          <InputText
            label="Recruitment Company Name"
            name="companyName"
            placeholder="Enter Company Name"
          />
        </div>

        <FormAsyncInputSelect
          fetchUrl={`${endpoints.country.list}`}
          label="Country"
          name="country"
          labelKey="country"
          valueKey="id"
        />

        <InputSearchSelect
          label="Sector Type"
          name="sector"
          options={[
            { label: "Qiwa", value: "qiwa" },
            { label: "MOL", value: "mol" },
            { label: "Tashel", value: "tashel" },
          ]}
          placeholder="Select Sector"
        />
        <FormAsyncInputSelect
          fetchUrl={`${endpoints.country.list}`}
          label="Currency"
          name="currency"
          labelKey="currency"
          valueKey="currency"
        />
      </div>

      {/* License */}
      <div className="gap-8 grid grid-cols-2">
        <InputSearchSelect
          label="License Number Name"
          name="licenseNumberName"
          options={[
            { label: "Trade Lincense", value: "Trade Lincense" },
            { label: "CR Number", value: "CR Number" },
            { label: "SSM", value: "ssm" },
          ]}
        />
        <div className="gap-8 grid grid-cols-2">
          <InputText
            label="License Number"
            name="liscenseNumber"
            placeholder="Enter License Number"
          />
          <InputSearchSelect
            label="License Issue By"
            name="liscenseIssuedBy"
            options={[
              { label: "Economic Department", value: "economic_department" },
            ]}
          />
        </div>
        <div className="col-span-2">
          <FormInputImage label="License Image" name="liscenseImage" />
        </div>
      </div>

      {/* Company Address */}
      <p className="mt-5 text-text-400 typo-xl-bd-reg">Company Address</p>
      <div className="gap-8 grid grid-cols-4 mt-2">
        <InputText
          label="State/Region"
          name="state"
          placeholder="Enter State"
        />
        <InputText label="City" name="city" placeholder="Enter City" />
        <InputText label="Street" name="street" placeholder="Enter Street" />
        <InputText label="Area" name="area" placeholder="Enter Area" />
      </div>

      {/* Recruitment Contact Person */}
      <p className="mt-5 text-text-400 typo-xl-bd-reg">
        Recruitment Contact Person
      </p>
      <div className="gap-8 grid grid-cols-2 mt-2">
        <InputText
          label="Contact Person Name"
          name="contactPersonName"
          placeholder="Enter Contact Person Name"
        />
        <InputText
          label="Contact Number"
          name="contactNumber"
          placeholder="Enter Contact Number"
        />
        <div className="gap-8 grid grid-cols-3 col-span-2">
          <InputText label="Email" name="email" placeholder="Enter Email" />
          <InputText
            label="Office Address"
            name="officeAddress"
            placeholder="Enter Office Address"
          />
          <InputText
            label="Website URL"
            name="websiteUrl"
            placeholder="Enter Website URL"
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyForm;
