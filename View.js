'use strict';
class View{
  constructor(){

  }
  request(event=null, operation, newNotesMetadataArray=null){
    if(operation){
      if(operation === 'moveStickyNote'){
        this.moveNote(event);
      }else if(operation === 'editTextContentOfStickyNote'){
        this.allowEdit(event);
      }else if(operation === 'deleteCurrentStickyNote'){
        this.deleteCurrentStickyNote(event);
      }else if(operation === 'updateTextAreaColor'){
        this.updateTextAreaColor(event);
      }else if(operation === 'reDrawAllTheStickyNotes'){
        this.reDrawAllTheStickyNotes(newNotesMetadataArray);
      }
    }
  }

  reDrawAllTheStickyNotes(newNotesMetadataArray){
    newNotesMetadataArray.forEach((newNoteMetadata)=>{
      console.log(newNoteMetadata);
    //   <li draggable="true">
    //   <h2>Financial Freedom Plan</h2>
    //   <textarea spellcheck="false" readonly>Generate ₹1 Lakh/month passive income from Stock Market and Real Estate.</textarea>
    //   <div class="wrapperActionButtons">
    //     <i class="fa-duotone fa-circle-xmark"></i>
    //     <i class="fa-solid fa-arrows-up-down-left-right"></i>        
    //     <i class="fa-duotone fa-pencil"></i>
    //   </div>
    // </li>
      let ul = document.querySelector('#list');
      ul.innerHTML=null;
      let li = document.createElement('li');
      li.setAttribute('draggable', true);
        let h2 = document.createElement('h2');
          h2.textContent = newNoteMetadata.title;          
          li.appendChild(h2);
        let textArea = document.createElement('textarea');
          textArea.setAttribute('spellcheck', false);
          textArea.setAttribute('readonly','');
          textArea.style.backgroundColor = newNoteMetadata.backgroundColor;
          textArea.value = newNoteMetadata.desription;
          li.appendChild(textArea);
        let div = document.createElement('div');
          div.setAttribute('class', 'wrapperActionButtons');        
          div.style.top=`${h2.height}px`;
            let xMark = document.createElement('i');
              xMark.setAttribute('class', 'fa-duotone fa-circle-xmark');
              div.appendChild(xMark);
            let move = document.createElement('i');
              move.setAttribute('class', 'fa-solid fa-arrows-up-down-left-right');
              div.appendChild(move);
            let editPencil = document.createElement('i');
              editPencil.setAttribute('class', 'fa-duotone fa-pencil');
              div.appendChild(editPencil);
            li.appendChild(div);
        ul.appendChild(li);
      console.log(li);

      // Reposition x, move and pencil
      setTimeout(()=>{
        div.style.top=`${h2.offsetHeight}px`;
        // Attaching events
          editPencil.addEventListener('click', (event)=>controller.request(event));
          xMark.addEventListener('click', (event)=>controller.request(event));
      },0);
      

    });
  }

  updateTextAreaColor(event){
    // event.target.parentNode.parentNode.childNodes[3].style.backgroundColor = event.target.value;

    // console.log(event.target.parentNode.parentNode.childNodes[3]);
    let newStyle = `background-color:${event.target.value};`;
    event.target.parentNode.parentNode.childNodes[3].setAttribute('style', newStyle);
  }

  moveNote(event){
    let li = event.target;
    // console.log(event);
    // console.log(event.clientX - li.clientWidth)
    // console.log(event.target.parentNode)
    let newTop = event.clientY;
    console.log(newTop, newTop+li.clientHeight);
    if(newTop < 0){
  
      newTop =10;
    }else if(newTop+li.clientHeight >= document.documentElement.scrollHeight){
      console.log('ooo');
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

  allowEdit(event){
    console.log('pencil clicked', event.target);
    let pencil = event.target;
    // console.log(event.target.parentNode.parentNode.childNodes);
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

  deleteCurrentStickyNote(event){
    event.target.parentNode.parentNode.remove();
  }
}
