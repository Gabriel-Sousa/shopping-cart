'use client'
import { useShoppingCart } from '@/hooks/useShoppingCart'
import { ItemShoppingCart } from './ItemShoppingCart'

export function ListShoppingCart() {
  const { productsInCart } = useShoppingCart()
  return (
    <ul className="shoppingCartScroll h-[70vh] overflow-y-auto p-8 max-sm:p-4 ">
      {productsInCart.map((product) => (
        <ItemShoppingCart key={product.id} product={product} />
      ))}
    </ul>
  )
}
