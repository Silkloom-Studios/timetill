export const paramStr = (param: string | string[]) => {
  return Array.isArray(param) ? param[0] : param;
};

export const parseId = (id?: string | string[]): number | undefined => {
  if (!id) return undefined;
  const strId = paramStr(id);
  const num = Number(strId);
  return isNaN(num) ? undefined : num;
};
