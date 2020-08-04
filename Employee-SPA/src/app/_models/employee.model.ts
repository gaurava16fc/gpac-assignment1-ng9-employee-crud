import { Photo } from './photo.model';

export class Employee  {
    id?: number;
    name: string;
    salary: number;
    age: number;
    gender: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: Date;
    dateOfJoining?: Date;
    departmentId: number;
    facilityId: number;
    city: string;
    country: string;
    photoUrl: string = './assets/images/defaultEmpWithNoPhoto.png';
    createdOn: Date;
    modifiedOn?: Date;
    photos?: Photo[];

/*
    constructor(employeeObj?: any) {
        if (employeeObj) {
            this.id = employeeObj.id;
          this.name = employeeObj.name;
          this.salary = employeeObj.salary;
          this.age = employeeObj.age;
          this.gender = employeeObj.gender;
          this.email = employeeObj.email;

          this.phoneNumber = employeeObj.phoneNumber;
          this.dateOfBirth = employeeObj.dateOfBirth;
          this.dateOfJoining = employeeObj.dateOfJoining;
          this.departmentId = employeeObj.departmentId;
          this.facilityId = employeeObj.facilityId;

          this.city = employeeObj.city;
          this.country = employeeObj.country;
          this.photoUrl = employeeObj.photoUrl;
          this.createdOn = employeeObj.createdOn;
          this.modifiedOn = employeeObj.modifiedOn;
          this.photos = employeeObj.photos;
        }
    }
    */
}


