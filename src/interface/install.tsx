import { InstallState } from '../../pages/install';

export interface InstallProps {
  updateValue: (prop: keyof InstallState, value: string) => void;
  installValues: InstallState;
}

