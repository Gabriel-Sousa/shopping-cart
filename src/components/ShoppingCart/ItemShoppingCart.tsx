'use client'

import Image from 'next/image'
import { priceFormatted } from '@/services/priceFormatted'
import { useShoppingCart } from '@/hooks/useShoppingCart'
import { ButtonSquare } from './ButtonSquare'

type Product = {
  id: string
  title: string
  imageCover: string
  stockAmount: number
  price: number
  amount?: number
}

interface ItemShoppingCartProps {
  product: Product
}

export function ItemShoppingCart({ product }: ItemShoppingCartProps) {
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
    <li className="mb-12 flex  gap-5">
      <Image
        src={product.imageCover}
        className="h-[104px] w-[104px] rounded-lg max-sm:h-[80px] max-sm:w-[80px]"
        alt=""
        width={104}
        height={104}
      />
      <div className="flex w-full flex-col gap-3">
        <h2 className="h-12 font-medium leading-6 max-sm:text-sm">
          {product.title.substring(0, 40)}
          {product.title.length > 40 && '...'}
        </h2>
        <div className="flex  items-center justify-between">
          <span className="text-sm font-bold leading-5 sm:text-base ">
            {priceFormatted(product.price)}
          </span>
          <div className="flex items-center">
            <ButtonSquare
              variant="minus"
              currentAmount={product.amount}
              onClick={handleRemoveAmount}
            />
            <span className="w-[46px] text-center font-bold leading-4 max-sm:w-[35px] sm:text-base">
              {product.amount}
            </span>
            <ButtonSquare
              variant="plus"
              currentAmount={product.amount}
              maxAmount={product.stockAmount}
              onClick={handleAddAmount}
            />
            <button className="ml-4 max-sm:ml-1" onClick={handleDelete}>
              <Image src={`/assets/trash.svg`} alt="" width={28} height={28} />
            </button>
          </div>
        </div>
      </div>
    </li>
  )
}
