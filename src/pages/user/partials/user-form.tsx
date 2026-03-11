import FormInputSelect, { IOption } from "@/components/form/form-input-select";
import FormInputText from "@/components/form/FormInputText";

interface IUserFormProps {
  roles: IOption[];
}
const UserForm: React.FC<IUserFormProps> = ({ roles }) => {
  return (
    <div className="gap-4 grid grid-cols-1">
      <FormInputText label="Name" name="name" />
      <FormInputText label="Email" name="email" />
      <FormInputText label="Phone No." name="phone" />
      <FormInputSelect label="Role" name="role" options={roles} />
    </div>
  );
};

export default UserForm;
