'use server';

async function ZarinGateway(payment: any) {
  let params = {
    merchant_id: '5ba5f446-def9-494a-8316-3089bcc5eec1',
    callback_url: 'http://localhost:3000/api/payment/checkout',
    amount: payment.amount,
    description: payment.description,
    email: payment.email,
  };

  const response = await fetch(
    'https://sandbox.zarinpal.com/pg/v4/payment/request.json',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    },
  );
  const result = await response.json();
  const data = result.data;

  return data;
}

async function startPay(cartId: number, amount: number) {
  const res = await fetch('http://localhost:3000/api/payment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cartId, amount }),
  });

  const result = await res.json();
  const data = result.data;
  return data;
}

export { ZarinGateway, startPay };
