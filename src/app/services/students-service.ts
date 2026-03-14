import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(private http:HttpClient) { }


  public  getALLPayments(){
    return this.http.get(environment.backendHost+"/payments");
  }
  public updatePhotoProfile(studentId :string,file : File){
    let formData=new FormData();
    formData.append('photoFile', file);
    return this.http.put(environment.backendHosthttp://localhost:8080/students/"+studentId+"/profile", formData);
  }

  public getStudent(studentId:string) {
    return this.http.get("http://localhost:8080/students/"+studentId);
  }


}
