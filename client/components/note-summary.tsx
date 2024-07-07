import { Separator } from "@/components/ui/separator";

const NoteSummary = () => {
  return (
    <div className="flex flex-col align-center justify-center">
      <p className="ml-4 text-sm">Your Notes</p>
      <Separator className="m-3 max-w-[98%]" />
    </div>
  );
};

export default NoteSummary;
