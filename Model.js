'use strict';
class Model{
  constructor(){
    this.newNotesMetadataArray=[];
  }

  request(requestIdentifier, newNoteMetadata=null){
    if(requestIdentifier === 'getAllNotesMetadata'){
      return this.getAllNotesMetadata();
    }else if(requestIdentifier === 'addNewNote'){
      if(newNoteMetadata){
        return this.addNewNote(newNoteMetadata);
      }
    }
  }

  addNewNote(newNoteMetadata){
    this.newNotesMetadataArray.push(newNoteMetadata);
    return true;
  }

  getAllNotesMetadata(){
    return this.newNotesMetadataArray;
  }
}
