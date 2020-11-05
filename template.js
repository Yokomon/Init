export default ({ markup, css }) => {
  return `
    <!doctype html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width,initial-scale=1.00">
        <title>Init_inc</title>
        <style>a{text-decoration: none}</style>
    </head>
    <body style="margin:0px; width:100%">
        <div id="root">${markup}</div>
        <style id="jss-server-side" >${css}</style>
        <script type="text/javascript" src="/dist/bundle.js"></script>
    </body>
    </html>
    `;
};
