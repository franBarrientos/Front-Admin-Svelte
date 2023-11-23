export type EmployeeAddDto = {
  id?: number;
  startDate: Date;
  salary: number;
  jobTitle: string;
  firstName: string;
  lastName?: string;
  dni: string;
  age?: number;
  province?: string;
  address?: string;
};
