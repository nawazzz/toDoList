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

// localStorage.setItem('allTodo', JSON.stringify(allTodo));
// let retrievedObject = localStorage.getItem('allTodo');
// console.log('retrievedObject: ', JSON.parse(retrievedObject));




// function for appending list upon hitting enter after entering text
function createListElement(event) {
    if (input.value === "") {
        return
    }

    let randomNumber = Math.floor(Math.random()*90000) + 10000
    let li = document.createElement("li")
    li.classList.add("listStyling")
    li.setAttribute("id", randomNumber)
    let checkboxButton = document.createElement("input")  // create checkbox button 
    checkboxButton.setAttribute("type", "checkbox")
    checkboxButton.classList.add("checkboxButton")
    let closeButton = document.createElement("span")  // create close buttom in list
    closeButton.textContent = "x"
    closeButton.classList.add("closeButton")
    if (event.keyCode === 13) {
        let obj = {
            text: input.value,
            isCompleted: false,
            id: randomNumber
        }
        let newLocalArray = JSON.parse(localStorage.getItem("allTodo"))
        if (newLocalArray) {
            newLocalArray.push(obj)
            localStorage.setItem('allTodo', JSON.stringify(newLocalArray));
        } else {
            localStorage.setItem('allTodo', JSON.stringify([obj]));
            newLocalArray = JSON.parse(localStorage.getItem("allTodo"))
        }
        console.log("local")
        for (let i = 0; i < newLocalArray.length; i++) {
            li.textContent = newLocalArray[i].text
        }
        ul.appendChild(li)
        li.appendChild(checkboxButton)
        li.appendChild(closeButton)
        input.value = "";            
    }
}

function deleteListElement(event) {
        if (event.target.nodeName === "SPAN") {
            let li = document.createElement("li")
            li.classList.add("listStyling") 
            let checkboxButton = document.createElement("input")  // create checkbox button 
            checkboxButton.setAttribute("type", "checkbox")
            checkboxButton.classList.add("checkboxButton")
            
            let closeButton = document.createElement("span")  // create close buttom in list
            closeButton.textContent = "x"
            closeButton.classList.add("closeButton")
            allTodo = allTodo.filter(function(element, index){
                if (element.id !== Number(event.target.parentNode.id)) {
                    return true;
                }
            })
            document.querySelector("ul").textContent = "";
            displayTodos(allTodo)
    }
}
window.onload = function() {
    let retrievedArray = JSON.parse(localStorage.getItem('allTodo'));
    if (retrievedArray) { 
        displayTodos(retrievedArray)
    }
}

function displayTodos(arr) {
    arr.forEach((element, index) => {
        // let retrievedArray = localStorage.getItem('allTodo');
        // console.log('retrievedArray: ', JSON.parse(retrievedArray));
        return document.querySelector("ul").innerHTML += `
          <li class="listStyling ${element.isCompleted === true ? "checked" : ""}" id="${element.id}"">${element.text}
            <input type="checkbox" class="checkboxButton" ${element.isCompleted === true ? "checked" : null}>
            <span class="closeButton">x</span>
          </li>
        `
    })
}

function toggleAsCompleted(event) {
    
    let newLocalArray = JSON.parse(localStorage.getItem("allTodo"))
    
    if (event.target.nodeName === "INPUT" && event.target.type === "checkbox") {
       let result = newLocalArray.map(function(element, index){
            if (element.id === Number(event.target.parentNode.id)) {
                // element.isCompleted = true
                return {
                    ...element,
                    isCompleted: !element.isCompleted 
                }
            } else {
                return element
            }

        })
        allTodo = result
        console.log(result)
        document.querySelector("ul").textContent = "";
        displayTodos(result)
    }
    
}


input.addEventListener("keypress", createListElement)

ul.addEventListener("click", deleteListElement)
document.addEventListener("click", toggleAsCompleted)

