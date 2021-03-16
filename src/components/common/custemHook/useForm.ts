import { useState, useEffect } from 'react';

import { checkError } from '../../../helpers/functions';

type ErrorsType = {
  [key: string]: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
const useForm = (initialValue: any, errors: ErrorsType) => {
  // todo fix type of initialValue here (use generics)
  const [values, setValues] = useState(initialValue);
  const [errorsMessages, setErrorsMessage] = useState<ErrorsType>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const verifyPassword = () =>
    values.password === values.confirmPassword ? '' : errors.confirmPassword;

  const handleChange = ({ name, value }: { name: string; value: string }) => {
    setValues({
      ...values,
      [name]: value,
    });
  };
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
      } else if (!checkError({ name: tab[i], value: values[tab[i]] })) {
        hasError = true;
        break;
      }
    }
    setIsSubmitting(hasError);
  }, [values]);

  const checkErrors = (name: string) => {
    const error =
      name === 'confirmPassword'
        ? verifyPassword()
        : !checkError({ name, value: values[name] });
    setErrorsMessage({
      ...errorsMessages,
      [name]: error ? errors[name] : '',
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
