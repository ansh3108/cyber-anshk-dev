import { NextResponse } from "next/server";

export async function GET() {
  let slot = 0;
  let epoch = 0;
  let progress = 0;
  let price = 0;

  const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  };

  try {
    const rpcRes = await fetch("https://api.mainnet-beta.solana.com", {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "getEpochInfo" }),
      next: { revalidate: 10 }
    });

    const rpcData = await rpcRes.json();

    if (rpcData?.result) {
      slot = rpcData.result.absoluteSlot;
      epoch = rpcData.result.epoch;
      progress = (rpcData.result.slotIndex / rpcData.result.slotsInEpoch) * 100;
    }

    try {
      const jupRes = await fetch("https://api.jup.ag/price/v2?ids=So11111111111111111111111111111111111111112", { headers });
      const jupData = await jupRes.json();
      price = parseFloat(jupData?.data?.So11111111111111111111111111111111111111112?.price || "0");
    } catch (e) {
      const cgRes = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd");
      const cgData = await cgRes.json();
      price = cgData?.solana?.usd || 0;
    }

    return NextResponse.json({ slot, epoch, progress, price });

  } catch (err) {
    console.error("Chain API Error:", err);
    return NextResponse.json({ slot: 0, epoch: 0, progress: 0, price: 0 });
  }
}
