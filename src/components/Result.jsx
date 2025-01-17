import React from 'react';
import { useLocation } from 'react-router-dom';

const Result = () => {
  const location = useLocation();
  const clientAnswer = location.state || {};

  return (
    <section className="container">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="center-column col-md-6">
          <section className="result-form">
            <h2>Resultado de pago:</h2>
            <hr/>
            <p><strong>Estado:</strong> {clientAnswer.orderStatus}</p>
            <p><strong>Monto:</strong> {clientAnswer.orderDetails.orderCurrency} {(clientAnswer.orderDetails.orderTotalAmount / 100).toFixed(2)}</p>
            <p><strong>Order-id:</strong> {clientAnswer.orderDetails.orderId}</p>
            <hr/>
            <details open>
              <summary><h2>Respuesta recibida del servidor:</h2></summary>
              <hr/>
              <pre>{JSON.stringify(clientAnswer, null, 2)}</pre>
            </details>
            <hr/>
            <form action="/" method="get">
              <button className="btn btn-primary">Volver a probar</button>
            </form>
          </section>
        </div>
        <div className="col-md-3"></div>
      </div>
    </section>
  );
};

export default Result;
