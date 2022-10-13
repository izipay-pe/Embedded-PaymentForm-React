# Popin Payment Form React

Esta página explica cómo crear un formulario de pago dinámico desde cero utilizando React y la biblioteca de embedded-form-glue.

<a name="Requisitos_Previos"></a>

## Requisitos Previos

* Extraer credenciales del Back Office Vendedor. [Guía Aquí](https://github.com/izipay-pe/obtener-credenciales-de-conexion)
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

* Editar en public/index.html en la sección HEAD.

```javascript
<!-- tema y plugins. debe cargarse en la sección HEAD -->
<link rel="stylesheet"
href="~~CHANGE_ME_ENDPOINT~~/static/js/krypton-client/V4.0/ext/classic-reset.css">
<script
    src="~~CHANGE_ME_ENDPOINT~~/static/js/krypton-client/V4.0/ext/classic.js">
</script>
```

* Edite el componente predeterminado src/App.js, con el siguiente codigo si quiere interactuar con el formulario de pago, con un endpoint propio.

```js
import {  useState } from 'react';
import KRGlue from "@lyracom/embedded-form-glue";
import axios from "axios";
import './App.css';
import { ... } from '...';

const data = [...]
// Clave pública de test o producción.
const publicKey = "~~CHANGE_ME_PUBLIC_KEY~~";
// Url de servidor de Izipay
const endPoint = "~~CHANGE_ME_ENDPOINT~~";
// Url de tu servidor
const server = "https://yourserver.com/"

function App() {

  const [view, setView] = useState(0);
  const [addProduct, setAddProduct] = useState({});

  const createPayment = (objJson) => new Promise((resolve, reject) => {
    axios.post(server+"CreatePayment.php",objJson)
      .then(({data}) => {
          console.log(data);
          return KRGlue.loadLibrary(endPoint, publicKey, data.formToken);
      })
      .then(({KR}) => KR.setFormConfig({
          'kr-language': 'es-ES',
      }))
      .then(({KR}) => KR.attachForm("#myPaymentForm"))
      .then(({KR, result}) => {
        
        resolve(KR.showForm(result.formId))
      })
      .catch(error=> reject(error))
  })

  const addToCart = () => {...}

  const checkoutPayment = (dataCheckout) => {
    setView(2);
    console.log(dataCheckout)

    createPayment(dataCheckout)
    .then(res=>{
      console.log("form loaded",res)
    })
    .catch(error => console.log(error))
  }
  const routes = (route) => {...}
  return (<>
    <div className="App">
      ...  
      {
        routes(view)
      }
    </div>
    <SoporteEcoomerce />
  </>);
}
export default App;
```

## 3.- Implementar IPN

* Ver manual de implementacion de la IPN [Aquí](https://secure.micuentaweb.pe/doc/es-PE/rest/V4.0/kb/payment_done.html)

* Ver el ejemplo de la respuesta IPN [Aquí](https://github.com/izipay-pe/Redirect-PaymentForm-IpnT1-PHP)
