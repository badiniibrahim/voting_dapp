"use client"

import React, { useEffect, useMemo } from "react"
import { useWriteContract, useWaitForTransactionReceipt, useReadContract, useAccount } from "wagmi"
import { abi, contractAddress } from "@/constants"
import PollDetails from "@/components/shared/PollDetails"
import { usePathname } from "next/navigation"
import { toast } from "sonner"
import { redirect } from "next/navigation"

const Details = () => {
  const { data: hash, writeContract, isPending } = useWriteContract()
  const { address, isConnected } = useAccount()
  const pathName = usePathname()
  const pollId = useMemo(() => pathName.split("/").pop(), [pathName])

  const result = useReadContract({
    abi,
    address: contractAddress,
    functionName: "getPoll",
    account: address,
    args: [pollId],
  }) as any

  const contestantsResult = useReadContract({
    abi,
    address: contractAddress,
    functionName: "getContestants",
    account: address,
    args: [pollId],
  }) as any

  const handleArchive = () => {
    try {
      writeContract({
        address: contractAddress,
        abi,
        functionName: "deletePoll",
        account: address,
        args: [pollId],
      })
    } catch (e) {
      console.error("Error while writing contract:", e)
    }
  }
  const handleVote = (contestantId: any) => {
    try {
      writeContract({
        address: contractAddress,
        abi,
        functionName: "vote",
        account: address,
        args: [pollId, contestantId],
      })
    } catch (e) {
      console.error("Error while writing contract:", e)
    }
  }
  const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const { isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  useEffect(() => {
    if (isSuccess) {
      result.refetch()
      contestantsResult.refetch()
    }
  }, [contestantsResult, isSuccess, result])

  useEffect(() => {
    if (isConfirmed) {
      result.refetch()
      contestantsResult.refetch()
    }
  }, [contestantsResult, isConfirmed, result])

  return (
    <PollDetails
      poll={result.data}
      isPending={isPending}
      handleArchive={handleArchive}
      address={address}
      contestants={contestantsResult.data}
      handleVote={handleVote}
    />
  )
}

export default Details
