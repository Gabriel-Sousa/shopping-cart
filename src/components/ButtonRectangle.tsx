import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
}
export function ButtonRectangle({ title, ...rest }: ButtonProps) {
  return (
    <button
      className="w-full rounded-lg bg-violet-500 p-4 hover:bg-violet-400"
      {...rest}
    >
      {title}
    </button>
  )
}
