import { NextResponse } from "next/server";

const SOL_MINT = "So11111111111111111111111111111111111111112";

export async function GET() {
  try {
    const rpcRes = await fetch("https://api.mainnet-beta.solana.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "getEpochInfo" }),
      next: { revalidate: 15 },
    });
    const rpcData = await rpcRes.json();

    // Jupiter migrated: /price/v2 → v3 (lite-api.jup.ag), price key → usdPrice
    const jupRes = await fetch(`https://lite-api.jup.ag/price/v3?ids=${SOL_MINT}`, {
      next: { revalidate: 15 },
    });
    const jupData = await jupRes.json();
    const price = Number(jupData?.[SOL_MINT]?.usdPrice) || 0;

    return NextResponse.json({
      slot: rpcData.result?.absoluteSlot || 0,
      epoch: rpcData.result?.epoch || 0,
      progress: rpcData.result
        ? (rpcData.result.slotIndex / rpcData.result.slotsInEpoch) * 100
        : 0,
      price,
    });
  } catch {
    return NextResponse.json({ slot: 0, epoch: 0, progress: 0, price: 0 });
  }
}
