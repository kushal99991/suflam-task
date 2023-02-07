export const EMAIL_PATTERN =
  /^[a-zA-Z0-9]+[\\._]?[a-zA-Z0-9]+[@]\w+[.]\w{2,3}$/g;
export const NAME_PATTERN =
  /^[a-zA-Z0-9&()]+(([',. -][a-zA-Z0-9&() ])?[a-zA-Z0-9&()]*)*$/g;
export const UPPERCASE_PATTERN = /(?=.*?[A-Z])/;
export const LOWERCASE_PATTERN = /(?=.*?[a-z])/;
export const SPECIAL_PATTERN = /(?=.*?[#?!@$%^&*-])/;
export const DIGIT_PATTERN = /(?=.*?[0-9])/;
