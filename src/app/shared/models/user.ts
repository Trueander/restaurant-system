import {Role} from "./role";

export class User {
  constructor(public firstname: string,
              public lastname: string,
              public dni: string,
              public email: string,
              public phoneNumber: string,
              public roles: Role[]) {
  }
}
