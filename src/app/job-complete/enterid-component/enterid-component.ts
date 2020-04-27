import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject } from '@angular/core';

export interface EnterID{
    id: string;
  }


@Component({
    selector: 'enter-tag-dialog',
    templateUrl: 'enter-tag-dialog.html',
  })
  export class EnterTagDialog {
   
    constructor(
      public dialogRef: MatDialogRef<EnterTagDialog>,
      @Inject(MAT_DIALOG_DATA) public data: EnterID) {
      }
  
    clear(){
        this.data.id="";
      }


    onNoClick(): void {
      
      this.dialogRef.close();
    }
  
  }