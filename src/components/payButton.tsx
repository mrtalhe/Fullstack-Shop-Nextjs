'use client';
import { Button } from './ui';
import { startPay } from '../../server/payment';



export default function PayButton({
  cartId,
  amount,
}: {
  cartId: number;
  amount: number;
}) {

  
  const handlePay = async () => {

    const result = await startPay(cartId, amount);

    return window.location.href = `https://sandbox.zarinpal.com/pg/StartPay/${result}`
  };

  return (
    <Button
      onClick={handlePay}
      className=" px-64 bg-green-500 hover:bg-white hover:text-green-600 hover:border-green-600 hover:border-2 text-white px-4 py-2 rounded "
    >
      Pay
    </Button>
  );
}
