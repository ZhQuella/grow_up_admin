
interface props { 
  emit: Fn
}

export const useForget = ({ 
  emit
}: props) => { 

  const onForgetPass = () => {
    emit("forget", "forgetPassword");
  };


  return {
    onForgetPass
  }

};
