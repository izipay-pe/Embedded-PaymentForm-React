import { useState } from "react";
import { IziProduct } from "../izi-product/IziProduct";
import "./Checkout.css";

export const Checkout = ({addProduct, checkoutPayment}) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('');

    const handleAnimation = (e) => {
        let group = e.target.parentElement.children;
        group[0].style.top = "-5px";
        group[0].style.fontSize = "12px";
        group[1].addEventListener('blur',(e)=> {
            if(group[1].value.length === 0){
                group[0].style.top = "12px";
                group[0].style.fontSize = "16px";
            }
        })
    }

    const handleImput = (e, setUseState) =>{
        setUseState(e.target.value)
        let group = e.target.parentElement.children;
        group[1].addEventListener('blur',(e)=> {
            if(group[1].value.length === 0){
                group[0].style.top = "12px";
                group[0].style.fontSize = "16px";
            }
        })
        if(group[1].value.length > 0){
            group[0].style.top = "-5px";
            group[0].style.fontSize = "12px";
        }

    }

    const submit = (e) =>{
        e.preventDefault();
        const data = {
            reference: `${firstName} ${lastName}`,
            currency:"USD",
            email,
            amount: addProduct.price
        }
        checkoutPayment(data);
    }

    return(
        <div className="content-checkout">
            <div className="cart">
                <IziProduct product={addProduct}/>
            </div>
            <div className="checkout">
                <h3>Datos del cliente</h3>
                <form onSubmit={submit}>
                    <div className="control-group">
                        <label htmlFor="firstname">First Name</label>
                        <input 
                            type="text" 
                            id="firstname" 
                            name="firstname" 
                            value={firstName} 
                            onFocus={handleAnimation} 
                            onChange={(e)=>handleImput(e,setFirstName)} 
                            autoComplete="off" 
                            required
                        />
                    </div>
                    <div className="control-group">
                        <label htmlFor="lastname">Last Name</label>
                        <input 
                            type="text" 
                            id="lastname" 
                            name="lastname" 
                            value={lastName} 
                            onFocus={handleAnimation} 
                            onChange={(e)=>handleImput(e,setLastName)} 
                            autoComplete="off" 
                            required
                        />
                    </div>
                    <div className="control-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={email} 
                            onFocus={handleAnimation} 
                            onChange={(e)=>handleImput(e,setEmail)} 
                            autoComplete="off" 
                            required
                        />
                    </div>
                    <button >Confirmar</button>
                </form>
            </div>
        </div>
    )
}