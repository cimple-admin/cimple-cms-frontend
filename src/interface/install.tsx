import { MutableRefObject } from "react";

export interface InstallProps {
  installValues: InstallState;
  submit: MutableRefObject<InstallFormSubmit>;
}

export interface InstallFormSubmit {
  validate: () => Promise<object | null>;
}
export interface InstallState {
  dbHost: string;
  dbUser: string;
  dbPass: string;
  dbDatabase: string;
  dbTablenamePrefix: string;
  adminUser: string;
  adminPass: string;
}
