from flask import Flask
from flask_mail import Mail, Message

app = Flask(__name__)
app.config.update(
    MAIL_SERVER='smtp.gmail.com',
    MAIL_PORT=465,
    MAIL_USE_TLS=False,
    MAIL_USE_SSL=True,
    MAIL_USERNAME='josechu130@gmail.com',
    MAIL_PASSWORD='vgrejqzgyiorephi'
)

mail = Mail(app)

# message object mapped to a particular URL ‘/’


@app.route("/")
def newUser(email):
   
   msg = Message(
       'Hello',
       sender='josechu130@gmail.com',
       recipients=['josechu13048@gmail.com']
   )
   msg.body = "hola que tal, soy tu yo del futuro vengo a decirte que lo has conseguido, y esta es tu recompensa, holiiii"
   mail.send(msg)
   return 'Sent'


if __name__ == '__main__':
   app.run(debug=True)
