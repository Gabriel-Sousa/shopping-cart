'use client'
import { useShoppingCart } from '@/hooks/useShoppingCart'
import { ItemShoppingCart } from './ItemShoppingCart'

export function ListShoppingCart() {
  const { productsInCart } = useShoppingCart()
  return (
    <ul className="shoppingCartScroll h-[681px] overflow-y-auto p-8">
      {productsInCart.map((product) => (
        <ItemShoppingCart key={product.id} product={product} />
      ))}
    </ul>
  )
}
