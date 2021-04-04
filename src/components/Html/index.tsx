export const Html: React.FC<{csrfToken: string}> = (props) => {
  return (
    <html>
      <head>
        <meta name="csrf-token" content={props.csrfToken}></meta>
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
