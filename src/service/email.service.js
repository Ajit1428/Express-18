const constant =  require('../../config/constant')
const nodemailer = require('nodemailer')

class EmailService {

 constructor() {
    this.transport = nodemailer.createTransport({
            host: constant.SMTP.HOST,
            port: constant.SMTP.PORT,
            auth: {
              user: constant.SMTP.USER,
              pass: constant.SMTP.PWD
            },
            secure: constant.SMTP.SECURE
          });
    }

setSubject = (sub) => {
    this.subject = sub
}


setMessage = (template, data = {}) => {
    this.msg = constant.emailTemps[template]
    Object.keys(data).map((key) => {
      let expression = new RegExp(':'+key , 'g')
      this.msg = this.msg.replace(expression, data[key])
    })
  }

sendEmail = async (to) => {
  try {
  const sent =  await this.transport.sendMail({
      to : to,
      from : constant.SMTP.FROM,
      subject : this.subject,
      html : this.msg
    })

    return sent
  }
  catch(except){
    console.log("MailSent Expection: ", except)
    throw except
  }
}


}

const emailSer = new EmailService();
module.exports = emailSer;