"use client";
import dynamic from "next/dynamic";

import init, { add, tester } from "../../rust/pkg/client";

export interface AddModuleExports {
  tester: () => string;
  add: (a: number, b: number) => number;
}

interface RustComponentProps {
  output: string;
}

const RustComponent = dynamic({
  loader: async () => {
    await init();
    console.log(add);
    console.log("after");

    const result = add(1, 2);
    console.log(result);
    console.log(add(1, 2));

    // console.log(tester());

    // Return a React component that calls the add_one method on the wasm module
    return () => <div>hey: {tester()}</div>;
  },
  ssr: false,
});

export default RustComponent;
