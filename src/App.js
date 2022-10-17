import { useState } from 'react';
import KRGlue from '@lyracom/embedded-form-glue';
import axios from 'axios';
import PaymentForm from './components/PaymentForm';

function App() {

  const [isShow, setIsShow] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const publicKey = "44842422:testpublickey_Az8ibtrm5cAhb3aOt1g20oQtgpR14c9TSdPYSVhqFlj2P";
  const endPoint = "https://api.micuentaweb.pe";
  const formToken = "26Xtd4-qSkRlCX-VrlEbUVKA22AeyJhbW91bnQiOjE4MCwiY3VycmVuY3kiOiJQRU4iLCJtb2RlIjoiVEVTVCIsInZlcnNpb24iOjMsIm9yZGVySWQiOiJteU9yZGVySWQtMTM1NDQwIiwic2hvcE5hbWUiOiJQcnVlYmFzIEFQSSBSRVNUIiwicmlza0FuYWx5c2VyIjp7ImZpbmdlclByaW50c0lkIjoiZTE4YWMxNzYtMzdiZC00MjA4LWJiM2EtYWM1YTRhMmM1MzY0IiwianNVcmwiOiJodHRwczovL3NlY3VyZS5taWN1ZW50YXdlYi5wZS90cmFzL2FuYWx5emVyL3B1YmxpYy92MS9jaGVja2VyL2UxOGFjMTc2LTM3YmQtNDIwOC1iYjNhLWFjNWE0YTJjNTM2NCJ9LCJjYXRlZ29yaWVzIjp7ImRlYml0Q3JlZGl0Q2FyZHMiOnsiYXBwSWQiOiJjYXJkcyIsInBhcmFtIjpbIk1BRVNUUk8iLCJBTUVYIiwiTUFTVEVSQ0FSRF9ERUJJVCIsIk1BU1RFUkNBUkQiLCJNQ19DT1JET0JFU0EiLCJWSVNBIiwiVklTQV9FTEVDVFJPTiIsIlZJU0FfREVCSVQiLCJESU5FUlMiXX19LCJjYXJkcyI6eyJBTUVYIjp7ImZpZWxkcyI6eyJzZWN1cml0eUNvZGUiOnsibWF4TGVuZ3RoIjo0fSwiaW5zdGFsbG1lbnROdW1iZXIiOnsidmFsdWUiOiItMSIsInZhbHVlcyI6eyItMSI6IjE6Ojo6OjE4MCIsIkRZTkFNSUMiOiI6Ojo6OiJ9LCJyZXF1aXJlZCI6dHJ1ZSwic2Vuc2l0aXZlIjpmYWxzZSwiaGlkZGVuIjpmYWxzZSwiY2xlYXJPbkVycm9yIjpmYWxzZX0sImZpcnN0SW5zdGFsbG1lbnREZWxheSI6eyJ2YWx1ZSI6IjAiLCJ2YWx1ZXMiOnsiMCI6IjAiLCJEWU5BTUlDIjoiRFlOQU1JQyJ9LCJyZXF1aXJlZCI6dHJ1ZSwic2Vuc2l0aXZlIjpmYWxzZSwiaGlkZGVuIjpmYWxzZSwiY2xlYXJPbkVycm9yIjpmYWxzZX19LCJjb3B5RnJvbSI6ImNhcmRzLkRFRkFVTFQifSwiTUFFU1RSTyI6eyJjb3B5RnJvbSI6ImNhcmRzLkRFRkFVTFQifSwiTUFTVEVSQ0FSRF9ERUJJVCI6eyJmaWVsZHMiOnsiaW5zdGFsbG1lbnROdW1iZXIiOnsidmFsdWUiOiItMSIsInZhbHVlcyI6eyItMSI6IjE6Ojo6OjE4MCIsIkRZTkFNSUMiOiI6Ojo6OiJ9LCJyZXF1aXJlZCI6dHJ1ZSwic2Vuc2l0aXZlIjpmYWxzZSwiaGlkZGVuIjpmYWxzZSwiY2xlYXJPbkVycm9yIjpmYWxzZX0sImZpcnN0SW5zdGFsbG1lbnREZWxheSI6eyJ2YWx1ZSI6IjAiLCJ2YWx1ZXMiOnsiMCI6IjAiLCJEWU5BTUlDIjoiRFlOQU1JQyJ9LCJyZXF1aXJlZCI6dHJ1ZSwic2Vuc2l0aXZlIjpmYWxzZSwiaGlkZGVuIjpmYWxzZSwiY2xlYXJPbkVycm9yIjpmYWxzZX19LCJjb3B5RnJvbSI6ImNhcmRzLkRFRkFVTFQifSwiTUFTVEVSQ0FSRCI6eyJmaWVsZHMiOnsiaW5zdGFsbG1lbnROdW1iZXIiOnsidmFsdWUiOiItMSIsInZhbHVlcyI6eyItMSI6IjE6Ojo6OjE4MCIsIkRZTkFNSUMiOiI6Ojo6OiJ9LCJyZXF1aXJlZCI6dHJ1ZSwic2Vuc2l0aXZlIjpmYWxzZSwiaGlkZGVuIjpmYWxzZSwiY2xlYXJPbkVycm9yIjpmYWxzZX0sImZpcnN0SW5zdGFsbG1lbnREZWxheSI6eyJ2YWx1ZSI6IjAiLCJ2YWx1ZXMiOnsiMCI6IjAiLCJEWU5BTUlDIjoiRFlOQU1JQyJ9LCJyZXF1aXJlZCI6dHJ1ZSwic2Vuc2l0aXZlIjpmYWxzZSwiaGlkZGVuIjpmYWxzZSwiY2xlYXJPbkVycm9yIjpmYWxzZX19LCJjb3B5RnJvbSI6ImNhcmRzLkRFRkFVTFQifSwiTUNfQ09SRE9CRVNBIjp7ImZpZWxkcyI6eyJpbnN0YWxsbWVudE51bWJlciI6eyJ2YWx1ZSI6Ii0xIiwidmFsdWVzIjp7Ii0xIjoiMTo6Ojo6MTgwIiwiRFlOQU1JQyI6Ijo6Ojo6In0sInJlcXVpcmVkIjp0cnVlLCJzZW5zaXRpdmUiOmZhbHNlLCJoaWRkZW4iOmZhbHNlLCJjbGVhck9uRXJyb3IiOmZhbHNlfSwiZmlyc3RJbnN0YWxsbWVudERlbGF5Ijp7InZhbHVlIjoiMCIsInZhbHVlcyI6eyIwIjoiMCIsIkRZTkFNSUMiOiJEWU5BTUlDIn0sInJlcXVpcmVkIjp0cnVlLCJzZW5zaXRpdmUiOmZhbHNlLCJoaWRkZW4iOmZhbHNlLCJjbGVhck9uRXJyb3IiOmZhbHNlfX0sImNvcHlGcm9tIjoiY2FyZHMuREVGQVVMVCJ9LCJWSVNBIjp7ImZpZWxkcyI6eyJpbnN0YWxsbWVudE51bWJlciI6eyJ2YWx1ZSI6Ii0xIiwidmFsdWVzIjp7Ii0xIjoiMTo6Ojo6MTgwIiwiRFlOQU1JQyI6Ijo6Ojo6In0sInJlcXVpcmVkIjp0cnVlLCJzZW5zaXRpdmUiOmZhbHNlLCJoaWRkZW4iOmZhbHNlLCJjbGVhck9uRXJyb3IiOmZhbHNlfSwiZmlyc3RJbnN0YWxsbWVudERlbGF5Ijp7InZhbHVlIjoiMCIsInZhbHVlcyI6eyIwIjoiMCIsIkRZTkFNSUMiOiJEWU5BTUlDIn0sInJlcXVpcmVkIjp0cnVlLCJzZW5zaXRpdmUiOmZhbHNlLCJoaWRkZW4iOmZhbHNlLCJjbGVhck9uRXJyb3IiOmZhbHNlfX0sImNvcHlGcm9tIjoiY2FyZHMuREVGQVVMVCJ9LCJWSVNBX0VMRUNUUk9OIjp7ImZpZWxkcyI6eyJpbnN0YWxsbWVudE51bWJlciI6eyJ2YWx1ZSI6Ii0xIiwidmFsdWVzIjp7Ii0xIjoiMTo6Ojo6MTgwIiwiRFlOQU1JQyI6Ijo6Ojo6In0sInJlcXVpcmVkIjp0cnVlLCJzZW5zaXRpdmUiOmZhbHNlLCJoaWRkZW4iOmZhbHNlLCJjbGVhck9uRXJyb3IiOmZhbHNlfSwiZmlyc3RJbnN0YWxsbWVudERlbGF5Ijp7InZhbHVlIjoiMCIsInZhbHVlcyI6eyIwIjoiMCIsIkRZTkFNSUMiOiJEWU5BTUlDIn0sInJlcXVpcmVkIjp0cnVlLCJzZW5zaXRpdmUiOmZhbHNlLCJoaWRkZW4iOmZhbHNlLCJjbGVhck9uRXJyb3IiOmZhbHNlfX0sImNvcHlGcm9tIjoiY2FyZHMuREVGQVVMVCJ9LCJERUZBVUxUIjp7ImZpZWxkcyI6eyJwYW4iOnsibWluTGVuZ3RoIjoxMCwibWF4TGVuZ3RoIjoxOSwidmFsaWRhdG9ycyI6WyJOVU1FUklDIiwiTFVITiJdLCJyZXF1aXJlZCI6dHJ1ZSwic2Vuc2l0aXZlIjp0cnVlLCJoaWRkZW4iOmZhbHNlLCJjbGVhck9uRXJyb3IiOmZhbHNlfSwiZXhwaXJ5RGF0ZSI6eyJyZXF1aXJlZCI6dHJ1ZSwic2Vuc2l0aXZlIjp0cnVlLCJoaWRkZW4iOmZhbHNlLCJjbGVhck9uRXJyb3IiOmZhbHNlfSwic2VjdXJpdHlDb2RlIjp7Im1pbkxlbmd0aCI6MywibWF4TGVuZ3RoIjo0LCJ2YWxpZGF0b3JzIjpbIk5VTUVSSUMiXSwicmVxdWlyZWQiOnRydWUsInNlbnNpdGl2ZSI6dHJ1ZSwiaGlkZGVuIjpmYWxzZSwiY2xlYXJPbkVycm9yIjp0cnVlfSwiaW5zdGFsbG1lbnROdW1iZXIiOnsidmFsdWUiOiItMSIsInZhbHVlcyI6eyItMSI6IjE6Ojo6OjE4MCJ9LCJyZXF1aXJlZCI6ZmFsc2UsInNlbnNpdGl2ZSI6ZmFsc2UsImhpZGRlbiI6ZmFsc2UsImNsZWFyT25FcnJvciI6ZmFsc2V9LCJmaXJzdEluc3RhbGxtZW50RGVsYXkiOnsidmFsdWUiOiIwIiwidmFsdWVzIjp7IjAiOiIwIn0sInJlcXVpcmVkIjpmYWxzZSwic2Vuc2l0aXZlIjpmYWxzZSwiaGlkZGVuIjpmYWxzZSwiY2xlYXJPbkVycm9yIjpmYWxzZX19fSwiRElORVJTIjp7ImZpZWxkcyI6eyJpbnN0YWxsbWVudE51bWJlciI6eyJ2YWx1ZSI6Ii0xIiwidmFsdWVzIjp7Ii0xIjoiMTo6Ojo6MTgwIiwiRFlOQU1JQyI6Ijo6Ojo6In0sInJlcXVpcmVkIjp0cnVlLCJzZW5zaXRpdmUiOmZhbHNlLCJoaWRkZW4iOmZhbHNlLCJjbGVhck9uRXJyb3IiOmZhbHNlfSwiZmlyc3RJbnN0YWxsbWVudERlbGF5Ijp7InZhbHVlIjoiMCIsInZhbHVlcyI6eyIwIjoiMCIsIkRZTkFNSUMiOiJEWU5BTUlDIn0sInJlcXVpcmVkIjp0cnVlLCJzZW5zaXRpdmUiOmZhbHNlLCJoaWRkZW4iOmZhbHNlLCJjbGVhck9uRXJyb3IiOmZhbHNlfX0sImNvcHlGcm9tIjoiY2FyZHMuREVGQVVMVCJ9LCJWSVNBX0RFQklUIjp7ImZpZWxkcyI6eyJpbnN0YWxsbWVudE51bWJlciI6eyJ2YWx1ZSI6Ii0xIiwidmFsdWVzIjp7Ii0xIjoiMTo6Ojo6MTgwIiwiRFlOQU1JQyI6Ijo6Ojo6In0sInJlcXVpcmVkIjp0cnVlLCJzZW5zaXRpdmUiOmZhbHNlLCJoaWRkZW4iOmZhbHNlLCJjbGVhck9uRXJyb3IiOmZhbHNlfSwiZmlyc3RJbnN0YWxsbWVudERlbGF5Ijp7InZhbHVlIjoiMCIsInZhbHVlcyI6eyIwIjoiMCIsIkRZTkFNSUMiOiJEWU5BTUlDIn0sInJlcXVpcmVkIjp0cnVlLCJzZW5zaXRpdmUiOmZhbHNlLCJoaWRkZW4iOmZhbHNlLCJjbGVhck9uRXJyb3IiOmZhbHNlfX0sImNvcHlGcm9tIjoiY2FyZHMuREVGQVVMVCJ9fSwicGFzc0FjdGl2YXRlZCI6dHJ1ZSwiYXBpUmVzdFZlcnNpb24iOiI0LjAiLCJjb3VudHJ5IjoiUEUiLCJqU2Vzc2lvbklkIjoiYTIxQUFhRGI0N2VjMjZhMzNCQjExRGVFNUZjRDM2OTJmNzFlZkVDRC52YWR3b3JsZGFwaTAxLXRscy1wcm9kLWZyLWx5cmEifQa802";
  const server = "http://your_server.com";
  
  const payment = ()=>{
    const ExpRegSoloNumeros="^[0-9]+$";
    if(amount.match(ExpRegSoloNumeros)!=null){
      // Obtener el formToken
      getFormToken(amount,publicKey,endPoint);
      setIsShow(true);
    }else{
      setIsValid(false);
      setTimeout(()=>setIsValid(true),3000)
    }
  }
  const getFormToken = (monto, publicKey, domain) => {
    const dataPayment = {
        amount: monto*100,
        currency: "PEN",
        customer:{
          email: "example@gmail.com"
        },
        orderId: "pedido-0"
    }
    // axios.post(`${server}/api/createPayment`,dataPayment)
    // .then(({data}) => {
      KRGlue.loadLibrary(domain,publicKey)
      .then(({KR}) => KR.setFormConfig({
        formToken: formToken
        // formToken:data.formToken,
      }))
      .then(({ KR }) => KR.onSubmit(validatePayment) )
      .then(({ KR }) => KR.attachForm("#form") )
      .then(({ KR, result }) => KR.showForm(result.formId))
  // })
    .catch(err=>setError(err))

  }


  const validatePayment = (resp) => {
    axios.post(`${server}/api/validatePayment`, resp)
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

  return (
    <div className='container'>
      <main>
          <div className="py-5 text-center">      
            <h3>Ejemplo de un formulario incrustado con React</h3>
            <div className="alert alert-danger align-items-center" role="alert" style={{display: error!==""?"flex":"none"}}>
              <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlinkHref="#exclamation-triangle-fill"/></svg>
              <div>{error}</div>
            </div>
          </div>

          <div className="row g-5">
            <div className="col-md-5 col-lg-4 order-md-last">
              <div className="d-flex justify-content-center">
                <h4>
                  <span className="text-primary">Formulario Popin</span>                  
                </h4>
              </div>
              <hr className="my-4"/>
              <div className="d-flex justify-content-center">
                <div id="myDIV" className="formulario" style={{display: isShow?"block":"none" }}>
                  <div id="form">
                    {/* Formulario de pago incrustado */}
                    <PaymentForm/>
                  </div> 
                </div>                         
              </div>                    
              <hr className="my-4"/>
            </div>
              
            <div className="col-md-7 col-lg-8">            
              <form className="needs-validation">
                <div className="row g-3">
                  <div className="col-sm-6">
                    <label htmlFor="firstName" className="form-label">Monto Total</label>
                    <input type="text" className="form-control" onChange={e=>setAmount(e.target.value) } value={amount} placeholder="S/." required />
                    <div className="invalid-feedback" style={{display: isValid ?"none":"block"}}>Ingrese un monto válido.</div>
                  </div>

                  <div className="col-sm-6">
                    <label htmlFor="lastName" className="form-label">Moneda</label>
                    <input type="text" className="form-control" id="lastName" value="PEN" readOnly/>                    
                  </div>
                </div>            
            
                <hr className="my-4"/>

                <button onClick={payment} className="w-100 btn btn-primary btn-lg" type="button">Finalizar con el Pago</button>
              </form>
            </div>
          </div>
      </main>

    </div>

  );
}

export default App;
