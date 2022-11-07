import { TodoApiService } from './todo.api.service';
import { Injectable } from '@angular/core';
import { ToDoItem } from '../model/ToDoItem';
import { TodoStoreService } from './todo-store.service';
import { catchError, EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private _selectedTodoItem: ToDoItem = {} as ToDoItem;
  private _updatingTodoItem: ToDoItem = {} as ToDoItem;
  errorMessage!: string;

  constructor(
    private todoStore: TodoStoreService,
    private todoApiService: TodoApiService
  ) {}

  public getAll(): Observable<Array<ToDoItem>> {
    return this.todoApiService.getAll();
  }

  public create(todoItem: ToDoItem): void {
    this.todoApiService.create(todoItem).subscribe({
      next: (response) => {},
      error: (error) => {
        this.errorMessage = error.errorMessage;
      },
    });
  }

  public update(updateTodoItem: ToDoItem): void {
    this.todoStore.update(updateTodoItem);
  }

  public delete(id: number): void {
    this.todoApiService.delete(id).subscribe();
  }

  public selectTodoItem(id: number): void {
    this._selectedTodoItem = this.todoStore.findById(id);
  }

  public selectTodoItemForUpdate(id: number): void {
    this._updatingTodoItem = Object.assign({}, this.todoStore.findById(id));
  }

  public currentTodoItem(): ToDoItem {
    return this._selectedTodoItem;
  }

  public findById(id: number): Observable<ToDoItem> {
    return this.todoApiService.findById(id);
  }

  public currentUpdatingTodoItem(): ToDoItem {
    return this._updatingTodoItem;
  }
}
