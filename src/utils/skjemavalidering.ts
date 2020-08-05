export const validerNumerisk = (tekstInput : string | number) : boolean => {
  const heltallEllerDesimalTall = /^[0-9]+([,.][0-9]+)?$/g;
  return heltallEllerDesimalTall.test(tekstInput.toString());
};

export const validerKroner = (tekstInput : string | number) : boolean => {
  const kroneTall = /^[0-9]+([,.][0-9])?([0-9])?$/g;
  return kroneTall.test(tekstInput.toString());
};

export const validerOgReturnerKroner = (tekstInput: string) : number | null => {
  if (validerKroner(tekstInput)) {
    return Number(tekstInput);
  }
  return null;
};

export const validerTall = (input: number | string) : boolean => !Number.isNaN(Number(input));

export const validerKilometer = (
  tekstInput : string | number,
) : boolean => validerNumerisk(tekstInput);
