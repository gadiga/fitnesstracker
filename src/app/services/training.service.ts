import { Exercise } from '../models/exercise.model';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';

@Injectable()
export class TrainingService {
    private availableExercises: Exercise[] = [
        {id: 'hop', name: 'Hop', duration: 50, calories: 2000},
        {id: 'jump', name: 'Jump', duration: 300, calories: 5000},
        {id: 'skip', name: 'Skip', duration: 30, calories: 1300},
        {id: 'limp', name: 'Limp', duration: 100, calories: 800}
    ];

    private completedExercises: Exercise[] = [];

    private currentExercise: Exercise;

    public exerciseChanged = new Subject<Exercise>();

    constructor(private firestore: FirestoreService){
        firestore.exercises$.subscribe(exercises=> this.availableExercises = <Exercise[]>exercises);
    }

    getExercises (): Exercise[] {
        return [...(this.availableExercises)];
    }


    startExercise (id: string) {
        this.currentExercise = this.availableExercises.find( ex => id === ex.id);
        this.exerciseChanged.next(this.currentExercise);
    }

    getCurrentExercise (): Exercise {
        return {...this.currentExercise};
    }

    completeExercise (ex: Exercise) {
        const avEx: Exercise = this.availableExercises.find((aex) => {
            return aex.name === ex.name;
        });
        ex.calories = Math.round((ex.duration * avEx.calories) / avEx.duration);
        ex.date = new Date();
        this.completedExercises.push(ex);
        this.exerciseChanged.next(null);
    }

    getCompletedExercises (): Exercise[] {
        return this.completedExercises;
    }
}
