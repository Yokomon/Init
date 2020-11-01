export default () => {
  return `<!doctype html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width,initial-scale=1.00">
        <title>Init_inc</title>
        <style>
            a{
                text-decoration: none
            }
        </style>
    </head>
    <body style="margin:0px; width:100%; height:100vh">
        <div id="root">
        </div>
        <script type="text/javascript" src="/dist/bundle.js"></script>
    </body>
    </html>
    `;
};
