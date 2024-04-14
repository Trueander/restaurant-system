export class RequestEmployee {
  constructor(public firstname: string,
              public lastname: string,
              public dni: string,
              public phoneNumber: string,
              public email: string,
              public password: string,
              public roleIds: number[]) {
  }
}
