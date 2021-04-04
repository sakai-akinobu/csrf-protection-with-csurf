import {useState, useEffect} from 'react';

export const App: React.FC = () => {
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    setCsrfToken(document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '');
  }, []);

  const onClick: React.MouseEventHandler = async () => {
    await fetch('/api', {
      method: 'POST',
      headers: {'csrf-token': csrfToken},
      credentials: 'same-origin',
    });
  };

  return (
    <div>
      <button onClick={onClick}>submit</button>
    </div>
  );
};
