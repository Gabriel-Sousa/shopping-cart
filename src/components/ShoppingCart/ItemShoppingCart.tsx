'use client'

import Image from 'next/image'
import { priceFormatted } from '@/services/priceFormatted'
import { useShoppingCart } from '@/hooks/useShopppingCart'
import { ButtonSquare } from './ButtonSquare'

type Product = {
  id: string
  title: string
  imageCover: string
  stockAmount: number
  price: number
  amount: number
}

interface ItemShoppingCartProps {
  product: Product
}

export function ItemShoppingCart({ product }: ItemShoppingCartProps) {
  const { addItemShoppingCart, removeItemShoppingCart, deleteProductInCart } =
    useShoppingCart()

  function handleAddAmount() {
    addItemShoppingCart(product)
  }

  function handleRemoveAmount() {
    removeItemShoppingCart(product)
  }

  function handleDelete() {
    deleteProductInCart(product)
  }

  return (
    <li className="mb-12 flex gap-5">
      <Image
        src={product.imageCover}
        className="rounded-lg"
        alt=""
        width={104}
        height={104}
      />
      <div className="flex w-full flex-col gap-3">
        <h2 className="h-12 font-medium leading-6">
          {product.title.substring(0, 40)}
          {product.title.length > 40 && '...'}
        </h2>
        <div className="flex  items-center justify-between">
          <span className="font-bold leading-5">
            {priceFormatted(product.price)}
          </span>
          <div className="flex items-center ">
            <ButtonSquare
              variant="minus"
              currentAmount={product.amount}
              onClick={handleRemoveAmount}
            />
            <span className="w-[46px] text-center font-bold leading-4">
              {product.amount}
            </span>
            <ButtonSquare
              variant="plus"
              currentAmount={product.amount}
              maxAmount={product.stockAmount}
              onClick={handleAddAmount}
            />
            <button className="ml-4" onClick={handleDelete}>
              <Image src={`/assets/trash.svg`} alt="" width={28} height={28} />
            </button>
          </div>
        </div>
      </div>
    </li>
  )
}
