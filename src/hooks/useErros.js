import React, {useState} from "react";

function useErros(validacoes){

    const [erros, setErros] = useState({senha:{valido:true, texto:""}});

    function validarCampos(event){
        const {name, value} = event.target;    
        const novoEstado = {...erros};
        novoEstado[name] = validacoes[name](value);
        setErros(novoEstado);
    }

    return [erros, validarCampos];
}

export default useErros;