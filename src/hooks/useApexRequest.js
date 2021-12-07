import {useState, useEffect} from 'react';
function useApexRequest(consulta,mock = false) {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if(mock !== false){
        setIsLoaded(true);
        setItems(mock);
    }else{
        fetch("http://192.168.92.225:8080/con_apex.php?"+consulta)
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              //result.items.cirurgia = "235795"
              //console.log(result.items);
              setItems(result.items);
            },
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
    }
  }, [])
  return [error, isLoaded, items];
}
export default useApexRequest;
