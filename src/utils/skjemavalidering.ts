export const validerNumerisk = (tekstInput : string | number) : boolean => {
  const heltallEllerDesimalTall = /^[0-9]+([,.][0-9]+)?$/g;
  return heltallEllerDesimalTall.test(tekstInput.toString());
};

export const validerKroner = (tekstInput : string | number) : boolean => {
  const kroneTall = /^[0-9]+([,.][0-9])?([0-9])?$/g;
  return kroneTall.test(tekstInput.toString());
};
