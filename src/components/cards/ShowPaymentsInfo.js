import React from 'react';

const ShowPaymentsInfo = ({ order, showStatus = true }) => {
  return (
    <div className='mb-3'>
      Тут должны были выводиться данные но поломалась модель и как то похуй и нет сил ее чинить
      {/*<p>*/}
      {/*  <span>Order ID: {order?.paymentIntent?.id}</span> <br/>*/}
      {/*  <span>Amount: {(order?.paymentIntent?.amount / 100).toLocaleString('en-US', {*/}
      {/*    style: 'currency',*/}
      {/*    currency: 'USD'*/}
      {/*  })}</span><br/>*/}
      {/*  <span>Currency: {order?.paymentIntent?.currency?.toUpperCase()}</span> <br/>*/}
      {/*  /!*<span>Method: {order?.paymentIntent?.payment_method_types[0]}</span> <br/>*!/*/}
      {/*  <span>Payment: {order?.paymentIntent?.status?.toUpperCase()}</span> <br/>*/}
      {/*  <span>Ordered on: {new Date(order?.paymentIntent?.created * 1000).toLocaleString()}</span> <br/>*/}
      {/*  <span>Status: {order.orderStatus}</span> <br/>*/}
      {/*</p>*/}
    </div>
  )
}

export default ShowPaymentsInfo;

