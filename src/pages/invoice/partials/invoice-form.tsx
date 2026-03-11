import FormInputDate from "@/components/form/form-input-date";
import FormInputText from "@/components/form/FormInputText";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { InvoiceProductSchemaType } from "../schema/invoice-schema";
import Table from "@/components/Table";
import TableWrapper from "@/components/TableWrapper";
import useInvoiceForm from "../hooks/use-invoice-form";
import TableAction from "@/components/TableAction";
import FormSwitch from "@/components/form/FormSwitch";
import FormAsyncInputSelect from "@/components/form/form-async-input-select";
import { endpoints } from "@/api/endpoints";

const InvoiceForm = () => {
  return (
    <div className="space-y-6">
      <CustomerDetailsForm />
      <ProductDetailsForm />
      <ProductTable />
    </div>
  );
};

export default InvoiceForm;

// Customer Detals Form
const CustomerDetailsForm = () => {
  return (
    <div className="gap-4 grid grid-cols-2">
      <FormAsyncInputSelect
        fetchUrl={endpoints.candidates.personalDetails.list}
        label="Candidate"
        name="jobseeker"
        labelKey="fullName"
        valueKey="id"
      />
      <FormInputText label="Reference No." name="refNo" />
      <FormInputDate label="Invoice Date" name="invoiceDate" />
      <FormInputDate label="Due Date" name="dueDate" />
    </div>
  );
};

// Product Details Form
const ProductDetailsForm = () => {
  const {
    handleAddProduct,
    getTaxAmount,
    isEditing,
    handleUpdateProduct,
    handleCancelUpdateProduct,
  } = useInvoiceForm();
  return (
    <div className="gap-4 grid grid-cols-6">
      <FormInputText
        wrapperClassName="col-span-2"
        label="Product/Service"
        name="tempProduct.service"
      />
      <FormInputText label="Quantity" name="tempProduct.quantity" />
      <FormInputText label="Rate" name="tempProduct.rate" />
      <FormInputText label="Discount" name="tempProduct.discount" />
      <FormSwitch
        title="Vat (13%)"
        activeText={`Rs. ${getTaxAmount()}`}
        name="tempProduct.vat"
      />
      {isEditing ? (
        <div className="flex items-center gap-x-4">
          <Button variant="update" handleClick={handleUpdateProduct}>
            Update
          </Button>
          <Button variant="delete" handleClick={handleCancelUpdateProduct}>
            Cancel
          </Button>
        </div>
      ) : (
        <div className="flex items-center">
          <Button variant="add" handleClick={handleAddProduct}>
            Add
          </Button>
        </div>
      )}
    </div>
  );
};

// Product List Table
const ProductTable = () => {
  const { isProductAvailable, values } = useInvoiceForm();
  return (
    <TableWrapper isLoading={false} isDataAvailable={isProductAvailable}>
      <Table<InvoiceProductSchemaType>
        columns={ProductColumn()}
        data={values?.services || []}
        isPagination={false}
      />
    </TableWrapper>
  );
};

const ProductColumn = (): ColumnDef<InvoiceProductSchemaType>[] => {
  const { handleEditProduct, handleDeleteProduct } = useInvoiceForm();
  return [
    {
      header: "S.N.",
      cell: ({ row }) => <span>{row?.index + 1}</span>,
      size: 100,
    },
    {
      header: "Product / Service",
      accessorKey: "service",
      size: 150,
    },
    {
      header: "Quantity",
      accessorKey: "quantity",
      cell: ({ row }) => row.original.quantity ?? 0,
      size: 150,
    },
    {
      header: "Unit Rate",
      accessorKey: "rate",
      cell: ({ row }) => row.original.rate ?? 0,
      size: 150,
    },
    {
      header: "Subtotal",
      cell: ({ row }) => {
        const quantity = Number(row.original.quantity ?? 0);
        const rate = Number(row.original.rate ?? 0);
        const subtotal = quantity * rate;
        return subtotal.toFixed(2);
      },
      size: 120,
    },
    {
      header: "VAT (%)",
      accessorKey: "vat",
      cell: ({ row }) => (row.original.vat ? "13%" : "0%"),
      size: 100,
    },
    {
      header: "VAT Amount",
      cell: ({ row }) => {
        const quantity = Number(row.original.quantity ?? 0);
        const rate = Number(row.original.rate ?? 0);
        const subtotal = quantity * rate;
        const vatAmount = row.original.vat ? subtotal * 0.13 : 0;
        return vatAmount.toFixed(2);
      },
      size: 120,
    },
    {
      header: "Gross Amount",
      cell: ({ row }) => {
        const quantity = Number(row.original.quantity ?? 0);
        const rate = Number(row.original.rate ?? 0);
        const subtotal = quantity * rate;
        const vatAmount = row.original.vat ? subtotal * 0.13 : 0;
        return (subtotal + vatAmount).toFixed(2);
      },
      size: 150,
    },
    {
      header: "Discount",
      accessorKey: "discount",
      cell: ({ row }) => Number(row.original.discount ?? 0).toFixed(2),
      size: 120,
    },
    {
      header: "Net Payable",
      cell: ({ row }) => {
        const quantity = Number(row.original.quantity ?? 0);
        const rate = Number(row.original.rate ?? 0);
        const discount = Number(row.original.discount ?? 0);

        const subtotal = quantity * rate;
        const vatAmount = row.original.vat ? subtotal * 0.13 : 0;
        const gross = subtotal + vatAmount;

        return (gross - discount).toFixed(2);
      },
      size: 150,
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <TableAction
          edit={{
            active: true,
            onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              handleEditProduct(row?.index);
            },
          }}
          del={{
            active: true,
            onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              handleDeleteProduct(row?.index);
            },
          }}
        />
      ),
    },
  ];
};

// ============ Button Component ============
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
