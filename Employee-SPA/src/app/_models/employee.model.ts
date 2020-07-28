
export class Employee  {
    id?: number;
    name: string;
    salary: number;
    age: number;
    gender: string;
    email: string;
    phoneNumber: string;
    dob: Date;
    doj?: Date;
    departmentId: number;
    facilityId: number;
    city: string;
    country: string;
    photoUrl: string = './assets/images/defaultEmpWithNoPhoto.png';
    createdOn: Date;
    lastModifiedOn?: Date;


    constructor(employeeObj?: any) {
        if (employeeObj) {
          this.id = employeeObj.id;
          this.name = employeeObj.name;
          this.salary = employeeObj.salary;
          this.age = employeeObj.age;
          this.gender = employeeObj.gender;
          this.email = employeeObj.email;

          this.phoneNumber = employeeObj.phoneNumber;
          this.dob = employeeObj.dateOfBirth;
          this.doj = employeeObj.dateOfJoining;
          this.departmentId = employeeObj.departmentId;
          this.facilityId = employeeObj.facilityId;

          this.city = employeeObj.city;
          this.country = employeeObj.country;
          this.photoUrl = employeeObj.photoUrl;
          this.createdOn = employeeObj.createdOn;
          this.lastModifiedOn = employeeObj.modifiedOn;
        }
    }
}


