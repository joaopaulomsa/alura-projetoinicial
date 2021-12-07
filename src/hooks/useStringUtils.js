function iniciaisDeNomes(nome){
    let nomeTratado = nome.replace(/\s(de|da|dos|das)\s/g, ' ') 
    let iniciaisNome = nomeTratado.match(/\b(\w)/gi)
    return iniciaisNome.join('').toUpperCase()
}

export default iniciaisDeNomes;