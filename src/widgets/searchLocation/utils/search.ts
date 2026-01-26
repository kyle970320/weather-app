import Hangul from "hangul-js";

export const composingIncludes = (input: string, target: string) => {
  const a = Hangul.disassemble(input.trim()).join("");
  const b = Hangul.disassemble(target.trim()).join("");
  return b.includes(a);
};
