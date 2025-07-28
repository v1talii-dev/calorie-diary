export interface AuthProps {
  email: string;
  password: string;
}

export interface UserSettingsEntry {
  id: string;
  uid: string;
  calories_limit?: number;
}
