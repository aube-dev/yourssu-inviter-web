import type { Invitation } from './invitation';

export interface TemplateBaseProps {
  invitation: Invitation;
  onFormSubmit?: (formInfo: string[]) => void;
  onEditPress?: () => void;
}
