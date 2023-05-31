'use client'

import { FooterShoppingCart } from '@/components/ShoppingCart/FooterShoppingCart'
import { HeaderShoppingCart } from '@/components/ShoppingCart/HeaderShoppingCart'
import { ListShoppingCart } from '@/components/ShoppingCart/ListShoppingCart'
import { useState } from 'react'

export function ShoppingCart() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  function changeStateModal() {
    setIsModalOpen((state) => !state)
  }

  return (
    <div
      className={`fixed right-0 top-0 flex h-screen items-center justify-center text-gray-200
       ${isModalOpen ? 'open translate-x-0' : 'close translate-x-[93%] '}
`}
    >
      <button
        onClick={changeStateModal}
        className="relative h-8 w-8 translate-x-4 rotate-45 bg-[#414146]"
      />
      <div className="relative flex h-screen w-[356px] flex-col bg-gray-500 sm:w-[480px]">
        <HeaderShoppingCart onCloseModal={changeStateModal} />
        <ListShoppingCart />
        <FooterShoppingCart />
      </div>
    </div>
  )
}
