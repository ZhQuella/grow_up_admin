interface props {
  state: any;
}

export const useEvent = ({ state }: props) => {
  const setColumns = (columns: any[]) => {
    state.columns = columns;
  };

  return {
    setColumns,
  };
};
