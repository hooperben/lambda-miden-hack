import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useAccountStore from "@/stores/useAccountStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Button } from "./ui/button";
import { DialogHeader } from "./ui/dialog";
import { toast } from "./ui/use-toast";

const UserClaim = ({
  notePath,
  onClose,
}: {
  notePath: string;
  onClose: () => void;
}) => {
  const accountId = useAccountStore((state) => state.accountId);

  const router = useRouter();

  const submitConsume = async () => {
    await fetch("/api/claim-note", {
      method: "POST",
      body: JSON.stringify({ notePath, accountId }),
    });

    // clear the router
    router.replace("/", undefined, { shallow: true });
    onClose();
    toast({
      title: "Note Claimed!",
    });
  };

  const { mutateAsync } = useMutation({
    mutationFn: submitConsume,
  });

  return (
    <div>
      <Dialog open>
        <DialogContent className="font-mono">
          <DialogHeader>
            <DialogTitle className="text-center">Note Claim</DialogTitle>
            <DialogDescription className="flex flex-col justify-center text-center">
              <p className="my-3">
                You have a note waiting for you. Click the button below to claim
                it.
              </p>

              <Button onClick={() => mutateAsync()}>Claim My Note!</Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserClaim;
