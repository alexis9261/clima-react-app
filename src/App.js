import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';

function App() {

  // State que guarda el resultado de la busqueda
  const [ busqueda, setBusqueda ] = useState({
    ciudad:'',
    pais:''
  });

  // State bandera que indica que se realizao la consulta
  const [ consulta, setConsulta ] = useState(false);
  const [ resultado, setResultado ] = useState({});
  const [ error, setError ] = useState(false);

  const { ciudad, pais } = busqueda

  useEffect( () => {
    const consultarAPI = async () => {

      if(consulta){

        const appID = 'ce8e3b25afd3a13f8ef8b2be362f2427';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;
        
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        
        setResultado(resultado);
        setConsulta(false);

        // detectar si hubo respuesta correcta en la consulta
        if(resultado.cod === "404"){
          setError(true);
        }else{
          setError(false);
        }
      }

    }

    consultarAPI();

    // Para deshabilitar las dependencias se coloca el siguiente comentario al final del useEffect
    // eslint-disable-next-line
  }, [consulta]);


  // CARGA CONDICIONAL DE COMPONENTES
  let componente;
  if(error){
    componente = <Error mensaje="No hay resulados para esta búsqueda" />
  }else{
    componente = <Clima resultado={resultado} />
  }
  

  return (
    <Fragment >
      <Header 
        titulo={'Clima React App'}
      />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario 
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                setConsulta={setConsulta}
              />
            </div>
            <div className="col m6 s12">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

// Client ID
// ce8e3b25afd3a13f8ef8b2be362f2427

export default App;

