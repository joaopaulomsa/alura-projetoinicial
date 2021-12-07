<?php

//ini_set('error_reporting',	E_ALL);
//ini_set('display_errors',	1);	

header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Origin: http://192.168.92.225");
header("Content-type: application/json; charset=utf-8");

function acaoNegada($tipoErro){
    $a = array('res' => 'error', 'type' => $tipoErro);
    echo json_encode($a);
    die();
}

function acaoLogout(){
    $_SESSION = array();
    $a = array('res' => 'success', 'type' => 'permission_logout');
    echo json_encode($a);
    die();
}

function acaoLogin($username = null, $password = null){

    if($username !== null && $password !== null){

        $adServer = "192.168.92.39";
        
        $ldap = ldap_connect($adServer);
        $perfil = '';
        $ldaprdn = 'redeafpergs' . "\\" . $username;
    
        ldap_set_option($ldap, LDAP_OPT_PROTOCOL_VERSION, 3);
        ldap_set_option($ldap, LDAP_OPT_REFERRALS, 0);
    
        $bind = @ldap_bind($ldap, $ldaprdn, $password);
    
        if ($bind) {
            $filter="(sAMAccountName=$username)";
            $result = ldap_search($ldap,"dc=MYDOMAIN,dc=COM",$filter);
            ldap_sort($ldap,$result,"sn");
            $info = ldap_get_entries($ldap, $result);
            /*for ($i=0; $i<$info["count"]; $i++)
            {
                if($info['count'] > 1)
                    break;
                echo "<p>You are accessing <strong> ". $info[$i]["sn"][0] .", " . $info[$i]["givenname"][0] ."</strong><br /> (" . $info[$i]["samaccountname"][0] .")</p>\n";
                echo '<pre>';
                var_dump($info);
                echo '</pre>';
                $userDn = $info[$i]["distinguishedname"][0]; 
        
            }*/
            $perfil = retorna_perfil($username,$password);
            if ($perfil !== "restrito"){
                $_SESSION['autorizacao'] = TRUE;
                $_SESSION['logado'] = time();
                $_SESSION['usuario'] = $username;  
                $a = array('res' => 'success', 'type' => 'permission_login');
                echo json_encode($a);
                die();
                //@ldap_close($ldap);}
            } else acaoNegada('permission_denied'); 
        }else acaoNegada('permission_ldap_not_found');
    }else acaoNegada('permission_denied_user_pass_null');
}

function retorna_perfil($user,$pass){ 
    $ldapconfig['host']="192.168.92.39";
    $ldapconfig['port']="389"; #PORTA
    $grupo='dc=redeafpergs,dc=local';
    $domain = 'redeafpergs';
    $arr = array("g.painel.acesso");
    $retorno = 0;
    foreach ($arr as $value) {
        $filtro="(&(objectCategory=user)(sAMAccountname=$user)(memberOf=CN=$value,OU=@grupos de acesso,DC=redeafpergs,DC=local))";
        $ds=ldap_connect($ldapconfig['host'], $ldapconfig['port']);
        ldap_set_option($ds, LDAP_OPT_PROTOCOL_VERSION, 3);
        ldap_set_option($ds, LDAP_OPT_REFERRALS, 0);
        
        $bind=ldap_bind($ds, $user .'@'.$domain, $pass);
        
        $pesquisa = ldap_search($ds,$grupo,$filtro) or acaoNegada('permission_ldap_denied');
        $info = ldap_get_entries($ds, $pesquisa);
        $retorno=ldap_count_entries($ds,$pesquisa);

        if ($retorno == 1) {
            return $value;
            break;
        }
        return "restrito"; 
    }
}

session_start();

if(isset($_POST['acaoLoginUsuario'])){

    $acaoLoginUsuario = $_POST['acaoLoginUsuario'];
    if(isset($_POST['usuarioLogin'])) $userLoginUsuario = filter_var($_POST['usuarioLogin']);
    if(isset($_POST['senhaLogin'])) $passLoginUsuario = filter_var($_POST['senhaLogin']);
    switch($acaoLoginUsuario){
        case 'login': acaoLogin($userLoginUsuario,$passLoginUsuario); break;
        case 'logout': acaoLogout(); break;
        default: acaoNegada('permission_denied'); break;
    }
    
}else{

    if(!isset($_SESSION) || empty($_SESSION)
    || !isset($_SESSION['autorizacao']) || $_SESSION['autorizacao'] == null || $_SESSION['autorizacao'] != TRUE
    || !isset($_SESSION['logado']) || $_SESSION['logado'] == null || $_SESSION['logado'] == ''
    || !isset($_SESSION['usuario']) || $_SESSION['usuario'] == null || $_SESSION['usuario'] == ''){
        acaoNegada('permission_denied');
    } else{
        $a = array('res' => 'success', 'type' => 'permission_login');
        echo json_encode($a);
        die();
    }
}