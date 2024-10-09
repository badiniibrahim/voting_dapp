"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useReadContract } from "wagmi"
import { abi, contractAddress } from "@/constants"
import { PollS } from "@/types/types"
import PollList from "@/components/shared/PollList"
import Header from "@/components/shared/Footer"
import CustomButton from "@/components/shared/CustomButton"
import Image from "next/image"

export default function Home() {
  const result = useReadContract({
    abi,
    address: contractAddress,
    functionName: "getPolls",
  }) as any
  const { isConnected } = useAccount()

  return (
    <main className="flex flex-col h-screen mt-9 w-full">
      <div className="flex justify-between w-full">
        <Link href="/">
          <Image src="/logo.png" width="50" height="50" alt={"logo"} />
        </Link>
        <div className="flex flex-row gap-3">
          {isConnected && (
            <Link href="/create">
              <CustomButton title="Create new poll" />
            </Link>
          )}
          <div className={`min-h-[52px] px-4 rounded-[10px]`}>
            <ConnectButton showBalance={false} />
          </div>
        </div>
      </div>
      <PollList polls={result.data} />
    </main>
  )
}
