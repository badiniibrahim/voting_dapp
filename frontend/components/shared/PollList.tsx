import React from "react"
import { PollS } from "@/types/types"
import PollCard from "@/components/shared/PollCard"

const PollList = ({ polls }: { polls: PollS[] }) => {
  return (
    <div>
      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {polls && polls.length === 0 && (
          <p className="font-epilogue text-center font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any poll yet
          </p>
        )}

        {polls && polls.length > 0 && polls.map(poll => <PollCard key={poll.id} {...poll} />)}
      </div>
    </div>
  )
}

export default PollList
