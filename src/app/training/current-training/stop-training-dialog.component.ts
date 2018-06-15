import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component ({
  selector: 'app-stop-training-dialog',
    template: `
      <h1 mat-dialog-title>Are you sure you want to stop ??</h1>
      <mat-dialog-content style="align-text: center">
        <mat-icon>battery_unknown</mat-icon>
        <span>{{data.exercise.name}} {{data.progress}}% completed</span>
      </mat-dialog-content>
      <mat-dialog-actions>
        <button mat-raised-button color="primary" [mat-dialog-close]="true">Yes</button>
        <button mat-raised-button [mat-dialog-close]="false">No</button>
      </mat-dialog-actions>
    `
})
export class StopTrainingDialogComponent {
  constructor (@Inject(MAT_DIALOG_DATA) public data: any) {
  }

  answered(ans: String) {
    console.log(ans);
  }
}
