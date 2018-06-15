import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../services/training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  onGoingTraining = false;
  onGoingExercise: any;

  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.trainingService.exerciseChanged.subscribe(result => {
      if (result) {
        this.onGoingTraining = true;
        console.log('ongoingtrue');
      } else {
        this.onGoingTraining = false;
        console.log('ongoingfalse');
      }
      this.onGoingExercise = result;
    });
  }

  setTrue (evt: any) {
    console.log('training component ongoing trainging..' + evt);
    this.onGoingTraining = true;
    this.onGoingExercise = evt;
  }

}
