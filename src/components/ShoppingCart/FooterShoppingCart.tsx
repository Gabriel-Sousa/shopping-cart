'use client'
import { useShoppingCart } from '@/hooks/useShoppingCart'
import { priceFormatted } from '@/services/priceFormatted'
import Image from 'next/image'
import { ButtonRectangle } from '../ButtonRectangle'
import { useEffect, useState } from 'react'

export function FooterShoppingCart() {
  const { productShoppingCart } = useShoppingCart()
  const [isInputClicked, setIsInputClicked] = useState(false)
  const [discount, setDiscount] = useState(0)
  const [total, setTotal] = useState(0)
  const [onBlur, setOnBlur] = useState(false)

  useEffect(() => {
    function calculateAllProducts() {
      return productShoppingCart.reduce((acc, product) => {
        return acc + product.price * product.amount
      }, 0)
    }

    const total = calculateAllProducts()

    if (discount) {
      setTotal(total - (total * discount) / 100)
    } else {
      setTotal(total)
    }
  }, [discount, productShoppingCart])

  const coupons = [
    { name: 'FREE', discount: 100 },
    { name: '10%', discount: 10 },
  ]

  function getDiscount(couponInput: HTMLInputElement) {
    const upperCaseCouponInput = couponInput.value.toUpperCase()
    const isCouponValid = coupons.find(
      (coupon) => coupon.name === upperCaseCouponInput,
    )
    if (isCouponValid) {
      setDiscount(isCouponValid.discount)
    }
  }

  return (
    <div className="h-[224px] border-t-2 border-gray-400 p-8">
      <div className="mb-8 flex flex-col gap-4">
        <div className="flex justify-between leading-6">
          <span className="text-xl font-medium">Total:</span>
          <span className="text-xl font-bold">{priceFormatted(total)}</span>
        </div>
        <div className="flex items-center gap-2 self-end text-violet-400">
          <Image src={'/assets/tag.svg'} alt="" width={24} height={24} />
          <div
            className={`relative flex items-center
            ${isInputClicked && 'border-b-2 border-violet-500'}`}
          >
            <input
              placeholder="Adicionar cupom"
              name="cupom"
              className={`w-36 bg-gray-500 p-1 text-left text-gray-200 placeholder:text-violet-400 focus:outline-none 
            `}
              onClick={() => setIsInputClicked(true)}
              onBlur={(e) => {
                e.target.value !== '' && getDiscount(e.target)
                e.target.value !== '' && setOnBlur(true)
              }}
              autoComplete="off"
            />
            {!!onBlur && (
              <button
                onClick={() => {
                  setOnBlur(false)
                  setDiscount(0)
                }}
                className="relative "
              >
                x
              </button>
            )}
          </div>
        </div>
      </div>
      <ButtonRectangle title="Finalizar compra" />
    </div>
  )
}
