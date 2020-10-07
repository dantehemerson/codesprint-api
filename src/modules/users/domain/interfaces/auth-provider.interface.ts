export interface IAuthProvider {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  signJWT: (payload: any) => string;
}
