import { Inbox } from "lucide-react";

const NoDataFound = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-3 bg-gray-50/60 p-12 border border-gray-300 border-dashed rounded-xl text-center">
      {/* Icon */}
      <div className="flex justify-center items-center bg-indigo-50 rounded-full w-16 h-16">
        <Inbox className="w-8 h-8 text-indigo-500" strokeWidth={1.8} />
      </div>

      {/* Text */}
      <h3 className="font-semibold text-gray-900 text-lg">No Data Found</h3>
      <p className="max-w-sm text-gray-500 text-sm">
        There are no records available right now. Try adjusting filters or add
        new data.
      </p>
    </div>
  );
};

export default NoDataFound;
