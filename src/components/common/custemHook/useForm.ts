import { useState, useEffect, useCallback } from 'react';

import { checkError } from '../../../helpers/functions';

type Type = {
  [key: string]: string;
};
type ErrorsConditionsType = {
  [key: string]: { min?: number; max?: number; required?: boolean };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
const useForm = (config: any) => {
  const [values, setValues] = useState<Type>({});
  const [initialErrors, setInitialErrors] = useState<Type>({});
  const [errorsMessages, setErrorsMessage] = useState<Type>({});
  const [
    errorsConditions,
    setErrorsConditions,
  ] = useState<ErrorsConditionsType>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const verifyPassword = () =>
    values.password === values.confirmPassword
      ? ''
      : initialErrors.confirmPassword;

  const handleChange = ({ name, value }: { name: string; value: string }) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const verifErrorsConditions = useCallback(
    (name: string) => {
      let errorValue = true;
      if (errorsConditions[name]) {
        Object.keys(errorsConditions[name]).forEach(condition => {
          switch (condition) {
            case 'required':
              errorValue = errorValue && values[name].trim().length > 0;
              break;
            case 'min':
              errorValue =
                errorValue &&
                !!(
                  values[name].trim().length >=
                  (errorsConditions[name]?.min || -1)
                );
              break;
            case 'max':
              if (errorsConditions[name].max) {
                errorValue =
                  errorValue &&
                  !!(
                    values[name].trim().length <=
                    (errorsConditions[name]?.max || 200)
                  );
              }

              break;

            default:
              errorValue = true;
          }
        });
      }
      return errorValue;
    },
    [errorsConditions, values],
  );

  useEffect(() => {
    const tab = Object.keys(values);
    let hasError = false;

    for (let i = 0; i < tab.length; i += 1) {
      if (
        tab[i] === 'confirmPassword' &&
        values.confirmPassword !== values.password
      ) {
        hasError = true;
        break;
      } else if (
        !checkError({ name: tab[i], value: values[tab[i]] }) ||
        !verifErrorsConditions(tab[i])
      ) {
        hasError = true;
        break;
      }
    }
    setIsSubmitting(hasError);
  }, [values, verifErrorsConditions]);

  useEffect(() => {
    const initialValues: Type = {};
    const initialValuesErrorsMessages: Type = {};
    const initialErrorsCondition: ErrorsConditionsType = {};
    const keysInitialValue = Object.keys(config);
    keysInitialValue.forEach(item => {
      initialValues[item] = config[item]?.defaultValue;
      initialValuesErrorsMessages[item] = config[item]?.errorMessage;
      initialErrorsCondition[item] = config[item]?.errorsCondition;
    });

    setValues(initialValues);
    setInitialErrors(initialValuesErrorsMessages);
    setErrorsConditions(initialErrorsCondition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkErrors = (name: string) => {
    const error =
      name === 'confirmPassword'
        ? verifyPassword()
        : !checkError({ name, value: values[name] }) ||
          !verifErrorsConditions(name);

    setErrorsMessage({
      ...errorsMessages,
      [name]: error ? initialErrors[name] : '',
    });
  };
  return {
    handleChange,
    checkErrors,
    values,
    errorsMessages,
    isSubmitting,
    updateAllValues: setValues,
  };
};

export default useForm;
