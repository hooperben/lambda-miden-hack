import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import type { ApiClient, ApiHandlers } from "../dist/types/rpc/Api";

const rpcURL = "18.203.155.106:57291";

export const syncState = async () => {
  // const data = await fetch(rpcURL);

  // console.log(data);

  // const result = await data.json();

  // console.log(result);

  // TODO fix this
  const path = "/Users/benhooper/dev/zkBrussels/miden-client/typescript/proto";

  const options: protoLoader.Options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
    includeDirs: [path],
  };

  const PROTO_PATH = `${path}/rpc.proto`;
  const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

  const RPCService = grpc.loadPackageDefinition(packageDefinition).rpc.Api;

  console.log(Object.keys(RPCService));

  // @ts-ignore
  const client = new RPCService(
    rpcURL,
    grpc.credentials.createInsecure()
  ) as ApiClient;

  console.log(client);
  console.log(client.GetAccountDetails);

  client.getAccountDetails(
    // @ts-ignore -- idk why this is broken but this does work
    { account_id: { id: "11430966583520851613" } },
    (err, response) => {
      console.log(err);
      console.log(response);
    }
  );

  // const test = client.GetAccountDetails({
  //   account_id: { id: "11430966583520851613" },
  // });
};
