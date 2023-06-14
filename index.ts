var perfis : PerfilUsuario[] = []

interface PerfilUsuario {
    id: number,
    login: string,
    name: string,
    bio: string
    repos_url: string
    public_repos: number
    message?: 'nao encontrado'

}

var erro = 'erro'

async function getPerfil(nome:string) {
    var link = await fetch(`https://api.github.com/users/${nome}`)
    var user: PerfilUsuario = await link.json()
    if (user.message) {console.log('nao encontrado')} else {

    perfis.push(user)
    console.log(user)
    console.log(perfis)}


} 

async function coletarRepositorios(nome:string) {
    var link = await fetch(`https://api.github.com/users/${nome}`)
    var user = await link.json()
    var reps = await fetch(`${user.repos_url}`)
    var repositorios = await reps.json()
    console.log(repositorios[0])
}

function mostraUser(login) {
    const user = perfis.find(user => user.login === login)

    if (user === undefined) {
        console.log('Nao encontrado')
    } else {
        console.log(`
        Nome: ${user.name}
        Biografia: ${user.bio}
        Id: ${user.id}`)
    }
}

function mostraTodosUser() {
    var a = ''
    perfis.forEach((element, index )=> {
        {a += `Perfil ${index+1}: ${element.login}. `}
    });
    console.log(a)
}

function todosRepos() {
    var total = perfis.reduce((accum, user )=> accum + user.public_repos, 0)
    console.log(`Total de repositorios: ${total}`)
}


function topFive() {
    var top = perfis.slice().sort((a, b) => b.public_repos - a.public_repos).slice(0,5)

    top.forEach((user, index) =>
        console.log(`${index+1}° - ${user.name} (total de ${user.public_repos}) `))
}





  getPerfil('maykbrito')
  getPerfil('maycon')
  coletarRepositorios('maykbrito')
  mostraTodosUser()
  todosRepos()