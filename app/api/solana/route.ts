import { NextResponse } from "next/server";

export async function GET() {
  try {
    const headers = {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    };

    const rpcRes = await fetch("https://api.mainnet-beta.solana.com", {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "getEpochInfo" }),
      next: { revalidate: 15 }
    });
    const rpcData = await rpcRes.json();

    const jupRes = await fetch("https://api.jup.ag/price/v2?ids=So11111111111111111111111111111111111111112", { headers });
    const jupData = await jupRes.json();

    return NextResponse.json({
      slot: rpcData.result?.absoluteSlot || 0,
      epoch: rpcData.result?.epoch || 0,
      progress: rpcData.result ? (rpcData.result.slotIndex / rpcData.result.slotsInEpoch) * 100 : 0,
      price: parseFloat(jupData?.data?.So11111111111111111111111111111111111111112?.price || "0"),
    });
  } catch {
    return NextResponse.json({ slot: 0, epoch: 0, progress: 0, price: 0 });
  }
}