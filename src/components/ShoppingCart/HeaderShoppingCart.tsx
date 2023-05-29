'use client'

import { useShoppingCart } from '@/hooks/useShoppingCart'
import Image from 'next/image'

interface HeaderShoppingCartProps {
  onCloseModal: () => void
}

export function HeaderShoppingCart({ onCloseModal }: HeaderShoppingCartProps) {
  const { productShoppingCart } = useShoppingCart()
  return (
    <div className="flex h-[72px] items-center justify-between border-b-2 border-gray-400 px-8">
      <span className="text-xl font-medium text-gray-100">
        Seu carrinho tem
        <span className="font-semibold text-gray-200">
          {' '}
          {productShoppingCart.length}
          {productShoppingCart.length <= 1 ? ' item' : ' itens'}
        </span>
      </span>

      <span className="cursor-pointer hover:opacity-90">
        <button onClick={onCloseModal}>
          <Image src="/assets/close.svg" alt="close" width={24} height={24} />
        </button>
      </span>
    </div>
  )
}
