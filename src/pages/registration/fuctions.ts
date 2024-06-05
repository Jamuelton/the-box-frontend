import { Rule } from "antd/es/form";

interface PassowordValidationProps {
  setLenght8?: (value: boolean) => void;
  setContainsNumber?: (value: boolean) => void;
  setContainsCharSpecial?: (value: boolean) => void;
  setContainsUppercase?: (value: boolean) => void;
  setContainsLowercase?: (value: boolean) => void;
}

interface EmailValidationProps {
    setValidEmail?: (valid:boolean)  => void;
}

export function passowordValidation({
  setLenght8,
  setContainsNumber,
  setContainsCharSpecial,
  setContainsUppercase,
  setContainsLowercase,
}: PassowordValidationProps) {
  return (_: Rule, value: string) => {
    setLenght8 && setLenght8(!!value && value.length >= 8);
    setContainsNumber && setContainsNumber(/.*[0-9].*/.test(value));
    setContainsCharSpecial &&
      setContainsCharSpecial(/.*[^0-9, a-z, A-Z].*/.test(value));
    setContainsUppercase && setContainsUppercase(/.*[A-Z].*/.test(value));
    setContainsLowercase && setContainsLowercase(/.*[a-z].*/.test(value));
    if (
      !value ||
      (value.length >= 8 &&
        /.*[0-9].*/.test(value) &&
        /.*[^0-9, a-z, A-Z].*/.test(value) &&
        /.*[A-Z].*/.test(value) &&
        /.*[a-z].*/.test(value))
    ) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Senha inválida!"));
  };
}

export function emailValidation({ setValidEmail }: EmailValidationProps) {
    return (_: Rule, value: string) => {
      const isValidEmail = value.endsWith("@upe.br");
  
      if (isValidEmail) {
        setValidEmail && setValidEmail(true); 
        return Promise.resolve();
      }
  
      setValidEmail && setValidEmail(false); 
      return Promise.reject(new Error("Por favor insira um email institucional válido (terminado com '@upe.br')."));
    };
  }

