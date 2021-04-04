import {useState, useEffect} from 'react';
import {parse as cookieParse} from 'cookie';

export const App: React.FC = () => {
  const [csrfSecret, setCsrfSecret] = useState('');
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    setCsrfSecret(cookieParse(document.cookie).csrf_secret || '');
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
      <h2>CSRF-Protection using csurf</h2>
      <button onClick={createEventHandler()}>
        Valid request
      </button>
      <button onClick={createEventHandler({headers: {'csrf-token': 'invalid token'}})}>
        Invalid CSRF-Token
      </button>
      <button onClick={createEventHandler({credentials: 'omit'})}>
        Missing token secret
      </button>
      {csrfToken &&
        <div>
          <h4>CSRF Token</h4>
          <pre>{csrfToken}</pre>
        </div>
      }
      {csrfSecret &&
        <div>
          <h4>Secret Token</h4>
          <pre>{csrfSecret}</pre>
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
