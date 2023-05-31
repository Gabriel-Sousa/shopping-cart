'use client'

import Image from 'next/image'

import { priceFormatted } from '@/services/priceFormatted'
import { ButtonRectangle } from '@/components/ButtonRectangle'
import { useShoppingCart } from '@/hooks/useShoppingCart'
import { ShoppingCartModal } from './ShoppingCartModal'
import { ToastContainer } from 'react-toastify'
import { Amount } from '../Amount'

export function ShoppingCart() {
  const products = [
    {
      id: '45eb77d1-768d-4f1a-85ce-172375dec3c4',
      title: 'Cadeira Gamer  RGB - Preta com Iluminação (Led)',
      imageCover: `/assets/product-image-cadeira.jpg`,
      stockAmount: 19,
      price: 49900,
    },
    {
      id: '467a1372-d6d5-4879-8923-ff76bec44ac5',
      title: 'Headset Gamer RGB Preto',
      imageCover: `/assets/product-image-headset.jpg`,
      stockAmount: 10,
      price: 28354,
      amount: 1,
    },
    {
      id: 'fe775c07-ed11-4c96-b134-93fd42303fc1',
      title:
        'Monitor Gamer Curvo 49 DQHD, 240Hz, 1ms, HDMI e DisplayPort, HDR 1000, FreeSync Premium, Ajuste de Altura - LC49G95TSSLXZD',
      imageCover: `/assets/product-image-monitor.jpg`,
      stockAmount: 13,
      price: 135048,
    },
    {
      id: '03ef7514-f6af-4390-9908-6700af1b79e9',
      title: 'Patinho De Borracha Para Banho',
      imageCover: `/assets/product-image-patinho.jpg`,
      stockAmount: 8,
      price: 12598,
    },
    {
      id: '34ebbb11-b5d8-40a0-b614-bf0c1aab70a9',
      title: 'Teclado Gamer Mecânico Low Profile RGB AW510K 580',
      imageCover: `/assets/product-image-teclado.jpg`,
      stockAmount: 7,
      price: 35099,
    },
  ]

  const { addItemInShoppingCart, productsInCart } = useShoppingCart()

  return (
    <>
      <div className="flex items-center justify-center bg-[#09090B] text-gray-200">
        <div className="flex flex-wrap justify-center gap-6 p-6">
          {products.map((product) => {
            const title = product.title.substring(0, 40)
            const withElipse = product.title.length > 40

            const isProductAlreadyInCart = productsInCart.find(
              (productInCart) => productInCart.id === product.id,
            )

            if (isProductAlreadyInCart) {
              if (isProductAlreadyInCart.amount! >= 1) {
                return (
                  <div
                    key={product.id}
                    className="flex w-[240px] flex-col gap-4 rounded-lg bg-gray-500 p-4"
                  >
                    <Image
                      src={product.imageCover}
                      alt=""
                      width={256}
                      height={256}
                      className="rounded-lg"
                    />
                    <h2 title={product.title} className="h-[48px]">
                      {title}
                      <span>{withElipse && '...'}</span>
                    </h2>
                    <div className="text-xl font-bold leading-6">
                      {priceFormatted(product.price)}
                    </div>
                    <div className=" flex h-[56px] justify-start">
                      <Amount product={isProductAlreadyInCart} />
                    </div>
                  </div>
                )
              }
            }

            return (
              <div
                key={product.id}
                className="flex w-[240px] flex-col gap-4 rounded-lg bg-gray-500 p-4"
              >
                <Image
                  src={product.imageCover}
                  alt=""
                  width={256}
                  height={256}
                  className="rounded-lg"
                />
                <h2 title={product.title} className="h-[48px]">
                  {title}
                  <span>{withElipse && '...'}</span>
                </h2>
                <div className="text-xl font-bold leading-6">
                  {priceFormatted(product.price)}
                </div>

                <ButtonRectangle
                  title="Adicionar ao carrinho"
                  onClick={() => addItemInShoppingCart(product)}
                />
              </div>
            )
          })}
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        limit={2}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <ShoppingCartModal />
    </>
  )
}
