export default function CartSummary({
  totalItems,
  totalPrice,
}: {
  totalItems: number;
  totalPrice: number;
}) {
  return (
    <div className="w-full md:w-72 border rounded-lg p-4 space-y-4">
      <div>
        <div className="text-sm text-gray-500">Total Product</div>
        <div className="flex justify-between font-medium">
          <span>Total Products in cart: ({totalItems})</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <hr />

      <div className="flex justify-between text-lg font-bold">
        <span>Subtotal</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>

      <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded">
        Checkout
      </button>
    </div>
  );
}
