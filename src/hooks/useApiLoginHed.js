//const useApiLoginHed = {  
    export const doLogin = async(dados, setItemsLogin, setError) => {
      const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: { 
          'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      };
      //await fetch("http://192.168.92.225:3001/login", requestOptions)
      await fetch("http://localhost:3001/login", requestOptions)
      .then(res => res.json())
      .then(function(result) {
        //console.log('HEADER>>>>', result)
        if(result.auth === true){
          localStorage.setItem('token',result.token)
          localStorage.setItem('refreshToken',result.token)
          setItemsLogin(true)
        }else{
          setError({auth: false, error: true, msg: JSON.stringify(result.erro)})
        }
        if(result.auth === true) setItemsLogin(true)
        else setError({auth: false, error: true, msg: JSON.stringify(result.erro)})
      })
      .catch(function(error) {
        setError({auth: false, error: true, msg: 'Erro consulta API LOGIN HED: '+error})
      })
    }
    export const verifyLogin = async()=> {
      return new Promise(async (resolve,reject)=>{
        const token = localStorage.getItem('token')
        const refreshToken = localStorage.getItem('refreshToken')

        if(!token || !refreshToken) reject(false)

        let dados = {}
        const requestOptions = {
          method: 'POST',
          mode: 'cors',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+refreshToken },
          body: JSON.stringify(dados)
        };
        //await fetch("http://192.168.92.225:3001/login", requestOptions)
        await fetch("http://localhost:3001/verificaToken", requestOptions)
        .then(res => res.json())
        .then(function(result) {
          //console.log('HEADER TOKEN>>>>', result)
          resolve(result)
        })
        .catch(function(error) {
          //console.log('ERROR TOKEN>>>>', error)
          reject(error)
        })
      })
    }
    export const requestDataToken = async(reqServer,dados = {})=> {
      const token = localStorage.getItem('token')
      const refreshToken = localStorage.getItem('refreshToken')

      if(!token || !refreshToken) return false

      const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+refreshToken },
        body: JSON.stringify(dados)
      };
      //await fetch("http://192.168.92.225:3001/login", requestOptions)
      await fetch("http://localhost:3001/"+reqServer, requestOptions)
      .then(res => res.json())
      .then(function(result) {
        //console.log('RESULT >>>>', result)
        if(result.auth === true){
          return result.data
        }else{
          return false
        }
      })
      .catch(function(error) {
        return false  
      })
    }
