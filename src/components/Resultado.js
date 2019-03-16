import React from 'react';

const Resultado = ({resultado}) => {
    //object.entries nos ayuda para asegurar que el objeto tenga contenido
    //si el objeto esta vacio no se ejecuta
    
    if(Object.entries(resultado).length === 0) return null;

    return ( 
        <div className="resultado">
            <h2 className="resultadotitulo">Result</h2>
            <p className="precio"> The Price is: <span> {resultado.PRICE}</span> </p>
            <p> Highday: <span>{resultado.HIGHDAY}</span> </p>
            <p> Lowday: <span>{resultado.LOWDAY}</span> </p>
            <p> Last 24H: <span>{resultado.CHANGEPCT24HOUR}%</span> </p>
            <p>Last Update: <span>{resultado.LASTUPDATE}</span> </p>
        </div>
    );
}
 
export default Resultado;