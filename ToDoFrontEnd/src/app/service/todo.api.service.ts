import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDoItem } from '../model/ToDoItem';

@Injectable({
  providedIn: 'root',
})
export class TodoApiService {
  constructor(private httpClient: HttpClient) {}

  create(todoItem: ToDoItem): Observable<any> {
    return this.httpClient.post(
      'https://635fc244ca0fe3c21aa3d012.mockapi.io/api/todos',
      todoItem
    );
  }
}
