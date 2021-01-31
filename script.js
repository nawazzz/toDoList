// create h1 element for heading "todos"
let h1 = document.createElement("h1")
h1.textContent = "todos"
document.body.appendChild(h1)

// create a div element
let div = document.createElement("div")
div.classList.add("parentOfInput")
document.body.appendChild(div)

// create ul
let ul = document.createElement("ul")
document.body.appendChild(ul)
ul.classList.add("ulStyling")

// create input element for the search box and append it in the div element as child
let input = document.createElement("input")
input.placeholder = "What needs to be done?"
div.appendChild(input)
// add class and attribute to the input element for styling
input.classList.add("searchBox")
input.setAttribute("autofocus", "")



// create an array to save the input values
allTodo = []


// function for appending list upon hitting enter after entering text
function createListElement(event) {
    if (input.value === "") {
        return
    }
    let randomNumber = Math.floor(Math.random()*90000) + 10000
    let li = document.createElement("li")
    li.classList.add("listStyling")
    li.setAttribute("id", randomNumber)
    let radioButton = document.createElement("input")  // create radio button 
    radioButton.setAttribute("type", "radio")
    radioButton.classList.add("radioButton")
    let closeButton = document.createElement("span")  // create close buttom in list
    closeButton.textContent = "x"
    closeButton.classList.add("closeButton")
    if (event.keyCode === 13) {
        let obj = {
            text: input.value,
            isCompleted: false,
            id: randomNumber
        }
        allTodo.push(obj)
        for (let i = 0; i < allTodo.length; i++) {
            li.textContent = allTodo[i].text
        }
        ul.appendChild(li)
        li.appendChild(radioButton)
        li.appendChild(closeButton)
        input.value = ""               
    }
}

function deleteListElement(event) {
        // console.dir(event)
        let li = document.createElement("li")
        li.classList.add("listStyling") 
        let radioButton = document.createElement("input")  // create radio button 
        radioButton.setAttribute("type", "radio")
        radioButton.classList.add("radioButton")
        if (event.target.nodeName !== "SPAN") {
            return
        }
        



        let closeButton = document.createElement("span")  // create close buttom in list
        closeButton.textContent = "x"
        closeButton.classList.add("closeButton")
    // console.log(event)listStyling
        allTodo = allTodo.filter(function(element, index){
        if (element.id !== Number(event.target.parentNode.id)) {
            return true;
        }
    })
        document.querySelector("ul").textContent = "";

        console.log(allTodo)

        allTodo.forEach((element, index) => {
          return document.querySelector("ul").innerHTML += `
            <li class="listStyling" id="${element.id}"">${element.text}
              <input type="radio" class="radioButton">
              <span class="closeButton">x</span>
            </li>
          `
        })
}

input.addEventListener("keypress", createListElement)

ul.addEventListener("click", deleteListElement)

