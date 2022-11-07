import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDoItem } from '../model/ToDoItem';

@Injectable({
  providedIn: 'root',
})
export class TodoApiService {
  baseUrl = 'https://localhost:5001/todos';

  constructor(private httpClient: HttpClient) {}

  create(todoItem: ToDoItem): Observable<any> {
    return this.httpClient.post(this.baseUrl, todoItem);
  }

  findById(id: number): Observable<ToDoItem> {
    return this.httpClient.get<ToDoItem>(`${this.baseUrl}/${id}`);
  }
}
