function iniciaisDeNomes(nome){
    let nomeTratado = nome.replace(/\s(de|da|dos|das)\s/g, ' ') 
    let iniciaisNome = nomeTratado.match(/\b(\w)/gi)
    return iniciaisNome.join('').toUpperCase()
}

function retornaPrioridadeUx(prioridade){
    switch(prioridade){
        case 1: return {cor:'#FF0000',texto:'Emergente'}
        case 2: return {cor:'#FF8000',texto:'Muito Urgente'}
        case 3: return {cor:'#FFFF00',texto:'Urgente'}
        case 4: return {cor:'#00FF00',texto:'Pouco Urgente'}
        case 5: return {cor:'#0080FF',texto:'Não Urgente'}
        default: return {cor:'',texto:''}
    }
}

function retornaStatusUx(status){
    switch(status){
        case 'NA': return {sigla:'NA',texto:'Aguardando Atendimento', icon: 'HourglassBottom', colorBg: '#EEE'}
        case 'TR': return {sigla:'TR',texto:'Aguardando Atendimento', icon: 'HourglassBottom', colorBg: '#EEE'}
        case 'FT': return {sigla:'FT',texto:'Aguardando Atendimento', icon: 'HourglassBottom', colorBg: '#EEE'}
        default: return {sigla:status,texto:'Em Atendimento', icon: 'ContentPasteSearch', colorBg: '#D9D9D9'}
    }
}

function cortaString(str,tam,marcador = ' ...' ){
    if(str.length <= tam) return str
    return str.slice(0, tam)+marcador
}

export {
    iniciaisDeNomes,
    retornaPrioridadeUx,
    retornaStatusUx,
    cortaString
};