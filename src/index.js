let addToy = false;
const toyContainer = document.getElementById('toy-collection')
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const createAToyForm = document.querySelector(".add-toy-form")
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

function getAllToys(){
  return fetch ('http://localhost:3000/toys')
  .then(response => response.json())

  }
    

function renderOneToy(eachToy){
  // console.log(eachToy)
  // console.log(eachToy.id)
  let div = document.createElement('div')
  div.className = 'card'
  let h2 = document.createElement('h2')
  h2.innerText = eachToy.name
  let img = document.createElement('img')
  img.src = eachToy.image
  img.className = 'toy-avatar'
  let p = document.createElement('p')
  // p.id = 'numberOfLikes'
  p.innerText = `${eachToy.likes} Likes`
  let button = document.createElement('button')
  button.className = 'like-btn'
  button.innerText = "Like ❤️"
  button.setAttribute('id', eachToy.id)
  button.addEventListener('click', (event) => {buttonClicked(event), console.log(event.id)})
div.append(h2, img, p,button)
  toyContainer.append(div)
}
getAllToys().then (toys => {
  toys.forEach(toy => {
    renderOneToy(toy)
  })
})
function buttonClicked(e) {
  e.preventDefault()
  let more = parseInt(e.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"

      },
      body: JSON.stringify({
        "likes": more
      })
    })
    .then(res => res.json())
    .then((like_obj => {
      e.target.previousElementSibling.innerText = `${more} likes`;
    }))
}

createAToyForm.addEventListener('submit', addAToy)
function addAToy(e){
  e.preventDefault()
  console.log(e)
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers:
    {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
      body: JSON.stringify({
        "name": e.target.name.value,
        "image": e.target.image.value,
        "likes": 0
      })

      })
      .then(response => response.json())
      .then(data => {
        renderOneToy(data)
  })
}

