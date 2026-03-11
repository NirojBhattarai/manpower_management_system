import FormInputText from "@/components/form/FormInputText";

const CountryForm = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <FormInputText
        label="Country"
        name="country"
        placeholder="Enter Country..."
      />
      <FormInputText
        label="Currency"
        name="currency"
        placeholder="Enter Currency..."
      />
      <FormInputText
        label="Capital"
        name="capital"
        placeholder="Enter Capital..."
      />
      <FormInputText
        label="Language"
        name="language"
        placeholder="Enter language..."
      />
    </div>
  );
};

export default CountryForm;
