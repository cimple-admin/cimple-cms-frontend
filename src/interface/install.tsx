import { MutableRefObject } from "react";

export interface InstallProps {
  updateValue: (prop: keyof InstallState, value: string) => void;
  installValues: InstallState;
  submit: MutableRefObject<InstallFormSubmit>;
}

export interface InstallFormSubmit {
  abc: () => string;
}
export interface InstallState {
  dbHost: string;
  dbUser: string;
  dbPass: string;
  dbDatabase: string;
  dbTablenamePrefix: string;
  adminUser: string;
  adminPass: string;
  adminRepass: string;
}
