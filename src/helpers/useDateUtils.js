import moment from "moment"

function compareDateSqlString(date1,date2){
    date1 = moment(date1) //'1995-12-17T03:24:00'
    date2 = moment(date2) //'1995-12-17T03:24:00'

    let retorno = {
        maisAtual : date2,
        maisAntigo : date1
    }

    if(date2.isSameOrBefore(date1)){
        retorno = {
            maisAtual : date1,
            maisAntigo : date2
        }
    }
    return retorno;
}

function retornaDataYY(date){
    if(date === null || date === undefined) return ''

    let dateArray = date.split('/')

    if(dateArray.length !== 3) return ''

    if(dateArray[2].length !== 4) return ''

    return dateArray[0]+'/'+dateArray[1]+'/'+dateArray[2].substring(dateArray[2].length - 2)

}

export {
    compareDateSqlString,
    retornaDataYY
}