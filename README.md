# Embedded Payment Form React

Esta página explica cómo crear un formulario de pago dinámico desde cero utilizando React y la biblioteca de embedded-form-glue.

<a name="Requisitos_Previos"></a>

## Requisitos Previos

* Claves de autentificación. [Guía Aquí](https://github.com/izipay-pe/obtener-credenciales-de-conexion)
* Debe instalar la [versión de LTS node.js](https://nodejs.org/es/).

## 1.- Crear el proyecto
* Descargar el proyecto .zip haciendo click [Aquí](https://github.com/izipay-pe/Embedded-PaymentForm-T1-React/archive/refs/heads/main.zip) o clonarlo desde Git.
```sh
git clone https://github.com/izipay-pe/Embedded-PaymentForm-T1-React.git
``` 

* Ingrese a la carpeta raiz del proyecto.

* Agregue la dependencia **embedded-form-glue** o instale todas las dependencias que necesita el proyecto:

```sh
npm install --save @lyracom/embedded-form-glue
ó
npm install
```

* Ejecútelo y pruébelo:
```sh
npm start
```

ver el resultado en http://localhost:3000/

## 2.- Agregar el formulario de pago
**Nota**: Reemplace **[CHANGE_ME]** con sus credenciales de `API REST` extraídas desde el Back Office Vendedor, ver [Requisitos Previos](#Requisitos_Previos).

* Editar en `public/index.html` en la sección HEAD.

```javascript
<!-- tema y plugins. debe cargarse en la sección HEAD -->
<link rel="stylesheet"
href="~~CHANGE_ME_ENDPOINT~~/static/js/krypton-client/V4.0/ext/classic-reset.css">
<script
    src="~~CHANGE_ME_ENDPOINT~~/static/js/krypton-client/V4.0/ext/classic.js">
</script>
```

* Edite el componente predeterminado `src/App.js`, con el siguiente codigo si quiere interactuar con el formulario de pago, con un endpoint propio.

```js
import { useState } from 'react';
import KRGlue from '@lyracom/embedded-form-glue';
import axios from 'axios';
import PaymentForm from './components/PaymentForm';

function App() {

  const [isShow, setIsShow] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [amount, setAmount] = useState("");

  const publicKey = "~~CHANGE_ME_ENDPOINT~~";
  const endPoint = "~~CHANGE_ME_ENDPOINT~~";
  const formToken = "~~CHANGE_ME_ENDPOINT~~";
  const server = "http://localhost:3000";
  
  const payment = ()=>{...}

  const getFormToken = (monto, publicKey, domain) => {
    const dataPayment = {
        amount: monto*100,
        currency: "USD",
        customer:{
          email: "example@gmail.com"
        },
        orderId: "pedido-0"
    }
    KRGlue.loadLibrary(domain,publicKey)
    .then(({KR}) => KR.setFormConfig({
    formToken: formToken
    }))
    .then(({ KR }) => KR.onSubmit(validatePayment) )
    .then(({ KR }) => KR.attachForm("#form") )
    .then(({ KR, result }) => KR.showForm(result.formId))
    .catch(err=>console.log(err))

  }
  
  const validatePayment = (resp) => {...}

  return (
    <div className='container'>
        <main>
            <div className="py-5 text-center">      
                ...   
            </div>

            <div className="row g-5">
                <div className="col-md-5 col-lg-4 order-md-last">
                    <div className="d-flex justify-content-center">
                        <div id="myDIV" className="formulario" style={{display: isShow?"block":"none" }}>
                            <div id="form">
                                <PaymentForm />
                            </div> 
                        </div>                         
                    </div>                    
                    <hr className="my-4"/>
                </div>

                <div className="col-md-7 col-lg-8">          
                    <form className="needs-validation">
                        ...   
                        <button onClick={payment} className="w-100 btn btn-primary btn-lg" type="button">Finalizar con el Pago</button>
                    </form>
                </div>
            </div>
        </main>
    </div>
  );
}
export default App;
```

## 3.- Transacción de prueba

El formulario de pago está listo, puede intentar realizar una transacción utilizando una tarjeta de prueba con la barra de herramientas de depuración (en la parte inferior de la página).

Si intenta pagar, tendrá el siguiente error: **CLIENT_998: Demo form, see the documentation**.
Es porque el **formToken** que ha definido usando **KR.setFormConfig** está configurado en **DEMO-TOKEN-TO-BE-REPLACED**.

you have to create a **formToken** before displaying the payment form using Charge/CreatePayment web-service.
For more information, please take a look to:

- [Formulario incrustado: prueba rápida](https://secure.micuentaweb.pe/doc/es-PE/rest/V4.0/javascript/quick_start_js.html)
- [Primeros pasos: pago simple](https://secure.micuentaweb.pe/doc/es-PE/rest/V4.0/javascript/guide/start.html)
- [Servicios web - referencia de la API REST](https://secure.micuentaweb.pe/doc/es-PE/rest/V4.0/api/reference.html)

* El formulario de pago está listo, puede intentar realizar una transacción utilizando una tarjeta de prueba con la barra de herramientas de depuración (en la parte inferior de la página).

  ![debug](https://github.com/izipay-pe/Embedded-PaymentForm-T1.Net/blob/main/images/tarjetasprueba2.png)

## 4.- Verificación de hash de pago

El hash de pago debe validarse en el lado del servidor para evitar la exposición de su clave hash personal.

En el lado del servidor:

```js
const express = require('express')
const hmacSHA256 = require('crypto-js/hmac-sha256')
const Hex = require('crypto-js/enc-hex')
const app = express()
(...)
// válida los datos de pago dados (hash)
app.post('/validatePayment', (req, res) => {
  const answer = req.body.clientAnswer
  const hash = req.body.hash
  const answerHash = Hex.stringify(
    hmacSHA256(JSON.stringify(answer), 'CHANGE_ME: HMAC SHA256 KEY')
  )
  if (hash === answerHash) res.status(200).send('Valid payment')
  else res.status(500).send('Payment hash mismatch')
})
(...)
```

Del lado del cliente:

```js
import { useState } from 'react';
import KRGlue from '@lyracom/embedded-form-glue';
import axios from 'axios';
import PaymentForm from './components/PaymentForm';

function App() {

  const [isShow, setIsShow] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [amount, setAmount] = useState("");

  const publicKey = "~~CHANGE_ME_ENDPOINT~~";
  const endPoint = "~~CHANGE_ME_ENDPOINT~~";
  const formToken = "~~CHANGE_ME_ENDPOINT~~";
  const server = "http://localhost:3000";
  
  const payment = ()=>{...}
  const getFormToken = (monto, publicKey, domain) => {
    const dataPayment = {
        amount: monto*100,
        currency: "USD",
        customer:{
          email: "example@gmail.com"
        },
        orderId: "pedido-0"
    }
    KRGlue.loadLibrary(domain,publicKey)
    .then(({KR}) => KR.setFormConfig({
    formToken: formToken
    }))
    .then(({ KR }) => KR.onSubmit(validatePayment) )
    .then(({ KR }) => KR.attachForm("#form") )
    .then(({ KR, result }) => KR.showForm(result.formId))
    .catch(err=>console.log(err))

  }

  const validatePayment = (resp) => {
        axios.post(`${server}/validatePayment`, resp)
    .then(({data}) => {
      if (data==="Valid Payment"){
        setIsShow(false);
        alert("Pago Satisfactorio");
        
      }else{
        alert("Pago Inválido");
      }
    })
    return false;
  }
(...)
```

## 5.- Implementar IPN

* Ver manual de implementacion de la IPN [Aquí](https://secure.micuentaweb.pe/doc/es-PE/rest/V4.0/kb/payment_done.html)

* Ver el ejemplo de la respuesta IPN con PHP [Aquí](https://github.com/izipay-pe/Redirect-PaymentForm-IpnT1-PHP)

* Ver el ejemplo de la respuesta IPN con NODE.JS [Aquí](https://github.com/izipay-pe/Response-PaymentFormT1-Ipn)