let elForm = document.querySelector(".js-form");
let elInput = document.querySelector(".js-input");
let elList = document.querySelector(".js-list");
let countAll = document.querySelector(".count-all");
let countComplete = document.querySelector(".count-complete");
let countUncomplete = document.querySelector(".count-uncomplete");


let todos = []


let renderTodos = (array, node) => {
    node.innerHTML = ""
  countAll.textContent = array.length
  countComplete.textContent = array.filter(element => element.isComplete == true).length
  countUncomplete.textContent = array.filter(element => element.isComplete == false).length

    

  console.log(array);

    array.forEach(element => {
        
        
        let newItem = document.createElement("li");
        let newSpan = document.createElement("span");
        let newBtn = document.createElement("button");
        let newChekbox = document.createElement("input")
        
        
        newItem.setAttribute("class", "js-item")
        newSpan.textContent = element.title
        newSpan.setAttribute("class", "js-span")
        newBtn.textContent = "Delete"
        newBtn.setAttribute("class", "delete-btn")
        newBtn.dataset.todoId = element.id
        newBtn.innerHTML = "<i class='fas fa-trash'></i>"
        newChekbox.setAttribute("type","checkbox")
        newChekbox.setAttribute("class","check")
        newChekbox.innerHTML = "<i class='fas fa-check'></i>"
        newChekbox.dataset.todoId = element.id


        if (element.isComplete){
            newSpan.style.textDecoration = "line-through";
            newItem.style.opacity = "0.5";
            newChekbox.checked = true;
        }  
        
        
        
        newItem.appendChild(newSpan)
        newItem.appendChild(newChekbox)
        newItem.appendChild(newBtn)
        node.appendChild(newItem)
        
    });
}

elList.addEventListener("click", function (evt) {

    
    if(evt.target.matches(".delete-btn")){
        let deletedId = evt.target.dataset.todoId
        elList.innerHTML = ""
        let findedIndex = todos.findIndex((todo) => todo.id == deletedId)
        
        todos.splice(findedIndex,1)
        renderTodos(todos,elList)
    }else if (evt.target.matches(".check")){
        let checkedId = evt.target.dataset.todoId
        elList.innerHTML = "";  
        
        let findCheck = todos.find((todo) => todo.id ==  checkedId)
        
        findCheck.isComplete = !findCheck.isComplete
        renderTodos(todos,elList);
    }
    
})

elForm.addEventListener("submit", function(evt){
    evt.preventDefault()
    
    elList.innerHTML = ""
    
    let elInputVal = elInput.value.trim()
        
    let obj = {
        id: todos.length > 0 ? todos[todos.length -1].id + 1  : 1,
        title: elInputVal,
        isComplete: false,
    }

    todos.push(obj)
    renderTodos(todos, elList)
    elInput.value = ""
})
