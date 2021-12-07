const useApiLoginHed = async(dados, setItemsLogin, setError) => {

  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: { 
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-access-token': localStorage.getItem('refreshToken') },
    body: JSON.stringify(dados)
  };
  await fetch("http://localhost", requestOptions)
    .then(res => res.json())
    .then(
      (result) => {
          
          if(result.auth === true){
            localStorage.setItem('token',result.token)
            localStorage.setItem('refreshToken',result.token)
            setItemsLogin(true)
          }else{
            setError({auth: false, error: true, msg: result.message})
          }
      
      },
      (error) => {
        setError({auth: false, error: true, msg: 'Erro consulta API LOGIN HED: '+error})
      }
    )
}

export default useApiLoginHed;