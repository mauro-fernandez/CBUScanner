export const isValidCXU = (cxu) => {
  if (cxu.length !== 22)
    return {
      isValid: false,
      code: "invalid_cxu_length"
    };

  if (isNaN(Number(cxu)))
    return {
      isValid: false,
      code: "cxu_not_numeric"
    };

  // Descomponemos en datos del banco y cuenta del usuario
  const cxuData = {
    bank: {
      code: cxu.slice(0, 3),
      codeVerifier: cxu[3],
      branch: cxu.slice(4, 7),
      branchVerifier: cxu[7]
    },
    account: {
      number: cxu.slice(8, 21),
      numberVerifier: cxu[21]
    }
  };

  // Reducción del primer bloque
  const bankReduction =
    Number(cxuData.bank.code[0]) * 7 +
    Number(cxuData.bank.code[1]) * 1 +
    Number(cxuData.bank.code[2]) * 3 +
    Number(cxuData.bank.codeVerifier) * 9 +
    Number(cxuData.bank.branch[0]) * 7 +
    Number(cxuData.bank.branch[1]) * 1 +
    Number(cxuData.bank.branch[2]) * 3;

  // Verificación del primer bloque
  const bankVerifier = 10 - Number(bankReduction.toString().at(-1));
  const isBankDataValid = bankVerifier === Number(cxuData.bank.branchVerifier);

  // Reducción del segundo bloque
  const accountReduction =
    Number(cxuData.account.number[0]) * 3 +
    Number(cxuData.account.number[1]) * 9 +
    Number(cxuData.account.number[2]) * 7 +
    Number(cxuData.account.number[3]) * 1 +
    Number(cxuData.account.number[4]) * 3 +
    Number(cxuData.account.number[5]) * 9 +
    Number(cxuData.account.number[6]) * 7 +
    Number(cxuData.account.number[7]) * 1 +
    Number(cxuData.account.number[8]) * 3 +
    Number(cxuData.account.number[9]) * 9 +
    Number(cxuData.account.number[10]) * 7 +
    Number(cxuData.account.number[11]) * 1 +
    Number(cxuData.account.number[12]) * 3;

  // Verificación del segundo bloque
  const accountVerifier = 10 - Number(accountReduction.toString().at(-1));
  const isAccountDataValid =
    accountVerifier === Number(cxuData.account.numberVerifier);

  // Chequeamos si ninguno de los dos bloques es válido
  if (!isBankDataValid || !isAccountDataValid)
    return {
      isValid: false,
      code: "invalid_cxu"
    };

  // Si llegamos hasta aquí, el CXU es válido
  return {
    isValid: true,
    code: "valid_cxu"
  };
};

