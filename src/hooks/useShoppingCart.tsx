'use client'

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

type Product = {
  id: string
  title: string
  imageCover: string
  stockAmount: number
  price: number
  amount: number
}

interface ShoppingCartContextData {
  productShoppingCart: Product[]
  addItemShoppingCart: (product: Product) => void
  removeItemShoppingCart: (product: Product) => void
  deleteProductInCart: (product: Product) => void
}

interface ShoppingCartProviderProp {
  children: ReactNode
}
export const ShoppingCartContext = createContext({} as ShoppingCartContextData)

export function ShoppingCartProvider({ children }: ShoppingCartProviderProp) {
  useEffect(() => {
    const storedStateAsJSON = localStorage.getItem('@shopping:cart-state-1.0.0')

    if (storedStateAsJSON) {
      setProductShoppingCart(JSON.parse(storedStateAsJSON))
    }
  }, [])

  const [productShoppingCart, setProductShoppingCart] = useState<Product[]>([])

  function addItemShoppingCart(product: Product) {
    const isProductAlreadyInCart = productShoppingCart.filter(
      (productCart) => productCart.id === product.id,
    )

    if (isProductAlreadyInCart.length > 0) {
      if (
        isProductAlreadyInCart[0].amount >=
        isProductAlreadyInCart[0].stockAmount
      ) {
        return
      }
      const listOfProductUpdated = productShoppingCart.map((oldProduct) => {
        if (oldProduct.id === product.id) {
          return {
            ...oldProduct,
            amount: oldProduct.amount + 1,
          }
        }
        return oldProduct
      })

      localStorage.setItem(
        '@shopping:cart-state-1.0.0',
        JSON.stringify(listOfProductUpdated),
      )
      setProductShoppingCart(listOfProductUpdated)
    } else {
      setProductShoppingCart((state) => {
        localStorage.setItem(
          '@shopping:cart-state-1.0.0',
          JSON.stringify([...state, product]),
        )

        return [...state, product]
      })
    }
  }

  function removeItemShoppingCart(product: Product) {
    const productIsInCart = productShoppingCart.filter(
      (productCart) => productCart.id === product.id,
    )

    if (productIsInCart.length > 0) {
      if (productIsInCart[0].amount === 1) {
        return
      }
      const listOfProductUpdated = productShoppingCart.map((oldProduct) => {
        if (oldProduct.id === product.id) {
          return {
            ...oldProduct,
            amount: oldProduct.amount - 1,
          }
        }
        return oldProduct
      })
      localStorage.setItem(
        '@shopping:cart-state-1.0.0',
        JSON.stringify(listOfProductUpdated),
      )
      setProductShoppingCart(listOfProductUpdated)
    }
  }

  function deleteProductInCart(product: Product) {
    const removedProduct = productShoppingCart.filter(
      (oldProduct) => product.id !== oldProduct.id,
    )

    localStorage.setItem(
      '@shopping:cart-state-1.0.0',
      JSON.stringify(removedProduct),
    )
    setProductShoppingCart(removedProduct)
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        productShoppingCart,
        addItemShoppingCart,
        removeItemShoppingCart,
        deleteProductInCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}

export function useShoppingCart(): ShoppingCartContextData {
  const context = useContext(ShoppingCartContext)

  return context
}
