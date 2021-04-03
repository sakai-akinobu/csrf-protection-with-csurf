export const Html: React.FC = (props) => {
  return (
    <html>
      <head>
        <script src="./client.js" defer></script>
      </head>
      <body>
        <div id="app">
          {props.children}
        </div>
      </body>
    </html>
  );
};
