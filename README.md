<p align="center">
  <img src="https://github.com/izipay-pe/Imagenes/blob/main/logos_izipay/logo-izipay-banner-1140x100.png?raw=true" alt="Formulario" width=100%/>
</p>

# Embedded-PaymentForm-React

## Índice

➡️ [1. Introducción](https://github.com/izipay-pe/Readme-Template/tree/main?tab=readme-ov-file#%EF%B8%8F-1-introducci%C3%B3n)  
🔑 [2. Requisitos previos](https://github.com/izipay-pe/Readme-Template/tree/main?tab=readme-ov-file#-2-requisitos-previos)  
🚀 [3. Ejecutar ejemplo](https://github.com/izipay-pe/Readme-Template/tree/main?tab=readme-ov-file#-3-ejecutar-ejemplo)  
🔗 [4. Pasos de integración](https://github.com/izipay-pe/Readme-Template/tree/main?tab=readme-ov-file#4-pasos-de-integraci%C3%B3n)  
💻 [4.1. Desplegar pasarela](https://github.com/izipay-pe/Readme-Template/tree/main?tab=readme-ov-file#41-desplegar-pasarela)  
💳 [4.2. Analizar resultado de pago](https://github.com/izipay-pe/Readme-Template/tree/main?tab=readme-ov-file#42-analizar-resultado-del-pago)  
📡 [4.3. Pase a producción](https://github.com/izipay-pe/Readme-Template/tree/main?tab=readme-ov-file#43pase-a-producci%C3%B3n)  
🎨 [5. Personalización](https://github.com/izipay-pe/Readme-Template/tree/main?tab=readme-ov-file#-5-personalizaci%C3%B3n)  
🛠️ [6. Servidores](https://github.com/izipay-pe/Readme-Template/blob/main/README.md#-6-servidores)    
📚 [7. Consideraciones](https://github.com/izipay-pe/Readme-Template/tree/main?tab=readme-ov-file#-6-consideraciones)

## ➡️ 1. Introducción

En este manual encontrarás una guía detallada para configurar un proyecto en **[React]** integrado con la pasarela de pagos de IZIPAY. Te proporcionaremos instrucciones claras y credenciales de prueba para instalar y configurar el proyecto, permitiéndote trabajar y realizar pruebas de manera segura en tu propio entorno local.
Este manual está diseñado para facilitar la comprensión del flujo de integración de la pasarela de pagos y maximizar el rendimiento de tu desarrollo front-end. **Ten en cuenta que este proyecto se conecta a un servidor (Backend) para gestionar las operaciones críticas relacionadas con la pasarela de pagos**.

<p align="center">
  <img src="https://github.com/izipay-pe/Imagenes/blob/main/formulario_incrustado/Imagen-Formulario-Incrustado.png?raw=true" alt="Formulario" width="350"/>
</p>

## 🔑 2. Requisitos Previos

- Comprender el flujo de comunicación de la pasarela. [Información Aquí](https://secure.micuentaweb.pe/doc/es-PE/rest/V4.0/javascript/guide/start.html)
- Extraer credenciales del Back Office Vendedor. [Guía Aquí](https://github.com/izipay-pe/obtener-credenciales-de-conexion)
- Descargar y ejecutar un servidor (Backend) API REST. [Servidores disponibles](https://github.com/izipay-pe/Readme-Template/blob/main/README.md#-6-servidores)
- Para este proyecto utilizamos la herramienta Visual Studio Code.
> [!NOTE]
> Tener en cuenta que, para que el desarrollo de tu proyecto, eres libre de emplear tus herramientas preferidas.

## 🚀 3. Ejecutar ejemplo


### Clonar el proyecto
```sh
git clone https://github.com/izipay-pe/Embedded-PaymentForm-React.git
``` 

### Datos de conexión 

Realice la conexión al servidor modificando la ruta `[midominio.com]` por la ruta de su servidor.

- Editar el archivo `src/components/Formulario.jsx`:
```react
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
```

- Editar el archivo `src/components/Checkout.jsx`:
```react
//Al recibir la respuesta enviar a su servidor a validar los datos
KR.onSubmit( paymentData => {
  axios.post('[midominio.com]/validate', {
    'kr-answer': paymentData.rawClientAnswer,
    'kr-hash': paymentData.hash,
  })
  .then(response => {
      if (response.data === true) {
        navigate('/result', { state: paymentData.clientAnswer });
      }
  })
  return false;
});
```

### Ejecutar proyecto

1. Ejecuta el siguiente comando para instalar todas las dependencias necesarias:
```bash
npm install
```

2.  Iniciar la aplicación:
```bash
npm run dev
```

## 🔗4. Pasos de integración

<p align="center">
  <img src="https://i.postimg.cc/pT6SRjxZ/3-pasos.png" alt="Formulario" />
</p>

## 💻4.1. Desplegar pasarela
### Autentificación
Las claves de acceso del Backoffice Vendedor deben configurarse exclusivamente en el servidor (Backend), no en la aplicación **[React]**. Esto asegura que las credenciales sensibles permanezcan protegidas y no sean expuestas en el código. 

ℹ️ Para más información: [Autentificación](https://secure.micuentaweb.pe/doc/es-PE/rest/V4.0/javascript/guide/embedded/keys.html)

### Crear formtoken
Para configurar la pasarela, es necesario generar un formtoken. Esto se realiza mediante una solicitud API desde tu aplicación **[React]** al servidor (Backend), el cual procesa los datos de la compra, devolviendo el `formtoken` y la llave `publicKey` necesarias para desplegar la pasarela. 

En el archivo `src/components/Formulario.jsx` se realiza la solicitud al servidor (Backend) junto con los datos recolectados del formulario. 

```react
const Formulario = ({ onPayment }) => {
  const navigate = useNavigate();
  
  //Data a enviar a su servidor
  const [formData, setFormData] = useState({
    firstName: '',
    ..
    ..
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
   ..
   ..
  );  
};

```


### Visualizar formulario
Para desplegar la pasarela, se utiliza la libreria  [Embedded Form Glue](https://github.com/lyra/embedded-form-glue) y es necesario recepcionar los datos que nos devuelve el servidor para configurar la pasarela a través de los métodos de la libreria:

- Cargar las funciones y clases principales de la pasarela a través de  `KRGlue.loadLibrary()` junto a llave `publicKey` que recibimos del servidor.
- Configurar la pasarela con el método  `KR.setFormConfig` junto con el `formToken` que recibimos del servidor.
- Incrustamos la pasarela con el método `KR.attachForm` y definimos el div con un ID donde se mostrará la pasarela.

 En el archivo `src/components/Checkout.jsx`:
```react
  useEffect(() => {
    //Endpoint de izipay
    let endpoint = "https://static.micuentaweb.pe";

    //Configurar libreria con los datos recibidos de su servidor
    KRGlue.loadLibrary(endpoint, publicKey).then(({ KR }) => {
        KR.setFormConfig({
            formToken: formToken,
            'kr-language': 'es-ES',
        });

        //Incrustar la pasarela
        KR.attachForm('#micuentawebstd_rest_wrapper').then(({ KR, result }) => {
          KR.showForm(result.formId);
        });

        ..
        ..
    })
  }, []);	

```
- Adicionalmente se debe incluir en la cabecera los estilos necesarios para desplegar la pasarela. Podrás encontrarlos en el archivo `index.html`

```html
<!-- Estilos de la pasarela de pagos -->
<link rel="stylesheet" href="https://static.micuentaweb.pe/static/js/krypton-client/V4.0/ext/classic-reset.css">
<script src="https://static.micuentaweb.pe/static/js/krypton-client/V4.0/ext/classic.js"></script>	

```

## 💳4.2. Analizar resultado del pago

### Validación de firma
Se configura el método `KR.onSubmit` que recepciona la respuesta del pago y se envía los datos a su servidor para validar la firma, esto garantiza la integridad de los datos. Podrás encontrarlo en el archivo `src/components/Checkout.jsx`.
```react
//Al recibir la respuesta del pago, enviar a su servidor a validar los datos
KR.onSubmit( paymentData => {
    axios.post('[midominio.com]/validate', {
    'kr-answer': paymentData.rawClientAnswer,
    'kr-hash': paymentData.hash,
    })
    .then(response => {
      if (response.data === true) {
        navigate('/result', { state: paymentData.clientAnswer });
      }
    })
    return false;
});
```
Una vez los datos son validados, se pueden mostrar en una pantalla, en el caso de ejemplo se muestran los datos en el archivo `src/components/Result.jsx`. Todos los datos de la transacción se encontrarán dentro del parámetro `clientAnswer`.

ℹ️ Para más información: [Analizar resultado del pago](https://secure.micuentaweb.pe/doc/es-PE/rest/V4.0/kb/payment_done.html)

### IPN
La IPN es una notificación de servidor a servidor (servidor de Izipay hacia el servidor del comercio) que facilita información en tiempo real y de manera automática cuando se produce un evento, por ejemplo, al registrar una transacción. La IPN se debe configurar en el servidor (Backend).

ℹ️ Para más información: [Analizar IPN](https://secure.micuentaweb.pe/doc/es-PE/rest/V4.0/api/kb/ipn_usage.html)

### Transacción de prueba

Antes de poner en marcha su pasarela de pago en un entorno de producción, es esencial realizar pruebas para garantizar su correcto funcionamiento.

Puede intentar realizar una transacción utilizando una tarjeta de prueba con la barra de herramientas de depuración (en la parte inferior de la página).

<p align="center">
  <img src="https://i.postimg.cc/3xXChGp2/tarjetas-prueba.png" alt="Formulario"/>
</p>

- También puede encontrar tarjetas de prueba en el siguiente enlace. [Tarjetas de prueba](https://secure.micuentaweb.pe/doc/es-PE/rest/V4.0/api/kb/test_cards.html)

## 📡4.3.Pase a producción

Para el pase a producción es necesario cambiar las credenciales de TEST por las de PRODUCCIÓN dentro del servidor utilizado. El identificador de tienda sigue siendo el mismo.

## 🎨 5. Personalización

Si deseas aplicar cambios específicos en la apariencia de la pasarela de pago, puedes lograrlo mediante la modificación de código CSS. En este enlace [Código CSS - Incrustado](https://github.com/izipay-pe/Personalizacion/blob/main/Formulario%20Incrustado/Style-Personalization-Incrustado.css) podrá encontrar nuestro script para un formulario incrustado.

<p align="center">
  <img src="https://i.postimg.cc/zDddmKpH/persona.png" alt="Formulario"/>
</p>


## 🛠 6. Servidores
Lista de servidores disponibles:

| Lenguaje | Proyecto                                                                 |
|---------------------|--------------------------------------------------------------------------|
| ![PHP](https://img.shields.io/badge/PHP-777BB4?style=flat&logo=php&logoColor=white)          | [Server-Redirect-PHP](enlace_a_proyecto_php)                                           |
| ![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=flat&logo=laravel&logoColor=white) | [Server-Redirect-Laravel](enlace_a_proyecto_laravel)                                   |
| ![Django](https://img.shields.io/badge/Django-092E20?style=flat&logo=django&logoColor=white)  | [Server-Redirect-Django](enlace_a_proyecto_django)                                     |
| ![Flask](https://img.shields.io/badge/Flask-000000?style=flat&logo=flask&logoColor=white)    | [Server-Redirect-Flask](enlace_a_proyecto_flask)                                       |
| ![.NET](https://img.shields.io/badge/.NET-5C2D91?style=flat&logo=dotnet&logoColor=white)      | [Server-Redirect-.NET](enlace_a_proyecto_dotnet)                                       |
| ![NodeJS](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white) | [Server-Redirect-NodeJS](enlace_a_proyecto_nodejs)                                     |
| ![NextJS](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white) | [Server-Redirect-NextJS](enlace_a_proyecto_nextjs)                                     |
| ![Java](https://img.shields.io/badge/Servlet%20Java-007396?style=flat&logo=java&logoColor=white) | [Server-Redirect-Servelt-Java](enlace_a_proyecto_servlet_java)                         |
| ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=flat&logo=springboot&logoColor=white) | [Server-Redirect-Springboot-Java](enlace_a_proyecto_spring_boot)                         |


## 📚 7. Consideraciones

Para obtener más información, echa un vistazo a:

- [Formulario incrustado: prueba rápida](https://secure.micuentaweb.pe/doc/es-PE/rest/V4.0/javascript/quick_start_js.html)
- [Aplicaciones web de una sola página](https://secure.micuentaweb.pe/doc/es-PE/rest/V4.0/javascript/spa/#cargar-el-formulario-de-pago)
- [Servicios web - referencia de la API REST](https://secure.micuentaweb.pe/doc/es-PE/rest/V4.0/api/reference.html)
