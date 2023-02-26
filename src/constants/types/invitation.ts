export interface FormItemInfo {
  label: string;
  placeholder?: string;
}

export interface FormItem extends FormItemInfo {
  value: string;
}

export interface BasicParticipation {
  ['이름']: string;
  ['연락처']: string;
}

export interface Invitation {
  title: string;
  imageUrl?: string;
  description: string;
  date: string;
  location: string;
  extra?: FormItem[];
  password: number;
  forms?: FormItemInfo[];
}
