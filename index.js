'use strict';
let ul = document.querySelector('#list');
let editPencils = document.querySelectorAll('.fa-pencil');
let xMarks = document.querySelectorAll('.fa-circle-xmark');


function controller(event){
  console.log(event);
  if(event.target.nodeName === 'LI'){
    view(event, 'moveStickyNote');
  }else if(event.target.nodeName === 'I' && event.target.classList.contains('fa-pencil')){
    view(event, 'editTextContentOfStickyNote');        
  }else if(event.target.nodeName === 'I' && event.target.classList.contains('fa-circle-xmark')){
    console.log('X clicked');
  }
}

function view(event, operation){
  if(operation === 'moveStickyNote'){
    moveNote(event);
  }else if(operation === 'editTextContentOfStickyNote'){
    allowEdit(event);
  }
}

function model(){

}

function moveNote(event){
  let li = event.target;
  // console.log(event);
  // console.log(event.clientX - li.clientWidth)
  let newTop = event.clientY;
  // console.log(newTop, document.documentElement.scrollHeight);
  if(newTop < 0){
    newTop =10;
  }else if(newTop+li.clientHeight >= document.documentElement.scrollHeight){
    // console.log('ooo');
    newTop=document.documentElement.scrollHeight - li.clientHeight-10;
    // newTop=20;
  }

  let newLeft = event.clientX - li.clientWidth;
  // console.log(newLeft, document.documentElement.scrollWidth);
  if(newLeft < 0){
    newLeft =10;
  }else if(newLeft+li.clientWidth >= document.documentElement.scrollWidth){
    // console.log('ooo')
    newLeft=document.documentElement.scrollWidth-li.clientWidth-20;
  }        
  
  li.style.position = 'absolute';
  li.style.left = `${newLeft}px`;
  li.style.top = `${newTop}px`;
}


function attachEventListeners(){
  ul.addEventListener('dragend', (event)=>{controller(event)});
  editPencils.forEach((pencil)=>{pencil.addEventListener('click', (event)=>controller(event))});
  xMarks.forEach((xMark)=>{xMark.addEventListener('click', (event)=>controller(event))});
  // console.log(editPencils)
}
// Attaching 
  attachEventListeners();


function allowEdit(event){
  // console.log('pencil clicked', event.target);
  let pencil = event.target;
  let textArea = event.target.parentNode.parentNode.childNodes[1];
  if(textArea.hasAttribute('readonly')){
    textArea.removeAttribute('readonly');
    textArea.classList.add('editing');
    pencil.classList.add('markPencilActive');
  }else{
    textArea.setAttribute('readonly', '');    
    textArea.classList.remove('editing');
    pencil.classList.remove('markPencilActive');
  }
}