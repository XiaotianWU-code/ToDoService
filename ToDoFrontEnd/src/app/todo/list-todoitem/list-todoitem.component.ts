import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToDoItem } from '../../model/ToDoItem';
import { TodoService } from '../../service/todo.service';

@Component({
  selector: 'app-list-todoitem',
  templateUrl: './list-todoitem.component.html',
  styleUrls: ['./list-todoitem.component.scss'],
})
export class ListTodoitemComponent implements OnInit {
  toDoItems$: Observable<ToDoItem[]> | undefined;

  constructor(private todoService: TodoService, private router: Router) {}

  ngOnInit(): void {
    this.toDoItems$ = this.todoService.getAll();
  }

  public detail(id: number): void {
    this.todoService.selectTodoItem(id);
    this.router.navigate(['todos', id]);
  }

  public update(id: number): void {
    this.todoService.selectTodoItemForUpdate(id);
    this.router.navigate(['todos', 'edit', id]);
  }

  public doDelete(id: number): void {
    this.todoService.delete(id);
  }
}
