import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TrainingService } from '../../services/training.service';
import { Exercise } from '../../models/exercise.model';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {

  displayedColumns = ['name', 'state', 'duration', 'calories', 'date'];
  pastExercises: Exercise[];
  historyExists: boolean;
  dataSource = new MatTableDataSource<Exercise>(this.pastExercises);

  @ViewChild(MatSort) sortPast: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.pastExercises = this.trainingService.getCompletedExercises();
    console.log('past trainings count::' + this.pastExercises.length);
    this.historyExists = this.pastExercises.length > 0;

    this.dataSource.data = this.pastExercises;
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit () {
    this.dataSource.sort = this.sortPast;
  }

  doFilter(filterStr: string) {
    this.dataSource.filter = filterStr.trim().toLocaleLowerCase();
  }

}
