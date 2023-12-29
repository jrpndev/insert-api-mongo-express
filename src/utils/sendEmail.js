import nodemailer from 'nodemailer';
import { environment } from '../environment/environment';
const EMAIL = environment.EMAIL;
const EMAIL_PASSWORD = environment.PASSWORD;

const sendRecoveryEmail = async (recipientEmail, recoveryCode) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL,
      pass: EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: EMAIL_PASSWORD,
    to: recipientEmail,
    subject: 'Código de Recuperação de Senha',
    text: `Seu código de recuperação de senha é: ${recoveryCode}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email de recuperação enviado: ', info.response);
  } catch (error) {
    console.error('Erro ao enviar o email de recuperação: ', error.message);
    throw new Error('Falha ao enviar o email de recuperação de senha.');
  }
};

export default sendRecoveryEmail;
