import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ToDoItem } from '../model/ToDoItem';
import { TodoStoreService } from './todo-store.service';
import { TodoApiService } from './todo.api.service';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;
  let todoStoreService: TodoStoreService;
  let httpClientSpy: any;

  beforeEach(() => {
    todoStoreService = new TodoStoreService();
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    TestBed.configureTestingModule({
      providers: [
        TodoApiService,
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create todo item via mockHttp post', () => {
    // given
    const todoItem = new ToDoItem(1, '11', '111', false);
    // when
    service.create(todoItem);
    // then
    expect(httpClientSpy.post).toHaveBeenCalledWith(
      'https://635fc244ca0fe3c21aa3d012.mockapi.io/api/todos',
      todoItem
    );
  });
});
