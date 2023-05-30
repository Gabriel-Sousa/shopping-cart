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
  amount?: number
}

interface ShoppingCartContextData {
  productsInCart: Product[]
  addItemInShoppingCart: (product: Product) => void
  removeItemInShoppingCart: (id: string) => void
  addAmount: (id: string) => void
  removeAmount: (id: string) => void
}

interface ShoppingCartProviderProp {
  children: ReactNode
}
export const ShoppingCartContext = createContext({} as ShoppingCartContextData)

export function ShoppingCartProvider({ children }: ShoppingCartProviderProp) {
  useEffect(() => {
    const storedStateAsJSON = localStorage.getItem('@shopping:cart-state-1.1.0')

    if (storedStateAsJSON) {
      setProductsInCart(JSON.parse(storedStateAsJSON))
    }
  }, [])

  const [productsInCart, setProductsInCart] = useState<Product[]>([])

  function saveLocalStorageProductInCart(products: Product[]) {
    localStorage.setItem('@shopping:cart-state-1.1.0', JSON.stringify(products))
  }

  function addItemInShoppingCart(product: Product) {
    const isProductAlreadyInCart = productsInCart.find(
      (productInCart) => product.id === productInCart.id,
    )
    if (isProductAlreadyInCart) {
      if (
        isProductAlreadyInCart.amount! >= isProductAlreadyInCart.stockAmount
      ) {
        return
      }

      const newProductAmount = productsInCart.map((productInCart) => {
        if (productInCart.id === product.id) {
          return {
            ...productInCart,
            amount: productInCart.amount! + 1,
          }
        }

        return productInCart
      })

      setProductsInCart(() => {
        saveLocalStorageProductInCart(newProductAmount)
        return newProductAmount
      })
      return
    }

    const addAmountProduct = {
      ...product,
      amount: 1,
    }

    setProductsInCart((state) => {
      saveLocalStorageProductInCart([...state, addAmountProduct])
      return [...state, addAmountProduct]
    })
  }

  function removeItemInShoppingCart(id: string) {
    const updatedProductInCart = productsInCart.filter(
      (productInCart) => productInCart.id !== id,
    )

    setProductsInCart(() => {
      saveLocalStorageProductInCart(updatedProductInCart)
      return updatedProductInCart
    })
  }

  function addAmount(id: string) {
    const isProductInCart = productsInCart.find((product) => product.id === id)

    if (isProductInCart) {
      if (isProductInCart.amount! >= isProductInCart.stockAmount) {
        return
      }
    }

    const updatedAmount = productsInCart.map((productInCart) => {
      if (productInCart.id === id) {
        return {
          ...productInCart,
          amount: productInCart.amount! + 1,
        }
      }
      return productInCart
    })

    setProductsInCart(() => {
      saveLocalStorageProductInCart(updatedAmount)
      return updatedAmount
    })
  }

  function removeAmount(id: string) {
    const isProductInCart = productsInCart.find((product) => product.id === id)

    if (isProductInCart) {
      if (isProductInCart.amount! <= 1) {
        return
      }
    }

    const updatedAmount = productsInCart.map((productInCart) => {
      if (productInCart.id === id) {
        return {
          ...productInCart,
          amount: productInCart.amount! - 1,
        }
      }
      return productInCart
    })

    setProductsInCart(() => {
      saveLocalStorageProductInCart(updatedAmount)
      return updatedAmount
    })
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        productsInCart,
        addItemInShoppingCart,
        removeItemInShoppingCart,
        addAmount,
        removeAmount,
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
