
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
  state: "0" | "1";
};
