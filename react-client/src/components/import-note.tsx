import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MidenClientStoreContext } from "../contexts/miden-client-store";

const ImportNote = () => {
  const { client } = useContext(MidenClientStoreContext);

  const formSchema = z.object({
    file: z.any().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const fileRef = form.register("file");

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("data");

    const file = data.file[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = async function (e) {
        // @ts-ignore
        const arrayBuffer = e.target.result;
        console.log(arrayBuffer);
        if (!arrayBuffer) {
          console.log("error reading file");
          return;
        }
        // @ts-ignore
        const byteArray = new Uint8Array(arrayBuffer);

        console.log("pre import");
        await client.import_note(byteArray, true);

        console.log("post import");
      };

      reader.readAsArrayBuffer(file);
    }
    console.log(data);
  };
  return (
    <>
      <div className="font-mono">
        <Dialog>
          <DialogTrigger>
            <Button className="font-sm">Import Note</Button>
          </DialogTrigger>
          <DialogContent className="font-mono">
            <DialogHeader>
              <DialogTitle className="text-center">Import Note</DialogTitle>
              <DialogDescription>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full p-10"
                  >
                    <FormField
                      control={form.control}
                      name="file"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Note File</FormLabel>
                            <FormControl>
                              <Input
                                type="file"
                                placeholder="shadcn"
                                {...fileRef}
                                onChange={(event) => {
                                  field.onChange(
                                    event.target?.files?.[0] ?? undefined
                                  );
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                    <div className="flex justify-center mt-3">
                      <Button className="" type="submit">
                        Upload Note
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default ImportNote;
