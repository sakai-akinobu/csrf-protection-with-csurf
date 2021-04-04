import {useState, useEffect} from 'react';

export const App: React.FC = () => {
  const [cookie, setCookie] = useState('');
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    setCookie(document.cookie);
    setCsrfToken(document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '');
  }, []);

  const [fetchOptions, setFetchOptions] = useState<RequestInit>();
  const [response, setResponse] = useState<Readonly<{status: number, statusText: string}>>();

  const createEventHandler = (overwriteOptions: Omit<RequestInfo, 'headers' | 'credentials'> = {}) => {
    return async() => {
      const options: RequestInit =  {
        method: 'POST',
        headers: {'csrf-token': csrfToken},
        credentials: 'same-origin',
        ...overwriteOptions,
      };

      const {status, statusText} = await fetch('/api', options);

      setFetchOptions(options);
      setResponse({
        status,
        statusText,
      });
    };
  };

  return (
    <div>
      <button onClick={createEventHandler()}>
        Valid request
      </button>
      <button onClick={createEventHandler({headers: {'csrf-token': 'invalid token'}})}>
        Invalid CSRF-Token
      </button>
      <button onClick={createEventHandler({credentials: 'omit'})}>
        Missing token secret
      </button>
      {cookie &&
        <div>
          <h4>Cookie</h4>
          <pre>{cookie}</pre>
        </div>
      }
      {fetchOptions &&
        <>
          <h4>Fetch options</h4>
          <pre>{JSON.stringify(fetchOptions, null, 2)}</pre>
        </>
      }
      {response &&
        <>
          <h4>Response</h4>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </>
      }
    </div>
  );
};
