export interface IUserState {
    userid: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    verified: boolean;
  }
  
  export interface INotifState {
    id: number;
    notifType: string;
    msg: string;
  }

  //All of the different states being tracked go here:
  export interface IState {
    userState: IUserState;
    notifState: INotifState;
  }
  
