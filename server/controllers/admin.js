// import moment from 'moment';
// import uuidv4 from 'uuidv4';
import db from '../db/index';

import Helper from '../middleware/helper';

// eslint-disable-next-line import/no-cycle
import server from '../app';

const nodemailer = require('nodemailer');
const Nexmo = require('nexmo');
const socketio = require('socket.io');

// init nexmo
const nexmo = new Nexmo({
  apiKey: '2e52c04a',
  apiSecret: 'VsSnzx0rigBu4Hmt',
}, { debug: true });

// Connect to socket.io

const io = socketio(server);
io.on('çonnection', (socket) => {
  console.log('connected');
  io.on('disconnect', () => {
    console.log('Disconnected');
  });
});


class admin {
  // To log in
  static async login(req, res) {
    const loginQuery = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await db.query(loginQuery, [req.body.email]);
    const token = Helper.generateToken(rows[0].id);
    res.status(200).json({
      status: 200,
      data:
        [{
          message:
          'You have logged in successfully',
          token,
        }],
    });
  }

  // get all users
  static async getAllUsers(req, res) {
    const findAllQuery = 'SELECT * FROM users';
    const { rows, rowCount } = await db.query(findAllQuery);
    return res.status(200).send({ rows, rowCount });
  }

  // act on a status
  static async status(req, res) {
    const findOneQuery = 'SELECT * FROM incidents WHERE id=$1';
    const updateOneQuery = `UPDATE incidents
      SET status=$1
      WHERE id=$2 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404)
          .json({
            "message": "Incident not found! ",
          });
      }
      const values = [
        req.body.status || rows[0].status,
        req.params.id,
      ];
      const response = await db.query(updateOneQuery, values);
      return res.status(200).send(response.rows[0]);
      // return res.status(200)
      //   .json({
      //       status: 200,
      //       message: 'Your incident has been updated successfully.',
      //     },
      //   );
    } catch (err) {
      return res.status(400).send(err);
    }
  }

  // to send a mail
  static async mail(req, res) {
    const output = `
        <p>${req.body.msg}
        <br><br>
        ${req.body.name}<br>
        ${req.body.position}<br>
        ${req.body.company}</p>
        `;
      // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'funmiolaiya9@gmail.com', // generated ethereal user
        pass: 'funmi.OLAIYA', // generated ethereal password
      },
    });
      // setup email data with unicode symbols
    const mailOptions = {
      from: '"WACA Ireporter" <funmiolaiya9@gmail.com>', // sender address
      to: ` ${req.body.email}`, // list of receivers
      subject: 'The status of your submitted incident', // Subject line
      html: output, // html body
    };
      // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      return res.status(200)
        .json({
          status: 200,
          message: 'The mail has been sent successfully.',
        });
    });
  }

  // to send a message
  static async sms(req, res) {
    const { number } = req.body;
    const { text } = req.body;

    nexmo.message.sendSms(
      '2348022066672', number, text, { type: 'unicode' },
      (err, responseData) => {
        if (err) {
          console.log(err);
        } else {
          console.dir(responseData);
          // Get data from the response
          const data = {
            id: responseData.messages[0]['message-id'],
            number: responseData.messages[0]['.'],
          };
          res.status(200).json({
            status: 200,
            message: 'The message has been sent successfully',
          });

          // Emit the the client
          io.emit('smsStatus', data);
        }
      },
    );
  }
  // end of class
}


export default admin;
