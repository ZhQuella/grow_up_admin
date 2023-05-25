
type fixed = true | 'left' | 'right';

export interface Column {
  field: string;
  title: string;
  fixed?:fixed;
  showOverflowTooltip?: boolean;
  formatter?: Fn;
  visible?: boolean;
  children?: Column[];
  width?:number;
};
