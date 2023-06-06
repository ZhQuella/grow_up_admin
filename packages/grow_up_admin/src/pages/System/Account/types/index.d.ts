
type stateType = "0" | "1";

interface Belong {
  department: string;
  person: string;
  post: string;
};

export interface AccountItem {
  account: string;
  belong: Belong;
  createDate: string;
  createType: string;
  id: number;
  roleName: string;
  state: stateType;
};

export interface AccontForm {
  account: string;
  password: string;
  personnel: string;
  state: stateType;
};

type historyType = "1" | "2" | "3"| "4" | "5" | "6" | "7";

export interface HistoryItem {
  date: string;
  operator: string;
  remark: string;
  tagInfo: string;
  type: historyType
};

export interface RecordItem {
  date: string;
  loginResult: string;
  loginType: string;
  personnel: string;
  errorMessage?: string;
};
