import React, { Component } from 'react';
import Criptomoneda from './Criptomoneda';
import Error from './Error';

import axios from 'axios';

class Formulario extends Component {
    state = { 
        criptomonedas: [],
        moneda : '',
        criptomoneda: '',
        error: false
     }

     async componentWillMount() {
        const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
     
        await axios.get(url)
            .then(res => {
                this.setState({
                    criptomonedas: res.data.Data
                })
            })
    }

    //se ejecuta cuando el usuario eligre una opcion del select
    //e.target lo usamospara detectar el elemento
    //e.target.value es para leer el valor que el usuario selecciona
    obtenerValor = e => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        })
    }

    //validamos que el usuario eliga las monedas

    cotizarMoneda = e => {
        e.preventDefault();

        const {moneda, criptomoneda } = this.state
        //validar que haya algo seleccionado
        if(moneda === '' || criptomoneda === '') {
            this.setState({
                error: true
            }, () => {
                setTimeout(() => {
                    this.setState({
                        error:  false
                    })
                },2000)
            });
            return;
        }

        //creo el objeto

        const cotizacion = {
            moneda,
            criptomoneda
        }

        //enviar los datos al componente app.js para cotizar
        this.props.cotizarCriptomoneda(cotizacion);
    }

    render() { 

        const mensaje =  (this.state.error) ? <Error mensaje="Both fields are required" /> : '';

        return (  
            <form onSubmit={this.cotizarMoneda}>
                <div className="row">
                    <label>Choose your currency</label>
                    <select
                        onChange={this.obtenerValor}
                        name="moneda"
                        className="u-full-width">
                            <option value="">Choose your currency</option>
                            <option value="USD">American Dolar</option>
                            <option value="EUR">Euro</option>
                            <option value="GBP">Libras</option>
                            <option value="VEF">Venezuelan Bolivar</option>
                    </select>
                </div>

                <div className="row">
                    <div>
                        <label>Choose your Bitcoin</label>
                        <select onChange={this.obtenerValor}
                        name="criptomoneda"
                        className="u-full-width">
                            <option value="">Choose your Bitcoin</option>
                            {Object.keys(this.state.criptomonedas).map(key => (
                                <Criptomoneda 
                                    key={key}
                                    criptomoneda={this.state.criptomonedas[key]}
                                />
                            ))}
                        </select>
                    </div>
                </div>
                <input className="button-primary u-full-width" type="submit" value="Quote" />
                {mensaje}
                </form>
        );
    }
}
 
export default Formulario;