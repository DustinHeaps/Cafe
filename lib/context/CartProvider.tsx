import {
  useState,
  useEffect,
  createContext,
  useContext,
  useMemo,
  useCallback,
  Dispatch,
  SetStateAction
} from 'react'
import {
  getCart,
  addToCart,
  removeFromCart,
  updateProductQuantity
} from '@/lib/swell/cart'
import { Cart } from 'swell-js'
import { AddToCartInput } from '../types'

const CartContext = createContext<{
  cart: Cart | null
  error: Error | null
  loading: boolean
  showShoppingCart: boolean
  addItem: (productData: AddToCartInput) => void
  removeItem: (itemId: string) => void
  updateItem: (itemId: string, quantity: number) => void
  updateCart: (cart?: Cart) => void
  setShowShoppingCart: Dispatch<SetStateAction<boolean>>
}>({
  cart: null,
  error: null,
  loading: false,
  showShoppingCart: false,
  addItem: () => {},
  removeItem: () => {},
  updateItem: () => {},
  updateCart: () => {},
  setShowShoppingCart: () => {}
})
export const useCart = () => useContext(CartContext)

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Cart | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)
  const [showShoppingCart, setShowShoppingCart] = useState(false)

  useEffect(() => {
    setLoading(true)
    getCart()
      .then(cart => setCart(cart))
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  const addItem = useCallback((productData: AddToCartInput) => {
    setLoading(true)
    addToCart(productData)
      .then(setCart)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  const removeItem = useCallback((itemId: string) => {
    setLoading(true)
    removeFromCart(itemId)
      .then(setCart)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  const updateItem = useCallback((itemId: string, quantity: number) => {
    setLoading(true)
    updateProductQuantity(itemId, quantity)
      .then(setCart)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  const updateCart = useCallback((cart?: Cart) => {
    if (cart) {
      setCart(cart)
      return
    }
    setLoading(true)
    getCart()
      .then(setCart)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  const value = useMemo(
    () => ({
      cart,
      error,
      loading,
      showShoppingCart,
      addItem,
      removeItem,
      updateCart,
      setShowShoppingCart,
      updateItem
    }),
    [
      cart,
      error,
      loading,
      showShoppingCart,
      addItem,
      removeItem,
      updateCart,
      setShowShoppingCart,
      updateItem
    ]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartProvider
