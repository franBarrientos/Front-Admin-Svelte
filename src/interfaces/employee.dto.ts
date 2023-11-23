export type EmployeeDto = {
  id: number;
  startDate: Date;
  salary: number;
  jobTitle: string;
  user : UserEmployeeDto
};


type UserEmployeeDto = {
  firstName: string;
  lastName?: string;
  dni: string;
  age?: number;
  province?: string;
  address?: string;
}