import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Formulario = ({ onPayment }) => {
  const navigate = useNavigate();
  
  //Data a enviar a su servidor
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    identityType: 'DNI',
    identityCode: '',
    address: '',
    country: 'PE',
    state: '',
    city: '',
    zipCode: '',
    orderId: '',
    amount: 0,
    currency: 'PEN',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //Solicitud de creación de formtoken a su servidor
      const response = await axios.post('[midominio.com]/formtoken', formData);
      navigate('/checkout', { state: response.data });
    } catch (error) {
      console.error('Error al procesar el pago:', error);
    }
  };

  return (
    <section className="container">
      <form className="col-md-12" onSubmit={handleSubmit}>
        <div className="row">
          <div className="left-column col-md-6">
            <section className="customer-details">
              <h2>Datos del cliente</h2>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="firstName">Nombre</label>
                  <input type="text" className="form-control" id="firstName" name="firstName" placeholder="Nombre" value={formData.firstName} onChange={handleChange} required />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="lastName">Apellido</label>
                  <input type="text" className="form-control" id="lastName" name="lastName" placeholder="Apellido" value={formData.lastName} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">Correo Electrónico</label>
                <input type="email" className="form-control" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber">Teléfono</label>
                <input type="tel" className="form-control" id="phoneNumber" name="phoneNumber" placeholder="999999999" value={formData.phoneNumber} onChange={handleChange} required />
              </div>
              <div className="form-row">
                <div className="form-group col-md-4">
                  <label htmlFor="identityType">Tipo de Documento</label>
                  <select className="form-control" id="identityType" name="identityType" value={formData.identityType} onChange={handleChange}>
                    <option value="DNI">DNI</option>
                    <option value="PS">Pasaporte</option>
                    <option value="CE">Carné de Extranjería</option>
                  </select>
                </div>
                <div className="form-group col-md-8">
                  <label htmlFor="identityCode">Documento</label>
                  <input type="text" className="form-control" id="identityCode" name="identityCode" placeholder="Doc. Identidad" value={formData.identityCode} onChange={handleChange} required />
                </div>
              </div>
            </section>
            <section className="billing-details">
              <h2>Datos de envío</h2>
              <div className="form-group">
                <label htmlFor="address">Dirección</label>
                <input type="text" className="form-control" id="address" name="address" placeholder="Nombre de la calle y número de casa" value={formData.address} onChange={handleChange} required />
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="country">País</label>
                  <select className="form-control" id="country" name="country" value={formData.country} onChange={handleChange}>
                    <option value="PE">Perú</option>
                    <option value="AR">Argentina</option>
                    <option value="CL">Chile</option>
                    <option value="CO">Colombia</option>
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="state">Departamento</label>
                  <input type="text" className="form-control" id="state" name="state" placeholder="Departamento" value={formData.state} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="city">Distrito</label>
                  <input type="text" className="form-control" id="city" name="city" placeholder="Distrito" value={formData.city} onChange={handleChange} required />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="zipCode">Código Postal</label>
                  <input type="text" className="form-control" id="zipCode" name="zipCode" placeholder="15021" value={formData.zipCode} onChange={handleChange} required />
                </div>
              </div>
            </section>
          </div>
          <div className="right-column col-md-6">
            <section className="customer-details">
              <h2>Datos del pago</h2>
              <div className="form-group">
                <label htmlFor="orderId">Order-id</label>
                <input type="text" className="form-control" id="orderId" name="orderId" placeholder="Order" value={formData.orderId} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="amount">Monto</label>
                <input type="number" className="form-control" id="amount" name="amount" placeholder="0.00" step="0.01" min="0" value={formData.amount} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="currency">Moneda</label>
                <select className="form-control" id="currency" name="currency" value={formData.currency} onChange={handleChange}>
                  <option value="PEN">Soles</option>
                  <option value="USD">Dólares</option>
                </select>
              </div>
            </section>
            <button className="btn btn-primary" type="submit">Pagar</button>
          </div>
        </div>
      </form>
    </section>
  );  
};

export default Formulario;