'use strict';
let view = new View();
let model = new Model();
let controller = new Controller(view, model);

///
  let textAreas = document.querySelectorAll('textarea');
  
  textAreas.forEach((textarea)=>textarea.addEventListener('mouseup', (event)=>textAreaResized(event)));
  function textAreaResized(event){
    let h2 = event.target.parentNode.childNodes[1];
    let wrapperActionButtons= event.target.parentNode.childNodes[5];
    h2.style.width=`${event.target.clientWidth}px`;
    wrapperActionButtons.style.top=`${h2.clientHeight}px`;
    // console.log('textAreaResized', event);
  }
///



function attachEventListeners(){

  let ul = document.querySelector('#list');
  let newNoteColorSelectedByUser = document.querySelector('#newNoteColorSelectedByUser');
  let addNewNote = document.querySelector('#addNewNote');
  let inputNewNoteTitle = document.querySelector('#newNoteTitle');
  let newNoteDescription = document.querySelector('#newNoteDescription');
  // Attaching event listeners
    ul.addEventListener('dragend', (event)=>{controller.request(event)});
    
    newNoteColorSelectedByUser.addEventListener('input', (event)=>controller.request(event, 'updateTextAreaColor'));
    addNewNote.addEventListener('click', (event)=>{
      let newNoteMetadata ={
        title : inputNewNoteTitle.value,
        backgroundColor: newNoteColorSelectedByUser.value,
        desription: newNoteDescription.value,
        timeStamp: computeTodayDate()
      };
      // console.log(newNoteMetadata)
      controller.request(null, 'addNewNote', newNoteMetadata)
    });
  // console.log(editPencils)
}
// invoke and attach 
  attachEventListeners();



function computeTodayDate(){
  let date= new Date();
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    minute: "numeric",
    hour: "numeric",
  };
  return date.toLocaleString("en-US", options);
}

