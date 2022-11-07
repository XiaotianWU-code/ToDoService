import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ToDoItem } from '../model/ToDoItem';
import { TodoStoreService } from './todo-store.service';
import { TodoApiService } from './todo.api.service';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;
  let httpClientSpy: any;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', [
      'post',
      'get',
      'delete',
    ]);
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
    httpClientSpy.post.and.returnValue(of({}));
    // when
    service.create(todoItem);
    // then
    expect(httpClientSpy.post).toHaveBeenCalledWith(
      'https://localhost:5001/todos',
      todoItem
    );
  });

  it('should response error when create ', () => {
    // given
    const todoItem = new ToDoItem(1, '11', '111', false);
    httpClientSpy.post.and.returnValue(
      throwError(() => ({ errorMessage: 'create failed' }))
    );
    // when
    service.create(todoItem);
    // then
    expect(service.errorMessage).toEqual('create failed');
  });

  it('should get todo item via mockHttp get', () => {
    // given
    httpClientSpy.get.and.returnValue(of({}));
    const id = 1;
    // when
    service.findById(id).subscribe((res) => {
      console.log(res);
    });
    // then
    expect(httpClientSpy.get).toHaveBeenCalledWith(
      `https://localhost:5001/todos/${id}`
    );
  });

  it('should delete todo item via mockHttp delete', () => {
    // given
    httpClientSpy.delete.and.returnValue(of({}));
    const id = 1;
    // when
    service.delete(id);
    // then
    expect(httpClientSpy.delete).toHaveBeenCalledWith(
      `https://localhost:5001/todos/?id=${id}`
    );
  });
});
