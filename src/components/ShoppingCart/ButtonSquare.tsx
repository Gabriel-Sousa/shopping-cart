'use client'

import { ButtonHTMLAttributes, useState } from 'react'
import Image from 'next/image'

interface TypeButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'plus' | 'minus'
  currentAmount: number | undefined
  maxAmount?: number
}

export function ButtonSquare({
  variant,
  currentAmount,
  maxAmount = 2,
  ...rest
}: TypeButton) {
  const [isHovered, setIsHovered] = useState(false)

  function handleMouseEnter() {
    const subtractBoolean = currentAmount === 1 && variant === 'minus'
    !subtractBoolean && setIsHovered(true)
  }

  function handleMouseLeave() {
    setIsHovered(false)
  }
  return (
    <button
      className={`rounded-lg border-2 p-2 transition-all
      max-sm:p-2 

      ${
        variant === 'minus'
          ? currentAmount === 1
            ? 'cursor-not-allowed border-gray-400'
            : 'border-violet-400 hover:bg-violet-400'
          : ''
      }

        ${
          variant === 'plus'
            ? currentAmount === maxAmount
              ? 'cursor-not-allowed border-gray-400 '
              : 'border-violet-400 hover:bg-violet-400'
            : ''
        }
      
        `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {isHovered ? (
        <Image
          src={`/assets/${variant}White.svg`}
          alt=""
          width={18}
          height={18}
        />
      ) : (
        <Image src={`/assets/${variant}.svg`} alt="" width={18} height={18} />
      )}
    </button>
  )
}
