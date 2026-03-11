import ExtendedForm from "@/components/extended-components/ExtendedForm";
import ModalWrapper from "@/components/shadcn/modal-wrapper";
import useInsuranceToShram from "../hooks/use-insurance-to-shram";
import useInsuranceToShramModal from "../hooks/use-insurance-to-shram-modal";
import { IInsuranceListItem } from "../interface/insurance-interface";
import { AlertTriangle, ArrowRightLeft, Loader2 } from "lucide-react";
interface IInsuranceToShramProps {
  selectedCandidates: IInsuranceListItem[];
}
const InsuranceToShram: React.FC<IInsuranceToShramProps> = ({
  selectedCandidates,
}) => {
  const { isInsuranceToShram, handleCloseInsuranceToShram } =
    useInsuranceToShramModal();

  const { formik, isLoading } = useInsuranceToShram({
    candidates: selectedCandidates,
  });

  return (
    <ModalWrapper
      className="xl:max-w-2xl"
      name="Move insurance candidate to labour permit"
      description="This will move the selected insurance candidate to shram"
      isOpen={isInsuranceToShram}
      onOpenChange={handleCloseInsuranceToShram}
    >
      <ExtendedForm formik={formik} isSubmitting={isLoading}>
        <div className="flex flex-col gap-4 py-2 xl:max-w-2xl">
          <div className="flex items-start gap-3 bg-amber-50 p-4 border border-amber-200 rounded-xl">
            <div className="flex justify-center items-center bg-amber-100 rounded-full w-9 h-9 shrink-0">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-amber-800 text-sm">
                Confirm Action
              </p>
              <p className="text-amber-700 text-sm">
                Are you sure you want to move the selected candidates to{" "}
                <span className="font-semibold">Labour Permit</span>?
              </p>
            </div>
          </div>

          {isLoading && (
            <div className="flex flex-col items-center gap-3 bg-blue-50 px-4 py-5 border border-blue-200 rounded-xl">
              <div className="flex items-center gap-3 w-full">
                <div className="flex flex-col items-center gap-1 min-w-fit">
                  <div className="flex justify-center items-center bg-white shadow-sm border border-blue-200 rounded-lg w-10 h-10">
                    <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                  </div>
                  <span className="font-medium text-blue-600 text-xs">
                    Insurance
                  </span>
                </div>

                <div className="relative flex-1 bg-blue-100 rounded-full h-2 overflow-hidden">
                  <div className="left-0 absolute inset-y-0 bg-linear-to-r from-blue-400 to-blue-500 rounded-full w-1/2 animate-[transfer_1.2s_ease-in-out_infinite]" />
                  <style>{`
            @keyframes transfer {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(300%); }
            }
          `}</style>
                </div>
                <div className="flex flex-col items-center gap-1 min-w-fit">
                  <div className="flex justify-center items-center bg-white shadow-sm border border-blue-200 rounded-lg w-10 h-10">
                    <ArrowRightLeft className="w-5 h-5 text-blue-500" />
                  </div>
                  <span className="font-medium text-blue-600 text-xs">
                    Labour Permit
                  </span>
                </div>
              </div>

              <p className="font-medium text-blue-600 text-xs tracking-wide animate-pulse">
                Transferring candidates to Labour Permit...
              </p>
            </div>
          )}

          {!isLoading && (
            <p className="px-1 text-muted-foreground text-xs">
              This action will transfer all selected insurance candidates to
              Labour Permit. Please review before confirming.
            </p>
          )}
        </div>
      </ExtendedForm>
    </ModalWrapper>
  );
};

export default InsuranceToShram;
