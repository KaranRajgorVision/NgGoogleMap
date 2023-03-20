import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StandardResponse, Student } from './../Models/Models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  baseStudentAPIUrl:string = environment.baseAPIURL;
  constructor(private http: HttpClient) { }

  GetAllStudentList(): Observable<StandardResponse<Student>>{
    return this.http.get<StandardResponse<Student>>(`${this.baseStudentAPIUrl}Student/GetAllStudents`);
  }
  AddStudent(obj:any){
    return this.http.post<any>(`${this.baseStudentAPIUrl}Student/AddStudent`,obj);
  }
  UpdateStudent(studentId:number,obj:any){
    return this.http.put<any>(`${this.baseStudentAPIUrl}Student/UpdateStudent?StudentId=${studentId}`,obj);
  }

  DeleteStudent(studentId:number){
    return this.http.delete<any>(`${this.baseStudentAPIUrl}Student/DeleteStudentById?StudentId=${studentId}`);
  }

  GetStudentByStudentId(studentId:number): Observable<StandardResponse<Student>>{
    return this.http.get<StandardResponse<Student>>(`${this.baseStudentAPIUrl}Student/GetStudentById?StudentId=${studentId}`);
  }

  GetAllStudentListTyped(): Observable<StandardResponse<Student>>{
    return this.http.get<StandardResponse<Student>>(`${this.baseStudentAPIUrl}Student/GetAllStudents`);
  }
}
