export const App: React.FC = () => {
  const onClick: React.MouseEventHandler = async () => {
    await fetch('/api', {method: 'POST'});
  };

  return (
    <div>
      <button onClick={onClick}>submit</button>
    </div>
  );
};
