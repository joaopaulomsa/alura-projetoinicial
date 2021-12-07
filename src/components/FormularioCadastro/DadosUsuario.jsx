import { TextField, Button, Typography } from "@material-ui/core";
import React, { useState, useContext } from "react";
import { ValidacoesCadastro } from "../../context/ValidacoesCadastro";
import useApexRequest from "../../hooks/useApexRequest";
import useErros from "../../hooks/useErros";

function DadosUsuario({aoEnviar}){
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const validacoes = useContext(ValidacoesCadastro);

    const [erros, validarCampos] = useErros(validacoes);

    const [errorApex, isLoadedApex, itemsApex] = useApexRequest();

    if(isLoadedApex){
        console.log(itemsApex);
    }else{
        console.log("carregando...");
    }

    function possoEnviar() {
        for(let campo in erros){
            if(!erros[campo].valido) return false;
        }
        return true;
    }
    
    return(
        <form onSubmit={(event)=>{
            event.preventDefault();
            if(possoEnviar()) aoEnviar({email, senha});
        }}>
            <TextField 
                value={email} 
                onChange={(event) => { setEmail(event.target.value) }}
                id="email" 
                label="email" 
                type="email"
                required 
                variant="outlined"
                margin="normal"
                fullWidth
            />
            <TextField  
                value={senha} 
                onChange={(event) => { setSenha(event.target.value) }}
                id="senha" 
                label="senha" 
                name="senha"
                onBlur={validarCampos}
                error={!erros.senha.valido}
                helperText={erros.senha.texto}
                type="password"
                required 
                variant="outlined"
                margin="normal"
                fullWidth
            />

            <Typography variant="h2">{}</Typography>

            <Button type="submit" variant="contained" color="primary">
                Próximo
            </Button>
        </form>
    );
}

export default DadosUsuario;