var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var perfis = [];
var erro = 'erro';
function getPerfil(nome) {
    return __awaiter(this, void 0, void 0, function* () {
        var link = yield fetch(`https://api.github.com/users/${nome}`);
        var user = yield link.json();
        if (user.message) {
            console.log('nao encontrado');
        }
        else {
            perfis.push(user);
            console.log(user);
            console.log(perfis);
        }
    });
}
function coletarRepositorios(nome) {
    return __awaiter(this, void 0, void 0, function* () {
        var link = yield fetch(`https://api.github.com/users/${nome}`);
        var user = yield link.json();
        var reps = yield fetch(`${user.repos_url}`);
        var repositorios = yield reps.json();
        console.log(repositorios[0]);
    });
}
function mostraUser(login) {
    const user = perfis.find(user => user.login === login);
    if (user === undefined) {
        console.log('Nao encontrado');
    }
    else {
        console.log(`
        Nome: ${user.name}
        Biografia: ${user.bio}
        Id: ${user.id}`);
    }
}
function mostraTodosUser() {
    var a = '';
    perfis.forEach((element, index) => {
        {
            a += `Perfil ${index + 1}: ${element.login}. `;
        }
    });
    console.log(a);
}
function todosRepos() {
    var total = perfis.reduce((accum, user) => accum + user.public_repos, 0);
    console.log(`Total de repositorios: ${total}`);
}
function topFive() {
    var top = perfis.slice().sort((a, b) => b.public_repos - a.public_repos).slice(0, 5);
    top.forEach((user, index) => console.log(`${index + 1}° - ${user.name} (total de ${user.public_repos}) `));
}
getPerfil('maykbrito');
getPerfil('maycon');
coletarRepositorios('maykbrito');
mostraTodosUser();
todosRepos();
