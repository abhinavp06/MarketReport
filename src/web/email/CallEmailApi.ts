import { Transporter } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { ReportProcessingResponse } from 'src/core/common/report/models/ReportProcessingResponse';
import { ReportStringEnum } from 'src/core/common/report/ReportStringEnum';
import { deleteFile } from 'src/core/utils/FileUtils';
import { appLogger } from 'src/repository/RepositoryModule';
import { getNodemailerTransporter } from './SetUpNodemailer';

export const callEmailApi = async ({
  email,
  attachment,
  fileName,
}: {
  email: string;
  attachment: string;
  fileName: string;
}): Promise<ReportProcessingResponse> => {
  const nmTransporter: Transporter = getNodemailerTransporter();
  const filePath: string = attachment.concat(`.xlsx`);
  const body: Mail.Options = generateEmailBody(email, filePath);

  try {
    await nmTransporter.sendMail(body);
    appLogger.info(
      `Successfully sent email to ${email} containing file ${fileName}`,
    );
    deleteFile(filePath);
  } catch (error) {
    appLogger.error(`Failed to send ${fileName} to ${email}. Reason: ${error}`);
    return {
      reportString: ReportStringEnum.emailError,
      additionalMessage: `${fileName} was processed successfully. Encountered error while sending email to ${email}`,
    };
  }
  return {
    reportString: ReportStringEnum.successResponse,
    additionalMessage: `${fileName} was processed successfully! Email has been sent to ${email}`,
  };
};

const generateEmailBody = (email: string, filePath: string): Mail.Options => {
  return {
    from: process.env.NODEMAILER_FROM_EMAIL,
    to: email,
    bcc: process.env.OWNER_EMAIL,
    subject: 'Generated Stock Price Report',
    attachments: [{ path: filePath }],
  };
};
