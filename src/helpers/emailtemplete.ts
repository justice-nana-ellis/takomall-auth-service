
import dotenv from 'dotenv';
dotenv.config();
// const url = process.env.FRONTEND_REDIRECT_URL;
export interface EmailData {
    // project_id: string;
    // project_name: string;
    // client_name: string;
    // end_date: string;
    // name: string;
    link: string
}
export const forgetPasswordEmailTemplate = (link: string): string =>
    // const { project_id, project_name, client_name, end_date, name } = emailData;
    // const { link } = EmailData;
    `<!DOCTYPE html>
      <html lang="en">
          <head>
              <meta charset="utf-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="description" content="">
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <link rel="preconnect" href="https://fonts.googleapis.com">
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
              <link href="https://fonts.googleapis.com/css2?family=Work+Sans&display=swap" rel="stylesheet">
          </head>

          <body style="margin: auto; font-family: sans-serif;">
            <div class="main" style="background-color: #FDF5F2; max-width: 650px; min-height: 535px; border-radius: 8px; padding-bottom: 20px; margin: auto;">

              <div style="background-color: #DD5928; height: 200px; padding-top: 40px; border-radius: 8px 8px 0 0;
                background-image: url('https://arms-enterprise-assets.s3.eu-west-1.amazonaws.com/assets/template-header.png');
                background-size: 100% 100%;"
                >

                <div style="background-color: #FFFFFF;border-radius: 8px;  margin: auto; text-align: center;  margin: 0px 25px;">
                  <div class="header2" style="max-width: 600px;padding: 30px 0;border-bottom: 1px solid rgb(192, 189, 195);">
                    <img src="https://arms-enterprise-assets.s3.eu-west-1.amazonaws.com/assets/amalitech-logo.png" alt="Amalitech-logo" style="width: 50%";>
                  </div>
                  <div style=" padding: 0px 10px;" >
                      <p style="font-family: 'work-sans', sans-serif;font-style: normal;font-weight: 400;font-size: 16px;padding: 5px 0 15px;color: #474D66;;margin: auto;text-align: start;">
                       Hello user,
                      </p>
                      <p style="font-family: 'work-sans', sans-serif;font-style: normal;font-weight: 400;font-size: 16px;padding: 5px 0 15px;color: #474D66; margin: auto;text-align: start;">
                       Just a quick reminder that <b>client_name's</b> project <b>project_name</b>, is ending on <b>end_date</b>. Let's ensure a smooth and timely completion.
                      </p>
                      <p style="font-family: 'work-sans', sans-serif;font-style: normal;font-weight: 400;font-size: 16px;padding: 5px 0 15px;color: #474D66; margin: auto;text-align: start;">
                       Kindly review the status, communicate with stakeholders, address any risks, and prepare documentation. Your efforts are key to our success.
                      </p>
                      <p style="font-family: 'work-sans', sans-serif;font-style: normal;font-weight: 400;font-size: 16px;padding: 5px 0 15px;color: #474D66; margin: auto;text-align: start;">
                       Click <a target="_blank" href="${link}" cursor:="" pointer="">here</a> to reset your password.
                      </p>
                      <p style="font-family: 'work-sans', sans-serif;font-style: normal;font-weight: 400;font-size: 16px;padding: 5px 0 15px;color: #474D66; margin: auto;text-align: start;">
                       or paste this in your Browser <a target="_blank" href="${link}" cursor:="" pointer="">${link}</a> to reset your password.
                      </p>
                      <p style="font-family: 'work-sans', sans-serif;font-style: normal;font-weight: 400;font-size: 16px;padding: 5px 0 15px;color: #474D66;margin: auto;text-align: start;">
                       Best regards, <br>
                       ARMS <br>
                      </p>
                  </div>

                </div>
              </div>
            </div>
          </body>
      </html>
    `;

    export const verifyEmailTemplate = (link: string): string =>
    // const { project_id, project_name, client_name, end_date, name } = emailData;
    // const { link } = EmailData;
    `<!DOCTYPE html>
      <html lang="en">
          <head>
              <meta charset="utf-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="description" content="">
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <link rel="preconnect" href="https://fonts.googleapis.com">
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
              <link href="https://fonts.googleapis.com/css2?family=Work+Sans&display=swap" rel="stylesheet">
          </head>

          <body style="margin: auto; font-family: sans-serif;">
            <div class="main" style="background-color: #FDF5F2; max-width: 650px; min-height: 535px; border-radius: 8px; padding-bottom: 20px; margin: auto;">

              <div style="background-color: #DD5928; height: 200px; padding-top: 40px; border-radius: 8px 8px 0 0;
                background-image: url('https://arms-enterprise-assets.s3.eu-west-1.amazonaws.com/assets/template-header.png');
                background-size: 100% 100%;"
                >

                <div style="background-color: #FFFFFF;border-radius: 8px;  margin: auto; text-align: center;  margin: 0px 25px;">
                  <div class="header2" style="max-width: 600px;padding: 30px 0;border-bottom: 1px solid rgb(192, 189, 195);">
                    <img src="https://arms-enterprise-assets.s3.eu-west-1.amazonaws.com/assets/amalitech-logo.png" alt="Amalitech-logo" style="width: 50%";>
                  </div>
                  <div style=" padding: 0px 10px;" >
                      <p style="font-family: 'work-sans', sans-serif;font-style: normal;font-weight: 400;font-size: 16px;padding: 5px 0 15px;color: #474D66;;margin: auto;text-align: start;">
                       Hello user,
                      </p>
                      <p style="font-family: 'work-sans', sans-serif;font-style: normal;font-weight: 400;font-size: 16px;padding: 5px 0 15px;color: #474D66; margin: auto;text-align: start;">
                       Just a quick reminder that <b>client_name's</b> project <b>project_name</b>, is ending on <b>end_date</b>. Let's ensure a smooth and timely completion.
                      </p>
                      <p style="font-family: 'work-sans', sans-serif;font-style: normal;font-weight: 400;font-size: 16px;padding: 5px 0 15px;color: #474D66; margin: auto;text-align: start;">
                       Kindly review the status, communicate with stakeholders, address any risks, and prepare documentation. Your efforts are key to our success.
                      </p>
                      <p style="font-family: 'work-sans', sans-serif;font-style: normal;font-weight: 400;font-size: 16px;padding: 5px 0 15px;color: #474D66; margin: auto;text-align: start;">
                       Click <a target="_blank" href="${link}" cursor:="" pointer="">here</a> to reset your password.
                      </p>
                      <p style="font-family: 'work-sans', sans-serif;font-style: normal;font-weight: 400;font-size: 16px;padding: 5px 0 15px;color: #474D66; margin: auto;text-align: start;">
                       or paste this in your Browser <a target="_blank" href="${link}" cursor:="" pointer="">here</a> to reset your password.
                      </p>
                      <p style="font-family: 'work-sans', sans-serif;font-style: normal;font-weight: 400;font-size: 16px;padding: 5px 0 15px;color: #474D66;margin: auto;text-align: start;">
                       Best regards, <br>
                       ARMS <br>
                      </p>
                  </div>

                </div>
              </div>
            </div>
          </body>
      </html>`;
