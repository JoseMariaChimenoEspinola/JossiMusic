
activate_this_file = "/var/www/html/JossicMusic/backend/venv/bin/activate_this.py"
with open (activate_this_file) as _file:
    exec(_file.read(), dict(__file__=activate_this_file))

import sys
from flask import Flask, jsonify, request
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS

#import mailconfig as mail


app = Flask(__name__, static_folder="../../frontend/build",static_url_path='/')
app.config['MONGO_URI']='mongodb://localhost/jossicdb'

mongo = PyMongo(app)

CORS(app)

db = mongo.db.users

#WebPages
@app.route('/')
def index():
    return app.send_static_file('index.html')



# Api Calls

@app.route('/api/login/<usuario>', methods=['GET'])
def getUser(usuario):
    
    checkUser = db.find_one({'usuario': usuario})

    return checkUser['usuario']

@app.route('/api/register', methods=['POST'])
def setNewUser():
    ret = ''
    check = db.find_one({'usuario': request.json['usuario']})

    if(check == None):
        id = db.insert({
            'usuario': request.json['usuario'],
            'email': request.json['email'],
            'fecha': request.json['fecha'],
            'contra': request.json['contra'],
            'genero': request.json['genero'],
        })
        ret = 'true'
        #mail.newUser(request.json['email'])
    else:
        ret = 'false'
    sys.stderr.write('log mgs'+str(check))
    
    return ret

if __name__ == "__main__":
    app.run(debug=True)

