import moment from "moment"
import compareDateSqlString from "./useDateUtils";

function compareDadosStringTrueFalse(d1,d2){

  let dados1 = d1.dadosUx
  let dados2 = d2.dadosUx

  if(dados1 === undefined || dados2 === undefined) return 0

  if(dados1.uxInfo.orderItem > dados2.uxInfo.orderItem){
      return -1
  }
  if(dados1.uxInfo.orderItem < dados2.uxInfo.orderItem){
      return 1
  }
  return 0;
   
}

function retornaInfoLiberacao(dadosAtendEx,dadosGerais){
  let dadosAtendimentoExames = {
    laboratorio: null,
    rx: null,
    imagem: null,
    liberado: true,
    uxInfo: null,
    tempoUxLab: '',
    tempoUxRx: '',
    tempoUxImg: '',
  }
   
  let dataAtual
  let dataAntiga
  if(dadosAtendEx!==null)
  dadosAtendEx.forEach(info => {      
      dataAtual = (dataAtual!==undefined)?compareDateSqlString(dataAtual,info.data_liberacao).maisAtual:info.data_liberacao
      dataAntiga = (dataAntiga!==undefined)?compareDateSqlString(dataAntiga,info.data_solicitacao).maisAntigo:info.data_solicitacao
      let tipoOk = (info.data_solicitacao === null )?'erro':info.tipo
      switch(tipoOk){
          case 'Lab':
            if(info.data_liberacao === null) dadosAtendimentoExames.liberado = false
            dadosAtendimentoExames.laboratorio = info
            dadosAtendimentoExames.tempoUxLab = retornaTempoUxInfo(info.data_solicitacao,info.data_liberacao, dadosGerais.data_agora)
              break
          case 'RX':
            if(info.data_liberacao === null) dadosAtendimentoExames.liberado = false
            dadosAtendimentoExames.rx = info
            dadosAtendimentoExames.tempoUxRx = retornaTempoUxInfo(info.data_solicitacao,info.data_liberacao, dadosGerais.data_agora)
              break
          case 'Imagem':
            if(info.data_liberacao === null) dadosAtendimentoExames.liberado = false
            dadosAtendimentoExames.imagem = info
            dadosAtendimentoExames.tempoUxImg = retornaTempoUxInfo(info.data_solicitacao,info.data_liberacao, dadosGerais.data_agora)
          break
          default: break
      }
   });

  let dataLiberado = (dadosAtendimentoExames.liberado) ? dataAtual : dataAntiga

  dadosAtendimentoExames.uxInfo = retornaUxInfo(dataLiberado,dadosAtendimentoExames.liberado, dadosGerais.data_agora)      
  
  return dadosAtendimentoExames
}

function retornaTempoUxInfo(data1,data2,dataAtual){
  let momentoSobtraido = (data2 === null)?moment(dataAtual).diff(data1):moment(data2).diff(data1)
  let d = moment.duration(momentoSobtraido)
  let tempo = ((Math.floor(d.asHours()) !== 0 ) ? Math.floor(d.asHours()) +'h ':'') + ((moment.utc(momentoSobtraido).format("mm") !== '00' ) ? moment.utc(momentoSobtraido).format("mm")+'min': '')
  return tempo
}

function retornaUxInfo(data,liberado,dataAtual){
  if(data === null) return { texto: '', cssStatus: 'info' }
  let momentoSobtraido = moment(dataAtual).diff(data)
  let d = moment.duration(momentoSobtraido);
  let order = (!liberado)?Math.floor(d.asHours()):9999
  let cssStatus = retornaInfoCss(order)
  let tempo = ((Math.floor(d.asHours()) !== 0 ) ? Math.floor(d.asHours()) +'h ':'') + ((moment.utc(momentoSobtraido).format("mm") !== '00' ) ? moment.utc(momentoSobtraido).format("mm")+'min': '')
  return { texto: ((liberado)?'Liberado à ':'Aguardando à ')+tempo, cssStatus: cssStatus, orderItem: order }
}

function retornaInfoCss(parametro) {
  switch (parametro) {
      case 9999: return 'success'
      case 0:
      case 1: return 'info'
      case 2: return 'warning'
      default: return 'danger'
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const useApiApexEmergenvciaPA = async(setItens) => {

  let consultaItens = 'tipo=painel_emergencia_pa/dados'
  let consultaSubItens = 'tipo=painel_emergencia_pa/exames/'

  let mock = false
  
  if(mock !== false){
    //setItemsApex(mock)
  }else{
      await fetch("http://192.168.92.225:8080/con_apex.php?"+consultaItens) // fetch("http://appenf.hed.com.br:8080/ords/tasy"+consulta)
        .then(res => res.json())
        .then(
          async (result) => {
              let totalItens = result.items.length
              let contadorItens = 1
              await result.items.forEach(async function(part, index) {
                if( this[index] !== undefined ) await fetch("http://192.168.92.225:8080/con_apex.php?"+consultaSubItens+this[index].atendimento)
                .then(res => res.json())
                .then(async (result2) => {
                  contadorItens++
                  let infoBD = await result2
                  //if(result2 !== null) {
                    result.items[index].dadosAtendimentoExames = infoBD.items
                    result.items[index].dadosUx = retornaInfoLiberacao(infoBD.items,result.items[index])
                    //result.items[index].dadosUx = retornaInfoLiberacaoNova(infoBD.items)
                  //}
                  //else result.items.splice(index,1)
                  
                }).then(()=>{
                  if(contadorItens === totalItens) {
                    sleep(1000).then(() => {
                      result.items.sort(compareDadosStringTrueFalse)
                      //console.log(contadorItens+'/'+totalItens)
                      setItens(result.items)
                    });
                  }
                })
              }, result.items,totalItens,contadorItens, setItens); // use result as this
          }
        )
  }
}

export default useApiApexEmergenvciaPA;