import { useState, useEffect } from 'react';

export const useAsync = ({
  fetchFn,
  onSuccessFn,
  onFailedFn,
  callback = () => {},
  loadOnMount = false,
}: {
  fetchFn: () => Promise<any>;
  onSuccessFn?: (value?: any) => void;
  onFailedFn?: (value?: any) => void;
  callback?: () => void;
  loadOnMount?: boolean;
}) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>();
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('error');

  async function loadData() {
    setLoading(true);

    try {
      const res = await fetchFn();
      console.log(
        '<img draggable="false" class="emoji" alt="✅" src="https://s.w.org/images/core/emoji/11/svg/2705.svg"> Success',
        'user',
        res,
      );
      onSuccessFn && onSuccessFn(res);
      setResult(res);
      setMessage('');
    } catch (error) {
      console.log(
        '<img draggable="false" class="emoji" alt="❌" src="https://s.w.org/images/core/emoji/11/svg/274c.svg"> Error signing in...',
        error,
      );
      onFailedFn && onFailedFn(error);
      setMessage(error.message);
      setMessageType('error');
    } finally {
      setLoading(false);
      callback();
    }
  }
  useEffect(() => {
    !!loadOnMount && loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loading, result, message, setMessage, loadData, messageType };
};
