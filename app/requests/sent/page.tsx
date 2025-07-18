import { getSentSwapRequests } from "@/app/actions/swap.action";

async function page() {
  const swapsSent = await getSentSwapRequests();
  if (swapsSent?.length === 0) return <p>No swaps sent!</p>;

  return (
    <div>
      {swapsSent?.map((swap) => (
        <p>You sent a swap to {swap.receiver.name}</p>
      ))}
    </div>
  );
}
export default page;
