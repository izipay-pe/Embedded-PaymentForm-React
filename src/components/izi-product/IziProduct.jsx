export const IziProduct = ({product,buy=null}) => {
    const {name, url, price} = product;
    return (
        <div className="Product">
            <h4>{name}</h4>
            <img src={url} alt={name} />
            <p>
                <span>S/</span>{price}
            </p>
            {
                buy!==null && <button onClick={()=>buy(product)}>Comprar</button>
            }
            
        </div>
    )

}