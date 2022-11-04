import * as nm from 'nodemailer';
import { Transporter } from 'nodemailer';

let nmTransporter: Transporter;

export const setUpNodemailer = () => {
  nmTransporter = nm.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_FROM_EMAIL,
      pass: process.env.NODEMAILER_FROM_PASSWORD,
    },
  });

  return;
};

export const getNodemailerTransporter = (): Transporter => {
  return nmTransporter;
};
