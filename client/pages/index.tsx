import Image from "next/image";
import { Inter } from "next/font/google";
import RustComponent from "@/src/rust-component";
import { WebClient } from "@demox-labs/miden-sdk";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const tester = () => {
    console.log("hello");
    // console.log(WebClient);

    // console.log(webClient);
    // await webClient.create_client({
    //   node_url: "18.203.155.106:57291"
    // });
    // const accountId = await webClient.new_wallet("OffChain", true);
    // console.log(accountId);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div>hello</div>
      <button onClick={tester}>Hello</button>
      <RustComponent />
    </main>
  );
}
