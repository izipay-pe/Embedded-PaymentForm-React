
export const IzipayFormEmbedded = () => {
    return (
        <div className="Content-Form-Izipay" >
            <p>Recuerda activar las compras por internet con tu banco</p>
            <div id="myPaymentForm">
                <div className="kr-embedded">

                    {/* custom text field */}
                    
                    {/* payment form fields */}
                    <div className="kr-pan"></div>
                    <div className="kr-expiry"></div>
                    <div className="kr-security-code"></div>  

                    {/* payment form submit button */}
                    <button className="kr-payment-button"></button>

                    {/* error zone */}
                    <div className="kr-form-error"></div>
                </div>
            </div>
        </div>
    );
}