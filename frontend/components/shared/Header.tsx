"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit"
import Image from "next/image"
import Link from "next/link"
import CustomButton from "./CustomButton"
import { useAccount } from "wagmi"

const Header = () => {
  const { isConnected } = useAccount()

  return (
    <nav className="navbar">
      <div className="grow">
        <Link href="/">
          <Image src="/logo.png" width="50" height="50" alt={"logo"} />
        </Link>
      </div>
      <div className="gap-3">
        {isConnected && (
          <Link href="/create">
            <CustomButton title="Create new poll" />
          </Link>
        )}
        <div className={`min-h-[52px] px-4 rounded-[10px]`}>
          <ConnectButton />
        </div>
      </div>
    </nav>
  )
}

export default Header
