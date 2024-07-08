import { Separator } from "./ui/separator";
import NewTransaction from "./new-transaction";

const NoteSummary = () => {
  return (
    <div className="flex flex-col align-center justify-center mx-4">
      <div className="flex justify-between w-[98%] mt-4 items-center">
        <p className="text-sm">Your Notes</p>

        <NewTransaction />
      </div>
      <Separator className="m-3 max-w-[98%]" />
    </div>
  );
};

export default NoteSummary;
