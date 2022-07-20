import AclRouter from 'react-acl-router';
import { useAuth, useAuthoritiesUser } from './hooks/useApiAuthHed'
import Login from './components/Utilitarios/LoginPages/Login';
import PainelCirurgia from './components/PainelCirurgia/PainelCirurgia'
import PainelEmergenciaPA from './components/Laboratorio/PainelEmergenciaPA/PainelEmergenciaPA'
import Unauthorized from './components/Utilitarios/ErrorPages/Unauthorized';
import Pagina404 from './components/Utilitarios/ErrorPages/Pagina404';
import Home from './components/Utilitarios/Home/index';
import { authoritiesAclChecklist, authoritiesAclPainelEmergencia, authoritiesAclMasters } from './helpers/useGruposACL';
 
const authorizedRoutes = [{
  path: '/PainelChecklistCirurgias/:painel',
  exact: true,
  permissions: authoritiesAclChecklist(),
  redirect: '/login',
  component: () => <PainelCirurgia /> ,
  unauthorized: Unauthorized,
}, {
  path: '/PainelEmergenciaPA',
  exact: true,
  permissions: authoritiesAclPainelEmergencia(),
  redirect: '/login',
  component: () => <PainelEmergenciaPA card="PC" /> ,
  unauthorized: Unauthorized,
}, {
  path: '/PainelTVEmergenciaPA',
  exact: true,
  permissions: authoritiesAclPainelEmergencia() ,
  redirect: '/login',
  component: () => <PainelEmergenciaPA card="TV" /> ,
  unauthorized: Unauthorized,
}, {
  path: '/',
  exact: true,
  permissions: authoritiesAclMasters(),
  redirect: '/login',
  component: Home,
  unauthorized: Unauthorized,
}];
 
const normalRoutes = [{
  path: '/login',
  exact: true,
  component: () => <Login /> ,
}];

const Router = (props) => {
  
  const user = useAuth()

  return (
          <AclRouter
            // sync user authorities with the user data in your application
            authorities={ useAuthoritiesUser(user) }
            authorizedRoutes={authorizedRoutes}
            //uthorizedLayout={BasicLayout}
            normalRoutes={normalRoutes}
            //normalLayout={NormalLayout}
            notFound={ Pagina404 }
          /> 
      )
};
 
export default Router;