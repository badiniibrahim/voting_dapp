import { Button } from "@/components/ui/button"

const CustomButton = ({ btnType, title, handleClick, styles, disabled }: any) => {
  return (
    <Button
      disabled={disabled}
      type={btnType}
      className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] ${styles}`}
      onClick={handleClick}
    >
      {title}
    </Button>
  )
}

export default CustomButton
