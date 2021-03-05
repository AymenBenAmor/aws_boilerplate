import { useState, useEffect } from 'react';

import { checkError } from '../../../helpers/functions';

type ErrorsType = {
  [key: string]: string;
};
const useForm = (initialValue: any, errors: ErrorsType) => {
  const [values, setValues] = useState(initialValue);
  const [errorsMessages, setErrorsMessage] = useState<ErrorsType>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {};
  const verifPassword = () =>
    values.password === values.confirmPassword ? '' : errors.confirmPassword;

  console.log('verifPassword', verifPassword());

  const handleChange = ({ name, value }: { name: string; value: string }) => {
    setValues({
      ...values,
      [name]: value,
    });
  };
  useEffect(() => {
    const tab = Object.keys(values);
    let hasError = false;
    for (var i = 0; i < tab.length; i++) {
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
    console.log('errorerror', isSubmitting);
  }, [values]);

  const checkErrors = (name: string) => {
    setErrorsMessage({
      ...errorsMessages,
      [name]:
        name === 'confirmPassword'
          ? verifPassword()
          : !checkError({ name, value: values[name] })
          ? errors[name]
          : '',
    });
  };

  return {
    handleChange,
    handleSubmit,
    checkErrors,
    values,
    errorsMessages,
    isSubmitting,
  };
};

export default useForm;
