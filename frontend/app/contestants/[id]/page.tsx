"use client"

import React, { useEffect, useMemo } from "react"
import CustomButton from "@/components/shared/CustomButton"
import CustomFormField, { FormFieldType } from "@/components/shared/CustomFormField"
import { Form, useZodForm } from "@/components/ui/form"
import { useWriteContract, useWaitForTransactionReceipt, useReadContract, useAccount } from "wagmi"
import { abi, contractAddress } from "@/constants"
import { toast } from "sonner"
import { z } from "zod"
import { ContestantsSchema } from "@/validation/contestants-schema"
import { usePathname } from "next/navigation"
import { redirect } from "next/navigation"

const Contestants = () => {
  const { data: hash, writeContract, isPending } = useWriteContract()
  const { address, isConnected } = useAccount()
  const pathName = usePathname()
  const pollId = useMemo(() => pathName.split("/").pop(), [pathName])

  const form = useZodForm({
    schema: ContestantsSchema,
    defaultValues: {
      name: "",
      image: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof ContestantsSchema>) => {
    try {
      writeContract({
        address: contractAddress,
        abi,
        functionName: "contest",
        account: address,
        args: [pollId!, values.name, values.image],
      })
      console.log({ address, values, pollId })
    } catch (e) {
      console.error("Error while writing contract:", e)
    }
  }

  const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  useEffect(() => {
    if (isConfirmed) {
      toast.success("Contestants created successfully 👌")
      redirect(`/details/${pollId}`)
    }
  }, [isConfirmed, pollId])

  return (
    <div className="bg-[#1c1c24] w-[1000px] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      <Form form={form} onSubmit={onSubmit} className="w-full mt-[25px] flex flex-col gap-[30px]">
        <div className="grid lg:flex lg:space-x-4">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="Name"
            placeholder="Write a title"
          />
        </div>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="image"
          label="Image URL"
          placeholder="Place image URL of your poll"
        />

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton btnType="submit" title="Add new contestants" />
        </div>
      </Form>
    </div>
  )
}

export default Contestants
