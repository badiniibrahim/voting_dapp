"use client"

import CustomButton from "@/components/shared/CustomButton"
import CustomFormField, { FormFieldType } from "@/components/shared/CustomFormField"
import { Form, useZodForm } from "@/components/ui/form"
import { CreatePollSchema } from "@/validation/create-poll-schema"
import React, { useEffect } from "react"

import { useWriteContract, useWaitForTransactionReceipt, useAccount } from "wagmi"
import { abi, contractAddress } from "@/constants"
import { toast } from "sonner"
import { z } from "zod"
import { useRouter } from "next/navigation"

const CratePoll = () => {
  const { data: hash, writeContract } = useWriteContract()
  const { address } = useAccount()
  const router = useRouter()

  const form = useZodForm({
    schema: CreatePollSchema,
    defaultValues: {
      title: "",
      description: "",
      startsAt: new Date(),
      endsAt: new Date(),
      image: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof CreatePollSchema>) => {
    try {
      const startsAt = new Date(values.startsAt).getTime()
      const endsAt = new Date(values.endsAt).getTime()
      writeContract({
        address: contractAddress,
        abi,
        functionName: "createPoll",
        account: address,
        args: [values.image, values.title, values.description, startsAt, endsAt],
      })
    } catch (e) {
      console.error("Error while writing contract:", e)
    }
  }

  const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  useEffect(() => {
    if (isConfirmed) {
      toast.success("Poll created successfully 👌")
      router.push("/")
    }
  }, [isConfirmed, router])

  return (
    <div className="bg-[#1c1c24] w-[1000px] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      <Form form={form} onSubmit={onSubmit} className="w-full mt-[25px] flex flex-col gap-[30px]">
        <div className="grid lg:flex lg:space-x-4">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="title"
            label="Title"
            placeholder="Write a title"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="description"
            label="Description"
            placeholder="Write a description"
          />
        </div>

        <div className="grid lg:flex lg:space-x-4">
          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="startsAt"
            label="Start date"
            placeholder="Start Date"
          />
          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="endsAt"
            label="End date"
            placeholder="End Date"
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
          <CustomButton btnType="submit" title="Create new poll" />
        </div>
      </Form>
    </div>
  )
}

export default CratePoll
