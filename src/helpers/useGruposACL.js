import moment from "moment"

const authoritiesAclMasters = () => {
    let grupos = [
        'g.hed.webmaster'//, 'g.painel.acesso'
    ] 
    return grupos
}

const authoritiesAclChecklist = () => {
    let grupos = [
        'g.painel.checklist'
    ]
    return [...grupos,...authoritiesAclMasters() ];
}

const authoritiesAclPainelEmergencia = () => {
    let grupos = [
        'g.painel.acesso'
    ]
    return [ ...grupos, ...authoritiesAclMasters() ];
}


export {
    authoritiesAclChecklist,
    authoritiesAclPainelEmergencia,
    authoritiesAclMasters
}