import remoteMenu from "@/temporary/remoteMenu";

export const getSystemMenu = (): Promise<any[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(remoteMenu as any[]);
    }, 2000);
  });
};
