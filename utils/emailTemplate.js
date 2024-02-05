exports.contact = (name, email, subject, message) => {
  return `<!DOCTYPE html>
  <html>
  <head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700;800;900&display=swap" rel="stylesheet">
    <title>Mekanox</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <style type="text/css">
        body{
          max-width: 700px;
          margin: 0 auto;
          background: #FFFFFF;
          font-family: "Poppins", sans-serif;
          font-weight:300;
          color:#3b3b3a; 
        }
        a { 
          color:#CB1B1B; 
          text-decoration: none;	
        }
        section{
          background: #FFFFFF;
          margin: 0 auto;
          padding: 0px 20px;
          width: 100%;
          box-sizing: border-box;
        }
        table tr td ul li {
          color: #111218;
          leading-trim: both;
          text-edge: cap;
          font-size: 15px;
          font-style: normal;
          font-weight: 800;
          line-height: normal;
          letter-spacing: 0.3px;
        }
      </style>
    </head>
  </head>
  <body>
    <div style="max-width: 550px;background: #FFFFFF;width:100%;margin:0px auto;padding-top: 48px;">
      <section>
        <p style="color: #7C7D83;text-align: center;leading-trim: both;text-edge: cap;font-size: 22.5px;font-style: normal;font-weight: 500;line-height: normal;letter-spacing: 0.45px;margin:0 auto 48px;padding: 0 32px;">
          Nueva solicitud de contacto desde <span style="color: #ff6a3d;">https://claudiostuardo.netlify.app/</span>
        </p>

        <table width="100%" border="0" style="padding: 0;margin: 0 auto;">
          <tr>
            <td style="color: #ff6a3d;leading-trim: both;text-edge: cap;font-size: 22.5px;font-style: normal;font-weight: 800;line-height: normal;letter-spacing: 0.45px;padding: 0 0 18px 64px;" colspan="2">Datos de contacto</td>
          </tr>
          <tr>
            <td style="color: #7C7D83;leading-trim: both;text-edge: cap;font-size: 15px;font-style: normal;font-weight: 400;line-height: normal;letter-spacing: 0.3px;padding: 0 0 14px 64px;" colspan="2">Nombre</td>
          </tr>
          <tr>
            <td style="color: #111218;leading-trim: both;text-edge: cap;font-size: 22.5px;font-style: normal;font-weight: 800;line-height: normal;letter-spacing: 0.45px;;padding: 0 0 24px 64px;" colspan="2">${name}</td>
          </tr>
          <tr>
            <td style="color: #7C7D83;leading-trim: both;text-edge: cap;font-size: 15px;font-style: normal;font-weight: 400;line-height: normal;letter-spacing: 0.3px;padding: 0 0 14px 64px;" colspan="2">Correo</td>
          </tr>
          <tr>
            <td style="color: #111218;leading-trim: both;text-edge: cap;font-size: 22.5px;font-style: normal;font-weight: 800;line-height: normal;letter-spacing: 0.45px;;padding: 0 0 24px 64px;" colspan="2">${email}</td>
          </tr>
          <tr>
            <td style="color: #7C7D83;leading-trim: both;text-edge: cap;font-size: 15px;font-style: normal;font-weight: 400;line-height: normal;letter-spacing: 0.3px;padding: 0 0 14px 64px;" colspan="2">Asunto</td>
          </tr>
          <tr>
            <td style="color: #111218;leading-trim: both;text-edge: cap;font-size: 22.5px;font-style: normal;font-weight: 800;line-height: normal;letter-spacing: 0.45px;;padding: 0 0 24px 64px;" colspan="2">${subject}</td>
          </tr>
          <tr>
            <td style="color: #7C7D83;leading-trim: both;text-edge: cap;font-size: 15px;font-style: normal;font-weight: 400;line-height: normal;letter-spacing: 0.3px;padding: 0 0 14px 64px;" colspan="2">Mensaje</td>
          </tr>
          <tr>
            <td style="color: #111218;leading-trim: both;text-edge: cap;font-size: 22.5px;font-style: normal;font-weight: 800;line-height: normal;letter-spacing: 0.45px;;padding: 0 0 24px 64px;" colspan="2">${message}</td>
          </tr>

        </table>
      </section>
      &nbsp;
    </div>
  </body>
  </html>`;
};
