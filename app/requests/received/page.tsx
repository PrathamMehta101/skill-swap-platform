import { getReceivedSwapRequests } from "@/app/actions/swap.action";

async function page() {
  const swapsReceived = await getReceivedSwapRequests();
  if (swapsReceived?.length == 0) return <p>No swaps received</p>;
  return (
    <div>
      {swapsReceived?.map((swap) => (
        <p>{swap.sender.name} sent you this!</p>
      ))}
    </div>
  );
}
export default page;
