import React from "react";
import { validarCPF, validarSenha } from "../models/cadastro";

const ValidacoesCadastro = React.createContext(
    {cpf: validarCPF, senha: validarSenha, nome: semValidacao}
);

function semValidacao(dados){
    console.log(dados);
    return { valido: true, texto: " "};
}

export { ValidacoesCadastro };