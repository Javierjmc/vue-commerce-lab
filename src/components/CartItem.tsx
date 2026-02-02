import { CartItem as CartItemType } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Minus, Plus } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useEffect, useState } from "react";

interface CartItemProps {
  item: CartItemType;
  onRemove: (id:string) => void;
}

const CartItem = ({ item, onRemove }: CartItemProps) => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [quantity, setQuantity] = useState(item.quantity);

  console.log( item )

  useEffect(() => {
    const tempQuantity = cart.find(cartItem => cartItem.id === item.id)?.quantity;
    console.log("Saved quantity:", tempQuantity);
    setQuantity(tempQuantity || 0);
  }, [cart]);

  const handleQuantityChange = (newQuantity: number) => {
    console.log("Requested quantity change to:", newQuantity, item.stock);
    if (newQuantity > 0 && newQuantity <= item.stock) {
      updateQuantity(item.id.toString(), newQuantity);
    }
  };

  return (
    <div className="flex gap-4 rounded-lg border border-border bg-card p-4 animate-fade-in">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-muted">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-muted-foreground">{item.category}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemove(item.id.toString())}
              className="text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => {
                const newValue = e.target.value;
                if (newValue === "") return; // Permite que el usuario borre pero no envia cambios
                const parsedValue = parseInt(newValue, 10);
                if (!isNaN(parsedValue)) {
                  handleQuantityChange(parsedValue);
                }
              }}
              onBlur={(e) => {
                // Si queda vacío al salir del input, resetea al valor anterior
                if (e.target.value === "") {
                  handleQuantityChange(quantity);
                }
              }}
              className="h-8 w-16 text-center"
              min="1"
              max={item.stock}
            />
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= item.stock}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <div className="text-right">
            <p className="text-lg font-bold text-primary">
              €{(item.price * quantity).toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground">
              €{item?.price?.toFixed(2)} c/u
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
