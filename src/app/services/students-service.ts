import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Payment, Student} from '../model/students.model';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(private http:HttpClient) {}
// student related methods
  public  getALLStudents() :Observable<Array<Student>>{
    return this.http.get<Array<Student>>(`${environment.backendHost}/students`);
  }
  public saveStudent(formData: FormData): Observable<Student> {
    return this.http.post<Student>(`${environment.backendHost}/students`, formData);
  }

  public getStudentByCode(code: string): Observable<Student> {
    return this.http.get<Student>(`${environment.backendHost}/students/${code}`);
  }
  public updateStudent(code: string, formData: FormData): Observable<Student> {
    return this.http.put<Student>(`${environment.backendHost}/students/${code}`, formData);
  }
  public deleteStudent(id: number) {
    return this.http.delete(`${environment.backendHost}/students/${id}`);
  }

  // payment related methods
  public  getALLPayments() :Observable<Array<Payment>>{
    return this.http.get<Array<Payment>>(`${environment.backendHost}/payments`);
  }
  public  getPaymentDetails(paymentId: number) {
    return this.http.get(
      `${environment.backendHost}/payments/${paymentId}/file`,
      { responseType: 'blob' }
    );
  }
  public  getStudentPayments(code : string) :Observable<Array<Payment>>{
    return this.http.get<Array<Payment>>(`${environment.backendHost}/students/${code}/payments`);
  }
  public  savePayment(formData:any) :Observable<Payment>{
    return this.http.post<Payment>(`${environment.backendHost}/payments`,formData);
  }
}
