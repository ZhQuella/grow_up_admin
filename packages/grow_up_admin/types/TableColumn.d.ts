
type fixedType = true | 'left' | 'right';

export interface Column {
  field: string;
  title: string;
  fixed?:fixedType;
  showOverflowTooltip?: boolean;
  formatter?: Fn;
  visible?: boolean;
  children?: Column[];
  width?:number;
};
