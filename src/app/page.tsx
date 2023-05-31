import { ShoppingCart } from '@/components/ShoppingCart/ShoppingCart'
import { ShoppingCartProvider } from '@/hooks/useShoppingCart'

import 'react-toastify/dist/ReactToastify.css'

export default function Home() {
  return (
    <ShoppingCartProvider>
      <ShoppingCart />
    </ShoppingCartProvider>
  )
}
