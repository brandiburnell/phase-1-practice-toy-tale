let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  // make a GET request to fetch all the toy objects
  fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(toys => {
      // console.log(toys);
      toys.forEach(toy => {
        addToyCard(toy);
      });
    });

    // add a new toy using POST request vie fetch() 
    document.querySelector(".container").addEventListener("submit", e => {
      e.preventDefault();
      // console.log(e);
      createNewToy(e);
    });

    // increase likes using PATCH method

});
  

// process initial toy data from server and make a card to add to website
function addToyCard(toyObject) {
  let toyDiv = document.createElement("div");
  toyDiv.className = "card";
    // add name
    let toyName = document.createElement("h2");
    toyName.textContent = toyObject.name;
    toyDiv.append(toyName);
  // add image
  let img = document.createElement("img");
  img.src = toyObject.image;
  img.className = "toy-avatar";
  toyDiv.appendChild(img);
  // add likes
  let likeP = document.createElement("p");
  likeP.textContent = toyObject.likes + " Likes";
  toyDiv.appendChild(likeP);
  // add button
  let btn = document.createElement("button");
  btn.className = "like-btn";
  btn.textContent = "like";
  btn.id = toyObject.id;
  toyDiv.appendChild(btn);


  // add listener to update likes
  toyDiv.querySelector(".like-btn").addEventListener("click", e => {
    // console.log(e);
    // console.log(likeP);
    console.log(e.target.previousElementSibling.innerText.substring(0,1));
    updateLikes(e);
  })

  // add toy to website
  document.querySelector("#toy-collection").appendChild(toyDiv);

  // console.log(toyDiv);
  // console.log(toyObject);
}

function updateLikes(e) {
  let likeCount = Number(e.target.previousElementSibling.innerText.substring(0,1)) + 1;
  console.log(likeCount);
  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": likeCount
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
  })
}

function generateConfigurationObject(toyEvent) {
  const configurationObject = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(newToyData)
  };
  console.log(toyEvent);
}

// create a new toy
function createNewToy(event) {
  console.log(event.target.name.value);
  let newToyObj = {
    name: event.target.name.value,
    image: event.target.image.value,
    likes: 0,
  }
  addToyCard(newToyObj);
}

// post the new toy to the dom
function postNewToy(newToyObj) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(newToyObj)
  })
  .then(res => res.json())
  .then(toy => console.log(toy));
}

