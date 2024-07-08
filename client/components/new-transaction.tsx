import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import useAccountStore from "@/stores/useAccountStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";

const FormSchema = z.object({
  amount: z.coerce.number().min(0, {
    message: "amount must be greater than 0",
  }),
  target: z.string().min(10, {
    message: "address must be valid address!",
  }),
  noteType: z.string().optional(),
});

const NewTransaction = () => {
  const accountId = useAccountStore((state) => state.accountId);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: 0,
      target: "",
      noteType: "private",
    },
  });

  const faucetId = "0xae77f3516204d2c3";

  const sendTransaction = async (data: z.infer<typeof FormSchema>) => {
    await fetch("/api/send", {
      method: "POST",
      body: JSON.stringify({
        sender: accountId,
        target: data.target,
        asset: `${data.amount}::${faucetId}`,
        noteType: data.noteType,
      }),
    });
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: sendTransaction,
    onSuccess: () => {},
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    mutateAsync(data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <div className="font-mono">
      <Dialog>
        <DialogTrigger>
          <Button className="font-sm">New Transaction</Button>
        </DialogTrigger>
        <DialogContent className="font-mono">
          <DialogHeader>
            <DialogTitle className="text-center">
              Create New Transaction
            </DialogTitle>
            <DialogDescription>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col justify-center"
                >
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel>Amount to Send</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="target"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel>Recipient Address ID</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <p className="my-2">Sending token id: {faucetId}</p>
                  <p className="my-2">Sending from address: {accountId}</p>
                  <p className="my-2">Notes values are private by default</p>

                  <Button type="submit" className="mb-4">
                    {isPending ? "Loading.." : "Send!"}
                  </Button>
                </form>
              </Form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewTransaction;
