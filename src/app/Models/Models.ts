
export interface Student{
  studentId:number,
  firstName: string,
  lastName: string,
  email: string,
  gender: string,
  address: string,
  description: string,
  zipcode: string,
  city: string,
  state: string,
  country: string,
  hobbies:string,
  phone:string
}

export interface LocationDTO{
  addressLine1:string,
  addressLine2:string,
  city:string,
  state:string,
  zipCode:string,
  country:string,
  lat:number,
  lng: number,
  searchString:string
}


export interface StandardResponse<T>{
  errorMessage:string,
  isSuccess:boolean,
  payload:T[],
  responseIdentifier:string,
  timestamp:Date
}
export interface StandardResponseObj<T>{
  errorMessage:string,
  isSuccess:boolean,
  payload:T,
  responseIdentifier:string,
  timestamp:Date
}

export type IForm<T> = {
  [K in keyof T]?: any;
}
