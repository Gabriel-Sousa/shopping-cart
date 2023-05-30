'use client'
import { useShoppingCart } from '@/hooks/useShoppingCart'
import { priceFormatted } from '@/services/priceFormatted'
import Image from 'next/image'
import { ButtonRectangle } from '../ButtonRectangle'
import { KeyboardEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export function FooterShoppingCart() {
  const { productsInCart } = useShoppingCart()
  const [isInputClicked, setIsInputClicked] = useState(false)
  const [inputDiscount, setInputDiscount] = useState('')
  const [discount, setDiscount] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    function calculateAllProducts() {
      return productsInCart.reduce((acc, product) => {
        return acc + product.price * product.amount!
      }, 0)
    }

    const total = calculateAllProducts()
    if (discount) {
      setTotal(total - (total * discount) / 100)
    } else {
      setTotal(total)
    }
  }, [discount, productsInCart])

  const coupons = [
    { name: 'FREE', discount: 100 },
    { name: '10%', discount: 10 },
    { name: '50%', discount: 50 },
    { name: '55%', discount: 55 },
    { name: '75%', discount: 75 },
    { name: '90%', discount: 90 },
  ]

  function getDiscount() {
    const upperCaseCouponInput = inputDiscount.toUpperCase()
    const isCouponValid = coupons.find(
      (coupon) => coupon.name === upperCaseCouponInput,
    )

    if (isCouponValid) {
      setDiscount(isCouponValid.discount)
      toast.success('Desconto aplicado!')
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === 'Enter') {
      getDiscount()
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
              className={`w-36 bg-gray-500 p-1 text-left text-gray-200 placeholder:text-violet-400 focus:outline-none 
            `}
              placeholder="Adicionar cupom"
              name="cupom"
              disabled={!!discount}
              value={inputDiscount}
              onChange={(e) => setInputDiscount(e.target.value)}
              onClick={() => setIsInputClicked(true)}
              onBlur={() => {
                inputDiscount.length >= 3 && getDiscount()
              }}
              onKeyDown={handleKeyDown}
              autoComplete="off"
            />
            {!!inputDiscount && (
              <button
                onClick={() => {
                  setInputDiscount('')
                  setDiscount(0)
                  toast.error('Desconto removido.')
                }}
                className="relative"
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
