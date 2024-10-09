"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"

export const PollModal = ({ handleArchive }: { handleArchive: () => void }) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className={`font-epilogue bg-red-500 hover:bg-red-500 font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px]`}
        >
          Archive the Poll
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize text-black">Archive Poll</DialogTitle>
          <DialogDescription>Are you sure you want to archive the poll ?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>NO</Button>
          <Button onClick={handleArchive} className={"bg-red-500"}>
            YES
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
