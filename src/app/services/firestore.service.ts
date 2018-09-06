import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore/firestore';
import { Exercise } from '../models/exercise.model';
import { map, debounceTime } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private exercises: Exercise[];
  public exercises$: Subject<Exercise[]> = new Subject();

  constructor(private store: AngularFirestore) {
    this.getExercises();
   }

  async getExercises () {
    let dbResult = await this.store.collection('availableExercises').valueChanges();
    dbResult
    .pipe(map(ex=>{
      let cnt=0;
      ex.forEach(item=>item['id']=++cnt)
      return ex;
    })).subscribe((result: Exercise[]) => {
      this.exercises = [...(result)];
      this.exercises$.next(this.exercises);
    });
  }

  get availableExercises () {
    return this.exercises;
  }
}
