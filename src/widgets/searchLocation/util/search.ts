import Hangul from "hangul-js";

export const composingIncludes = (input: string, target: string) => {
  const a = Hangul.disassemble(input).join("");
  const b = Hangul.disassemble(target).join("");
  return b.includes(a);
};
