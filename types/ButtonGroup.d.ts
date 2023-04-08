const type = "primary" | "success" | "warning" | "danger" | "info";

export interface GroupBtn {
  func: Fn;
  icon: string;
  type;
  authority: string;
  title: string;
  disabled?: Fn;
  show?: Fn;
}
