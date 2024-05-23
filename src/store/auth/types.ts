export type TRegister = {
  name: string;
  email: string;
  password: string;
}

export type TLogin = {
  email: string;
  password: string;
}

export type TRegisterAPIResponse = {
  id: string;
  name: string;
  email: string;
  token: string;
  refreshToken: string;
}


export type TUser = {
  id: string;
  name: string;
  email: string;
}

export type TAuthState = {
  user: TUser
}
