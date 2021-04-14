const express = require('express')
const app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world')
  const sendmail = require('sendmail')();

  sendmail({
    from: 'no-reply@yourdomain.com',
    to: 'sevmis@mail.ru',
    subject: 'test sendmail',
    html: 'Mail of test sendmail ',
  }, function(err, reply) {
    console.log(err && err.stack);
    console.dir(reply);
  });
})

module.exports = {
  path: '/api/',
  handler: app
}
