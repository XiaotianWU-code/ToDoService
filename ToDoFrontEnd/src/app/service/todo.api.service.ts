import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToDoItem } from '../model/ToDoItem';

@Injectable({
  providedIn: 'root',
})
export class TodoApiService {

  constructor(private httpClient: HttpClient) {}

  create(todoItem: ToDoItem) {
  }
}
