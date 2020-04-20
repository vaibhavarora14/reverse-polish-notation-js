const add = (num1, num2) => {
  if (num1 && num2) {
    return num2 + num1;
  } else if (num1) {
    return +num1;
  } else if (num2) {
    return +num2;
  }

  return;
};

const subtract = (num1, num2) => {
  if (num2 && num1) {
    return num2 - num1;
  } else if (num1) {
    return -num1;
  } else if (num2) {
    return -num2;
  }

  return;
};

const multiply = (num1, num2) => {
  if (!isNaN(num1) && !isNaN(num2)) {
    return num2 * num1;
  } else {
    throw TypeError(
      `Params are expected numeric values. Either of ${num1} OR ${num2} is not numeric`
    );
  }
};

const divide = (num1, num2) => {
  if (!isNaN(num1) && !isNaN(num2)) {
    return num2 / num1;
  } else {
    throw TypeError(
      `Params are expected numeric values. Either of ${num1} OR ${num2} is not numeric`
    );
  }
};

const mathematicalOperations = {
  "+": add,
  "-": subtract,
  "*": multiply,
  "/": divide,
};

const isOperation = (input, operationsList) => {
  return operationsList.find((operation) => operation === input);
};

const throwErrorIfInvalidParam = (input) => {
  if (typeof input !== "string") {
    throw TypeError(`function expects string type and not ${typeof input}`);
  }

  if (input.trim().length < 1) {
    throw Error(
      "string has nothing to evaluate, no need to call evalReversePolishNotation"
    );
  }
};

const isNumber = (arg) => {
  return typeof arg === "number";
};

const throwErrorIfNotNumber = (...args) => {
  for (let arg of args) {
    if (!isNumber(arg)) {
      throw Error(
        `Only number and operators are allowed for evaluation. ${arg} is not a number`
      );
    }
  }
};

const evalReversePolishNotation = (input) => {
  throwErrorIfInvalidParam(input);

  let inputArray = input.split(" ");
  let tempListForPolishNotation = [];

  for (const numberOrOperation of inputArray) {
    if (isOperation(numberOrOperation, Object.keys(mathematicalOperations))) {
      const operationSymbol = numberOrOperation;
      const operationFunction = mathematicalOperations[operationSymbol];

      const num1 = Number(tempListForPolishNotation.pop());
      const num2 = Number(tempListForPolishNotation.pop());

      throwErrorIfNotNumber(num1, num2);

      try {
        const operationResult = operationFunction(num1, num2);
        tempListForPolishNotation.push(operationResult);
      } catch (e) {
        throw Error(`Problem in string - "${input}". unable to evaluate it`);
      }
    } else {
      const number = numberOrOperation;
      tempListForPolishNotation.push(number);
    }
  }

  if (tempListForPolishNotation.length === 1) {
    return tempListForPolishNotation[0];
  } else {
    tempListForPolishNotation.pop();
    throw Error(
      `Incomplete operations in string - "${input}". Value still left are ${tempListForPolishNotation.toString()}`
    );
  }
};

export { evalReversePolishNotation };
