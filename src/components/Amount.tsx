'use client'

import Image from 'next/image'

import { useShoppingCart } from '@/hooks/useShoppingCart'
import { ButtonSquare } from './ShoppingCart/ButtonSquare'

type Product = {
  id: string
  title: string
  imageCover: string
  stockAmount: number
  price: number
  amount?: number
}

interface AmountProps {
  product: Product
}

export function Amount({ product }: AmountProps) {
  const { addAmount, removeAmount, removeItemInShoppingCart } =
    useShoppingCart()

  function handleAddAmount() {
    addAmount(product.id)
  }

  function handleRemoveAmount() {
    removeAmount(product.id)
  }

  function handleDelete() {
    removeItemInShoppingCart(product.id)
  }
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center">
        <ButtonSquare
          variant="minus"
          currentAmount={product.amount}
          onClick={handleRemoveAmount}
        />
        <span className="w-[46px] text-center font-bold leading-4 max-sm:w-[28px] sm:text-base">
          {product.amount}
        </span>
        <ButtonSquare
          variant="plus"
          currentAmount={product.amount}
          maxAmount={product.stockAmount}
          onClick={handleAddAmount}
        />
      </div>

      <button className="ml-4 max-sm:ml-1" onClick={handleDelete}>
        <Image src={`/assets/trash.svg`} alt="" width={28} height={28} />
      </button>
    </div>
  )
}
