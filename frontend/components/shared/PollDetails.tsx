"use client"

import React, { useState, useEffect } from "react"
import CustomButton from "./CustomButton"
import Image from "next/image"
import { PollS, Contestant } from "@/types/types"
import Loader from "./Loader"
import CountBox from "./CountBox"
import { daysLeft } from "@/utils"
import { useRouter } from "next/navigation"
import { PollModal } from "./PollModal"
import { useAccount } from "wagmi"

const PollDetails = ({
  poll,
  isPending,
  handleArchive,
  address,
  contestants,
  handleVote,
}: {
  poll: PollS
  isPending: boolean
  handleArchive: () => void
  address: any
  contestants: Contestant[]
  handleVote: (id: any) => void
}) => {
  const router = useRouter()
  const { isConnected } = useAccount()

  if (!poll) {
    return <Loader />
  }

  const remainingDays = daysLeft(Number(poll.endsAt.toString()))
  const hasVoted = poll.voters.includes(address)

  return (
    <div>
      <div className="flex flex-row justify-end items-end mb-4 gap-5 mt-9">
        {poll.director === address && (
          <CustomButton
            btnType="button"
            title="Add contestants"
            styles="blue"
            handleClick={() => router.push(`/contestants/${poll.id}`)}
          />
        )}
        {poll.director === address && <PollModal handleArchive={handleArchive} />}
      </div>

      <div className="w-full flex md:flex-row flex-col mt-1 gap-[30px]">
        <div className="flex-1 flex-col">
          <Image
            src={poll.image}
            alt="campaign"
            width={1700}
            height={0}
            className="w-full h-[410px] object-cover rounded-xl"
          />
        </div>
        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[3px]">
          <CountBox title="Days Left" value={remainingDays} />
          <CountBox title=" Number of voters" value={poll.voters.length} />
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Title</h4>

            <div className="mt-[2px]">
              <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                {poll.title}
              </p>
            </div>
          </div>
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Description
            </h4>

            <div className="mt-[2px]">
              <p className="font-epilogue w-[990px] font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                {poll.description}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Creator
            </h4>

            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <Image
                  src={"/logo.png"}
                  width={60}
                  height={60}
                  alt="user"
                  className="w-[60%] h-[60%] object-contain"
                />
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">
                  {poll.director}
                </h4>
              </div>
            </div>
          </div>
        </div>

        {isConnected &&
          contestants &&
          contestants.length > 0 &&
          contestants.map((item: Contestant, index: number) => (
            <div className="flex-1" key={`${item.id}-${index}`}>
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                {item.name}
              </h4>

              <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
                <Image
                  src={item.image}
                  width={150}
                  height={50}
                  alt=""
                  className="w-[100%] h-1/2 object-contain"
                />
                <p className=" mt-[6px] font-epilogue fount-medium text-[20px] leading-[30px] text-center text-white">
                  {item.voters.length} Vote
                </p>
                <div className="mt-[30px] flex items-start justify-center">
                  <CustomButton
                    disabled={hasVoted}
                    btnType="button"
                    title="Vote"
                    handleClick={() => handleVote(item.id)}
                    styles="w-full"
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default PollDetails
