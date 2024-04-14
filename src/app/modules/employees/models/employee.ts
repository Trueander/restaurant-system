import {User} from "../../../shared/models/user";
import {Role} from "../../../shared/models/role";

export class Employee extends User{
  constructor(public id: number,
              public override firstname: string,
              public override lastname: string,
              public override dni: string,
              public override email: string,
              public override phoneNumber: string,
              public override roles: Role[]) {
    super(firstname, lastname, dni, email, phoneNumber, roles);
  }
}
