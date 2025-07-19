import { getReceivedSwapRequests } from "@/app/actions/swap.action";
import SwapReceiverComponent from "@/components/SwapReceiverComponent";

async function page() {
  const swapsReceived = await getReceivedSwapRequests();
  if (swapsReceived?.length == 0) return <p>No swaps received</p>;

  console.log("🟠🟠 received swaps: ", swapsReceived);

  console.log("🔴🔴 received swaps: ", swapsReceived?.at(0));

  return (
    <div>
      {swapsReceived?.map((swap) => (
        <SwapReceiverComponent swap={swap} />
      ))}
    </div>
  );
}
export default page;
