export interface Student {
  id: number;
  code: string;
  firstName: string;
  lastName: string;
  photo: string;
  programId: string;
}
export interface Payment {
  id: number;
  amount: number;
  date: Date;
  type: string;
  status: string;
  file: string;
  student: Student;
}

export enum PaymentStatus {
  CREATED, VALIDATED, REJECTED
}
export enum PaymentType {
   CASH ,CHEQUE ,TRANSFER,DEPOSIT
}
