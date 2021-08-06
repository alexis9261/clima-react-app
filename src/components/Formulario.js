import React, {useState} from 'react';
import Error from './Error';
import PropTypes from 'prop-types';

const Formulario = ({ busqueda, setBusqueda, setConsulta }) => {

    const [ error, setError ] = useState(false);

    // extraer ciudad y pais del state
    const { ciudad, pais } = busqueda;

    // funcionque coloca los elementos en el state
    const handleChange = event => {
        // actualizar el state
        setBusqueda({
            ...busqueda,
            [event.target.name]: event.target.value
        });
    }

    // formulario submit
    const handleSubmit = (event) => {
        event.preventDefault();

        // validar
        if( ciudad.trim() === '' || pais.trim() === ''){
            setError(true);
            return;
        }
        setError(false);

        // enviar la info al componente principal
        setConsulta(true);

    }

    return ( 
        <form
            onSubmit={handleSubmit}
        >
            { error ? <Error mensaje="Todos los campos son obligatorios" /> : null }
            <div className="input-field col s12">
                <input 
                    type="text"
                    name="ciudad"
                    id="ciudad"
                    value={ciudad}
                    onChange={handleChange}
                />
                <label htmlFor="ciudad">Ciudad:</label>
            </div>
            <div className="input-field col s12">
                <select
                    name="pais"
                    id="pais"
                    value={pais}
                    onChange={handleChange}
                >
                    <option value="">-- Selecciona un país --</option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">México</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    <option value="PE">Perú</option>
                    <option value="VE">Venezuela</option>
                </select>
                <label htmlFor="pais">País:</label>
            </div>
            <button class="btn btn-large waves-effect waves-light orange accent-4 col s12" type="submit">
                Buscar Clima
            </button>
        </form>
     );
}

// documentar el componente
Formulario.propTypes = {
    busqueda: PropTypes.object.isRequired,
    setBusqueda: PropTypes.func.isRequired,
    setConsulta: PropTypes.func.isRequired
}
 
export default Formulario;
