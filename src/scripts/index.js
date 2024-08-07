import { getUser } from "./services/user.js";
import { getReposìtories } from "./services/repositories.js";
import { user } from "./objects/user.js";
import { screen } from "./objects/screen.js";
import { getEvents } from "./services/events.js";

document.getElementById('btn-search').addEventListener('click', ()=>{
    const userName = document.getElementById('input-search').value
    if(validateEmpytInput(userName)) return
   getUserData(userName)
})
 
document.getElementById('input-search').addEventListener('keyup', (e)=>{
    const userName =  e.target.value;
    const key = e.which || e.keyCode
    const isEnterKeyPeessed = key === 13

    if(isEnterKeyPeessed){
        if(validateEmpytInput(userName)) return
        getUserData(userName)
    }
})

function validateEmpytInput(userName){
    if(userName.length === 0){
        alert('Preencha o campo com o nome de usuário do GitHub')
        return true
    }
}


async function getUserData(userName){
   
   const userResponse = await getUser(userName)

   if(userResponse.message === "Not Found"){
        screen.renderNotFound()
        return
   }

   const repositoriesResponse = await getReposìtories(userName)
   const eventsResponse = await getEvents(userName)
   
   user.setInfo(userResponse)
   user.setRepositories(repositoriesResponse)
   user.setEvents(eventsResponse)
   screen.renderUser(user)
   
   
}


