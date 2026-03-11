import { FormikProvider, FormikValues, FormikContextType } from "formik";
import { cn } from "@/lib/utils";

interface ExtendedFormWithoutButtonProps<T extends FormikValues> {
  formik: FormikContextType<T>;
  children: React.ReactNode;
  className?: string;
}

export default function ExtendedFormWithoutButton<T extends FormikValues>({
  formik,
  children,
  className,
}: ExtendedFormWithoutButtonProps<T>) {
  return (
    <FormikProvider value={formik}>
      <form
        onSubmit={formik?.handleSubmit}
        className={cn("space-y-6 bg-white shadow-sm rounded-xl", className)}
      >
        {children}
      </form>
    </FormikProvider>
  );
}
