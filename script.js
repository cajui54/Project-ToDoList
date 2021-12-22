const btnAddTaskList = document.getElementById('criar-tarefa');
let listTask = document.getElementById('lista-tarefas');
let btnClearListTask = document.getElementById('apaga-tudo');
let btnRemoveElementsSelected = document.getElementById('remover-finalizados');
let btnSaveStorege = document.getElementById('salvar-tarefas');
let $form = document.querySelector('frm-list');
let btnUp = document.getElementById('mover-cima');
let btnDown = document.getElementById('mover-baixo');
let btnRemoveItemSelect =document.getElementById('remover-selecionado');
let $inputTask = document.getElementById('texto-tarefa');
let containerInfo = document.querySelector('.container-info');
let allBtns = document.querySelectorAll('.contaner-button button');

$inputTask.addEventListener('keyup', (event)=>{
    if(event.keyCode == 13){
        setTask();
    }
});

allBtns.forEach((_button)=>{
    _button.addEventListener('mouseout',()=>{
        setInfo("");
    });
});

allBtns.forEach((_button)=>{
    _button.addEventListener('mouseover',()=>{
        setInfo(_button.value);
        
    })
});
function setInfo(_value){
    containerInfo.innerText = _value;
    containerInfo.style.transition = "all 2s";
}

function getLis(){
    let arrLis = document.querySelectorAll('#lista-tarefas li');
    return arrLis;
}

function loadItemsList(){
    let itemTask = getLis();
    for(let index = 0; index < itemTask.length; index+=1){
        itemTask[index].addEventListener('click',selectedTask);
    }
}
function getInputText(){
    let inputTask = document.getElementById('texto-tarefa');
    return inputTask;
}
btnAddTaskList.addEventListener('click',setTask);
function setTask(){
    let input = getInputText();
    if(input.value != ''){
        insertTaskinList(input);
        clearField();
        loadItemsList();
        markDoneTask();
   }
}

function clearField(){
    document.getElementById('texto-tarefa').value = "";
}
function selectedTask(){
    let _tasklis = getLis();
    _tasklis.forEach((li)=>{
        //li.style.backgroundColor = '#fff';
        li.classList.remove('selected');
        li.classList.add('selectedRemove');
    });
    //this.style.backgroundColor = 'rgb(128, 128, 128)';
    this.classList.remove('selectedRemove');
    this.classList.toggle('selected');
    
}
function markDoneTask(){
    let _taskDone = getLis();
    for(let index = 0; index < _taskDone.length; index+=1){
        _taskDone[index].addEventListener('dblclick' ,lineThrough);
    }
}
function lineThrough(){
    this.classList.toggle('completed');
}
btnClearListTask.addEventListener('click',()=>{
    localStorage.clear();
    listTask.innerHTML = '';
    
});
btnRemoveElementsSelected.addEventListener('click',()=>{
    let getAllWithCompleted = document.querySelectorAll('.completed');
    getAllWithCompleted.forEach((element)=>{
        //html
        listTask.removeChild(element);
    });
    loadItemsList();
});

function insertTaskinList(_inputTask){
    let createLi = document.createElement('li');
    createLi.innerHTML = '<i class="fas fa-pen-square"></i>' +_inputTask.value;
    listTask.appendChild(createLi);
}
//localStorage
btnSaveStorege.addEventListener('click', saveInStorage);

function saveInStorage(){
    let itemTask = document.querySelectorAll('#lista-tarefas li');
    let arrTask = [];

    for(let index = 0; index < itemTask.length; index+=1){

        arrTask[index] = itemTask[index].outerHTML;
    }
    console.log(arrTask);
    localStorage.setItem('listOfTasks',JSON.stringify(arrTask));
}

function loadStorageList(){ 
    listTask.innerText = '';
    let tasks = [];
    if(localStorage.getItem('listOfTasks')){
        tasks = JSON.parse(localStorage.getItem('listOfTasks'));
        tasks.forEach((element) =>{
            loadItemsOfStorage(element);
        });
    } 
}

function loadItemsOfStorage(_li){
    let li = _li;
    listTask.innerHTML += li;
}
btnDown.addEventListener('click', ()=>{
    let lis = getLis();
    let getSelected = document.querySelector('.selected');
    let getNext = document.querySelector('.selected + li');
    if(getSelected != null){
        if(getSelected != lis[lis.length-1]){
            listTask.insertBefore(getSelected, getNext.nextSibling); 
         }
    } 
});
btnUp.addEventListener('click', ()=>{
    let lis = getLis();
    let getSelected = document.querySelector('.selected');

    if(getSelected != null){
        if(getSelected != lis[0]){
            listTask.insertBefore(getSelected, getSelected.previousSibling);
        }    
    }
});
btnRemoveItemSelect.addEventListener('click', ()=>{
    let getSelected = document.querySelector('.selected');
    listTask.removeChild(getSelected);
});

loadStorageList();
markDoneTask();
//atualiza list item select
loadItemsList();


