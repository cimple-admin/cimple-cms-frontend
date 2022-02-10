export interface InstallProps {
  updateValue: (prop: keyof InstallState, value: string) => void;
  installValues: InstallState;
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