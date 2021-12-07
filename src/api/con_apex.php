<?php
    ini_set('error_reporting',	E_ALL);
	ini_set('display_errors',	1);	
    header("Access-Control-Allow-Origin: *");
    //header("Access-Control-Allow-Origin: http://192.168.92.225");
    header("Content-type: application/json; charset=utf-8");
    
    function noinjection($var) {
        $str = addslashes($var);
        $str = htmlentities($str);
        $str = htmlspecialchars($str);
        
        $banlist = array("insert", "select", "update", "delete", "distinct", "having", "truncate", "replace","handler", "like", " as ", "or ", "procedure", "limit", "order by", "group by", "asc", "desc","'","union all");
        if(preg_match("[a-zA-Z0-9]+", $str)){
            $texto = trim(str_replace($banlist,'', strtolower($var)));
            return $texto;
        }return "";
    }
    
    //verte_saude
    //Vy4b42St
    

    function conexaoOracleApex($tipo,$sistema, $projeto, $parametros = []) {
        //CURL
        $ch = curl_init();
        
        $login = 'verte_saude';
        $password = 'Vy4b42St';
        $urlPadrao = 'http://appenf.hed.com.br:8080/ords/';
        
        switch ($tipo){
            case 'GET':
                $parametrosMont = '';
                //foreach ($parametros as $parametro){
                //    $parametrosMont .= '/'.$parametro;
                //}
                //echo $urlPadrao.$sistema."/".$projeto.$parametrosMont;
                curl_setopt($ch, CURLOPT_URL, $urlPadrao.$sistema."/".$projeto.$parametrosMont);
                break;
            default:
                curl_setopt($ch, CURLOPT_URL, $urlPadrao.$sistema."/".$projeto);
                curl_setopt($ch, CURLOPT_GET, TRUE);
                $parametrosJson = json_encode($parametros);
                curl_setopt($ch, CURLOPT_GETFIELDS, $parametrosJson);
                break;
        }
        
        
        curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
        curl_setopt($ch, CURLOPT_USERPWD, "$login:$password");        
        
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($ch, CURLOPT_HEADER, FALSE);
        
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Accept: application/json',
            'Content-Type: application/json')
            );             
        
        $response = curl_exec($ch);
        
        curl_close($ch);
        
        if($response === false){
            $a = array('type' => 'success', 'titulo' => 'Erro de conexão', 'text' => 'Conexão CURL não realizada.');
            echo json_encode($a);
            die();
        }
        
        return $response;
    }
    
    
    if(isset($_GET['tipo'])){
        
        $dados = '';//noinjection($_GET['dados']);
        
        $sistema = 'tasy';
        $projeto = $_GET['tipo'];//preg_replace('/[^[:alpha:]_]/', '',$_GET['tipo']);
        $parametros = array('dados'=>$dados);
        
        $jsonApex = conexaoOracleApex('GET', $sistema, $projeto, $parametros);
                
        $result = json_decode($jsonApex, true); 
        $result = $result['items'];

        //var_dump($result);
                
        $a = array('type' => 'success', 'items' => $result);
        echo json_encode($a);
        die();
    }
    
    function retornaTabelaVotos($dados) {       
        
        $sistema = 'verte_saude';
        $projeto = 'votacoes_detalhes_voto';
        //$parametros = array('dados'=>$dados);
        
        $jsonApex = conexaoOracleApex('GET', $sistema, $projeto, $parametros);
        $result = json_decode($jsonApex, true);
        $result = $result['items'];
        
        
        $final = "<table id=\"contratosTable\" class=\"contratacao contratacaoMod\">
	                    	<thead>
	                    		<tr class=\"head\">
	                    			<th style=\"text-align:left;\">Data</th>
	                    			<th style=\"text-align:left;\">Matrícula</th>
	                    			<th style=\"text-align:left;\">CPF</th>
                                    <th style=\"text-align:left;\">Voto</th>
	                    		</tr>
	                    	</thead>
	                    	<tbody>";
        
        if (empty($result)) {
            return;
            
        }else{
            
            foreach ($result as $item) {
                $final .= "<tr>";
                $final .="<td>".$item['data']."</td>";
                $final .="<td>".$item['matricula']."</td>";
                $final .="<td>".$item['cpf']."</td>";
                $final .="<td>".$item['voto']."</td>";
                $final .="</tr>";
            }
            
        }
        
        $final .= '</tbody></table>
		<link rel="stylesheet" href="/modules/mod_formularios/tmpl/css/jquery.dataTables.min.css" type="text/css">
		<script src="/modules/mod_formularios/tmpl/js/jquery.dataTables.min.js" type="text/javascript"></script>
		<script>';
        
        $final .= "jQuery('#contratosTable').DataTable( {    'language': {";
        $final .= "	'url': '/modules/mod_formularios/tmpl/language/Portuguese-Brasil.json'";
        $final .= "}, \"lengthChange\": false";
        $final .= "} );";
        $final .= 'setTimeout(function(){jQuery("#contratosTable_filter input[type=\'search\']").attr("placeholder", "Procurar por CPF ou Matrícula");},500);</script>';
        
        return $final;
    }
?>