import CartProvider from "@/components/cart/CartProvider";
import CartWidget from "@/components/cart/CartWidget";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartWidget />
    </CartProvider>
  );
}
