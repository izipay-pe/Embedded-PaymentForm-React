import {  useState } from 'react';
import KRGlue from "@lyracom/embedded-form-glue";
import axios from "axios";
import './App.css';
import { IzipayFormEmbedded } from './components/payment-form/IzipayFormEmbedded';
import { IziProduct } from './components/izi-product/IziProduct';
import { SoporteEcoomerce } from './components/support-contact/SoporteEcoomerce';
import { Checkout } from './components/checkout/Checkout';

const data = [
  {id: 1, name: "izi Jr", price: 90,url: "https://www.izipay.pe/_nuxt/dist/img/izi-jr-large.1272137.png"},
  {id: 2, name: "izi android", price: 100,url: "https://www.izipay.pe/_nuxt/dist/img/izi-android-large.15bbbeb.png"},
  {id: 3, name: "Gestiona tu negocio", price: 250,url: "https://www.izipay.pe/_nuxt/dist/img/img-pos.8c27182.png"},
  {id: 4, name: "Agente Izipay", price: 200,url: "https://www.izipay.pe/_nuxt/dist/img/agente-izipay-large.74b5825.png"},
]

const publicKey = "44842422:testpublickey_Az8ibtrm5cAhb3aOt1g20oQtgpR14c9TSdPYSVhqFlj2P";
const endPoint = "https://api.micuentaweb.pe";

function App() {

  const [view, setView] = useState(0);
  const [addProduct, setAddProduct] = useState({});

  const createPayment = (objJson) => new Promise((resolve, reject) => {

    axios.post("http://localhost:80/000webhost/proyecto-izipay/api/CreatePayment.php",objJson)
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

  const addToCart = (product)=>{
    setAddProduct(product)
    setView(1);
  }

  const checkoutPayment = (dataCheckout) => {
    setView(2);
    console.log(dataCheckout)

    createPayment(dataCheckout)
    .then(res=>{
      console.log("form loaded",res)
    })
    .catch(error => console.log(error))
  }

  const routes = (route) => {
    switch(route){
      case 0:
        return (
          <div className='List-Product'>
            {
              data.map(item => <IziProduct product={item} key={item.id} buy={addToCart} />)
            }
          </div>
        );
      case 1:
        // return(<IzipayFormEmbedded/>);
        return<Checkout addProduct={addProduct} checkoutPayment={checkoutPayment}/>;
      case 2:
        return <IzipayFormEmbedded/>
      default:
        setView(0);
      break;
    }
  }

  return (<>
    <div className="App">
      <h2>Pasarela de pago <img src='https://iziweb001.s3.amazonaws.com/webresources/img/logo.png' alt='Logo de Izipay'/></h2>
      {
        routes(view)
      }
    </div>
    <SoporteEcoomerce />
    
  </>);
}

export default App;
