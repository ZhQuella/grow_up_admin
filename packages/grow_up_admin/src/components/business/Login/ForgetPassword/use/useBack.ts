interface prop {
  emit: Fn;
}

export const useBack = ({ emit }: prop) => {
  const onBackClick = () => {
    emit("back", "login");
  };

  return {
    onBackClick
  };
};
