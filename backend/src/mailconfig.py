from flask import Flask
from flask_mail import Mail, Message

app = Flask(__name__)

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'josechu130@gmail.com'
app.config['MAIL_PASSWORD'] = 'FERRARI1'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

Mail = Mail(app)

def newUser(email):
    msg = Message('Gracias por entrar en Jossic.', sender = "Josechu130@gmail.com", recipients = [email])
    msg.body = "Hola esto es una prueba de que te has registrado "
    Mail.send(msg)
    return 'Send'