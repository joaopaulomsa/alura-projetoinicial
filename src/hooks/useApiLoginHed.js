const useApiLoginHed = async(dados, setItemsLogin, setError) => {

  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: { 
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('refreshToken') },
    body: JSON.stringify(dados)
  };
  await fetch("http://192.168.92.225:3000/login", requestOptions)
    .then(res => res.json())
    .then(
      (result) => {
          //console.log(result)
          if(result.auth === true){
            localStorage.setItem('token',result.token)
            localStorage.setItem('refreshToken',result.token)
            setItemsLogin(true)
          }else{
            setError({auth: false, error: true, msg: JSON.stringify(result.erro)})
          }
      
      },
      (error) => {
        setError({auth: false, error: true, msg: 'Erro consulta API LOGIN HED: '+error})
      }
    )
}

export default useApiLoginHed;