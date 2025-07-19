"use client";

import {
  acceptSwapRequest,
  rejectSwapRequest,
} from "@/app/actions/swap.action";
import { SwapType } from "@/lib/propTypes";

function SwapReceiverComponent({ swap }: { swap: SwapType }) {
  async function acceptSwap() {
    const res = await acceptSwapRequest(swap.id);
    if (res?.status === "accepted") console.log("You have accepted swap");
  }

  async function rejectSwap() {
    const res = await rejectSwapRequest(swap.id);
    if (res?.status === "rejected")
      console.log("You have rejected swap request");
  }

  return (
    <div>
      Hey,you got a swap from {swap.sender.name}
      <br />
      <button onClick={acceptSwap}>Accept</button>
      <br />
      <button onClick={rejectSwap}>Reject</button>
    </div>
  );
}
export default SwapReceiverComponent;
