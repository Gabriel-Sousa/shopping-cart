'use client'
import { useShoppingCart } from '@/hooks/useShopppingCart'
import { ItemShoppingCart } from './ItemShoppingCart'

export function ListShoppingCart() {
  const { productShoppingCart } = useShoppingCart()
  return (
    <ul className="shoppingCartScroll h-[681px] overflow-y-auto p-8">
      {productShoppingCart.map((product) => (
        <ItemShoppingCart key={product.id} product={product} />
      ))}
    </ul>
  )
}
