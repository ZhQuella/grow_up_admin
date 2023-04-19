export interface tabOption {
  key: string;
  label: string;
  closable: boolean;
}

type contextMenuType =
  | "redload"
  | "closeTag"
  | "closeLeftTag"
  | "closeRightTag"
  | "closeOtherTag"
  | "closeAllTag"
  | "addTag";

type tabMenuMethod = Record<contextMenuType, Fn>;
