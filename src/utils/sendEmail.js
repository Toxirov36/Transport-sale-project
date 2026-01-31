import nodemailer from 'nodemailer'
import CustomError from './customError.js';

export const sendEmail = async (req, res, next) => {
  try {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: { 
          user: process.env.EMAIL_USER, 
          pass: process.env.EMAIL_PASS, 
        },
      });

    const {email} = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000);
    
    await transporter.sendMail({
        from: 'Dilshodbek', 
        to:email,
        subject: 'Transport Sale - Tasdiqlash kodi',
        text: `Stasdiqlash kodingiz: ${otp}.`
      });
    res.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.log('Email error:', error);
    throw new CustomError(500, 'Email yuborishda xatolik bo`ldi');
  }
};

export default sendEmail; 