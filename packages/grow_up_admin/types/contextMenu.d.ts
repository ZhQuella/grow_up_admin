type contextMenuType =
  | "redload"
  | "closeTag"
  | "closeLeftTag"
  | "closeRightTag"
  | "closeOtherTag"
  | "closeAllTag"
  | "addTag";

type tabMenuMethod = Record<contextMenuType, Fn>;

export type contextMenuSchema = {
  disabled?: boolean;
  divided?: boolean;
  icon?: string;
  label: string;
  key: string;
  command?: (item: contextMenuSchema) => void;
};
