import Hangul from "hangul-js";

export const composingIncludes = (input: string, target: string) => {
  const tokens = input.trim().split(/\s+/);

  const targetDisassembled = Hangul.disassemble(target).join("");

  return tokens.every((token) => {
    const tokenDisassembled = Hangul.disassemble(token).join("");
    return targetDisassembled.includes(tokenDisassembled);
  });
};
