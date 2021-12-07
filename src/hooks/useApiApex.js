const useApiApex = async(consulta,mock = false, setItemsApex, firstItem = false) => {
  
    if(mock !== false){
      setItemsApex(mock)
    }else{
        await fetch("http://192.168.92.225:8080/con_apex.php?"+consulta) // fetch("http://appenf.hed.com.br:8080/ords/tasy"+consulta)
          .then(res => res.json())
          .then(
            (result) => {
              if(firstItem){
                setItemsApex(result.items[0])
                return result.items[0]
              }else{
                setItemsApex(result.items)
                return result.items
              }
            },
            (error) => {
              console.log('Erro consulta API APEX')
            }
          )
    }
}

export default useApiApex;