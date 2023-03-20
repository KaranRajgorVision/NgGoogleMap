import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocationDTO, StandardResponse, StandardResponseObj } from '../Models/Models';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  baseStudentAPIUrl:string = environment.baseAPIURL;
  constructor(private http: HttpClient) { }

  GetSavedLocation(): Observable<StandardResponseObj<LocationDTO>>{
    return this.http.get<StandardResponseObj<LocationDTO>>(`${this.baseStudentAPIUrl}Location/GetLocation`);
  }
  AddUpdateLocation(obj:LocationDTO){
    return this.http.post<any>(`${this.baseStudentAPIUrl}Location/AddUpdateLocation`,obj);
  }
}
