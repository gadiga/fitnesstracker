import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StopTrainingDialogComponent } from './stop-training-dialog.component';
import { TrainingService } from '../../services/training.service';
import { Exercise } from '../../models/exercise.model';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  color = 'blue';
  value = 0;
  mode = 'determinate';
  trainingInterval: any;
  comment = 'Good luck';
  status: Exercise['state'];
  currentTraining: Exercise;
  @Output() stoppedTraining: EventEmitter<any> = new EventEmitter<any>();

  constructor(private dialog: MatDialog, private trainingService: TrainingService) { }

  ngOnInit() {
    this.currentTraining = this.trainingService.getCurrentExercise();
    this.startTraining();
  }

  startTraining () {
    const interval = (this.currentTraining.duration / 100) * 1000;
    this.trainingInterval = setInterval(() => {
      this.value = this.status === 'paused' ? this.value : this.value += 1;
      switch (this.value) {
        case 50:
          this.comment = 'Good going....Keep it up';
          this.color = 'gray';
          break;
        case 70:
          this.comment = 'Great job....almost there';
          this.color = 'orange';
          break;
        case 100:
          this.comment = 'You did it!!';
          this.status = 'completed';
          this.color = 'green';
          this.updateExerciseStatus();
          break;
         default:
          this.comment = 'Keep going.....';
          this.color = 'lightgreen';
      }
      if (this.value >= 100) {
        setTimeout(() => {
          this.stopTraining();
          this.stoppedTraining.emit({status: this.status});
        }, 1500);
      }
    }, interval);
  }

  updateExerciseStatus () {
    this.currentTraining.duration = this.value;
    this.currentTraining.state = this.status;
    this.trainingService.completeExercise(this.currentTraining);
  }



  stopTraining() {
    if (this.value < 100) {
      this.comment = 'Ohh come on...why???';
      this.status = 'cancelled';
      this.updateExerciseStatus();
    }
   clearInterval(this.trainingInterval);
  }

  openDialog () {
    this.status = 'paused';
    const dialogRef = this.dialog.open(StopTrainingDialogComponent,
      {data: {exercise: this.currentTraining, progress: this.value}});
    dialogRef.afterClosed().subscribe (result => {
      if (result === true) {
        this.stopTraining();
      } else {
        this.status = 'ongoing';
        this.startTraining();
      }
    });
  }

}
