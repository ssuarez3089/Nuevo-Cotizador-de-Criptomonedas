import React, { Component } from 'react';
import imagen from './cryptomonedas.png'
import Formulario from './components/Formulario';
import Resultado from './components/Resultado';
import Spinner from './components/Spinner';
import axios from 'axios';


class App extends Component {

  state= {
    resultado : {},
    monedaSeleccionada : '',
    CriptoSeleccionada: '',
    cargando: false
  }

  cotizarCriptomoneda = async (cotizacion) => {
        
    //obtener los valores
    const {moneda , criptomoneda } = cotizacion;
    //realizar cosulta con axios 
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
      await axios.get(url)
        .then(res => {
            this.setState({
                resultado: res.data.DISPLAY[criptomoneda][moneda],
                cargando: true
            }, () => {
               //2 segundos despues cambia a false
              setTimeout(() => {
                this.setState({
                    cargando: false
                })
              }, 2000)
            })
        });

        //2 segundos despues cambia a false


  }

  render() {

    const resultado = (this.state.cargando) ? <Spinner /> : <Resultado resultado={this.state.resultado}/>

    return (
      <div className="container">
          <div className="row">
            <div className="one-half column">
              <img src={imagen} alt="imagen" className="logotipo" />
            </div>
            <div className="one-half column">
              <h1>Instantly cryptocurrencies</h1>
              <Formulario 
                cotizarCriptomoneda={this.cotizarCriptomoneda}
              />
              {resultado}
            </div>

          </div>
      </div>
    );
  }
}

export default App;
