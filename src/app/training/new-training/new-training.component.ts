import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Exercise } from '../../models/exercise.model';
import { TrainingService } from '../../services/training.service';
import { NgForm } from '@angular/forms';
import { empty, interval } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
  providers: [FirestoreService]
})
export class NewTrainingComponent implements OnInit {

  // @Output() startTraining = new EventEmitter<any>();

  exercises: Exercise[] = [];

  constructor(private trainingService: TrainingService, private db: FirestoreService) { }

  ngOnInit() {
    console.log('hello')
    this.db.exercises$.subscribe(exercises => this.exercises = <Exercise[]>exercises);
  }

  onStartTraining (form: NgForm) {
    console.log(form);
    const selectedExercise: Exercise = this.exercises.find(ex => {
      return ex.id === form.value.exercise;
    });
    console.log('selected exercise::' + selectedExercise);
    this.trainingService.startExercise(selectedExercise.id);
    // this.startTraining.emit(selectedExercise);
  }

}
