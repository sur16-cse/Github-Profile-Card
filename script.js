const api='https://api.github.com/users/'

const form=document.getElementById('form');
const search=document.getElementById('search');
const main=document.getElementById('main');
async function getUser(username){
  
    const re=await fetch(api+username);
    const dat=await re.json();
    console.log(dat);
    createCard(dat);
    getcard(username)
    // await new Promise((resolve, reject) => setTimeout(resolve, 1000));
    // createerrorCard('No profile with this username')
    
        // if(err.response.status === 404){
        //     createerrorCard('No profile with this username')
        // }
}

//  function createerrorCard(msg){
//     const cardHTML=`<div class="card">
//      <h1>${msg}</h1>
//      </div>`
//     main.innerHTML=cardHTML
//  }

 
async  function getcard(username){
    const re=await fetch(api+username+'/repos?sort=created');
    const dat=await re.json();
    addrepostocard(dat);
    // await new Promise((resolve, reject) => setTimeout(() => {
    //     createerrorCard('problem in fetching repos')
    // }, 1000));
}

function createCard(user){
    const cardHTML = `
        <div class="card">
        <div>
            <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
        </div>
        <div class="user-info">
            <h2>${user.name}</h2>
            <p>${user.bio}</p>
           <a href="${user.blog}" class="blog">Portfolio</a>
            <ul>
                <li>${user.followers}<strong>followers</strong></li>
                <li>${user.following}<strong>following</strong></li>
                <li>${user.public_repos}<strong>Repos</strong></li>
            </ul>
            <div id="repos"></div>
        </div>
    </div>
`
main.innerHTML=cardHTML
}

function addrepostocard(repos){
    const reposEle=document.getElementById('repos')
    repos.slice(0,10).forEach(
        repo=>{
            const repoEl=document.createElement('a');
            repoEl.classList.add('Repos');
            //console.log(repoEl)
            repoEl.href=repo.html_url
            //console.log(repoEl)
            repoEl.target='_blank';
            repoEl.innerText=repo.name;
            reposEle.appendChild(repoEl);
        }
    )
}


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const user=search.value;
    if(user){
        getUser(user);
        search.value='';
    }
})