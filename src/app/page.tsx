import { ShoppingCart } from '@/components/ShoppingCart/ShoppingCart'
import { ShoppingCartProvider } from '@/hooks/useShoppingCart'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

export default function Home() {
  return (
    <ShoppingCartProvider>
      <ShoppingCart />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        limit={5}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </ShoppingCartProvider>
  )
}
