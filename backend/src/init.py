activate_this_file = "/var/www/html/JossiMusic/backend/venv/bin/activate_this.py"
with open (activate_this_file) as _file:
    exec(_file.read(), dict(__file__=activate_this_file))

import sys
import time
import json
from flask import Flask, jsonify, request
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS
from mailconfig import newUser

app = Flask(__name__, static_folder="../../frontend/build",static_url_path='/')
app.config['MONGO_URI']='mongodb://localhost/jossicdb'

mongo = PyMongo(app)

CORS(app)

db = mongo.db.users
dbfiles = mongo.db.songs

#WebPages
@app.route('/')
def index():
    return app.send_static_file('index.html')



# Api Calls
## User Calls
@app.route('/api/login/<usuario>/<password>', methods=['GET'])
def getUser(usuario,password):
    #sys.stderr.write(str(password))
    checkUser = db.find_one({'usuario': usuario,'contra':password})

    return checkUser['usuario']

@app.route('/api/register', methods=['POST'])
def setNewUser():
    validation = True
    check = db.find_one({'usuario': request.json['usuario'], 'email':request.json['email']})
    if(check == None):
        db.insert({
            'usuario': request.json['usuario'],
            'email': request.json['email'],
            'fecha': request.json['fecha'],
            'contra': request.json['contra'],
            'genero': request.json['genero'],
            'foto': request.json['urlPhoto']
        })
        validation = True
    else:
        validation = False
    
    return str(validation)


@app.route('/api/getAvatarPhoto/<artista>', methods=['GET'])
def getAvatarPhoto(artista):

    gen = db.find_one({'usuario': artista}, {"_id": 0, "foto": 1})
    return jsonify(gen)

# Upload songs and files

@app.route('/api/uploadsong', methods=['POST'])
def uploadSong():
    sys.stderr.write('Fecha de hoy: '+str(time.strftime("%d/%m/%y")))
    id = dbfiles.insert({
        'titulo': request.json['titulo'],
        'descripcion': request.json['descripcion'],
        'artista': request.json['artista'],
        'genero': request.json['genero'],
        'dircancion': request.json['urlsong'],
        'dircaratula': request.json['urlCaratula'],
        'fecha': time.strftime("%d/%m/%y"),
        'reproducciones': 0,
        'likes': 0
    })
    
    return 'ok'


@app.route('/api/getCancionBuscador/<info>', methods=['GET'])
def getCancionBuscador(info):

    songs = []
    search = dbfiles.find({'titulo': {"$regex": '^'+info, '$options': 'i'}})

    for doc in search:
        songs.append({
            '_id': str(ObjectId(doc['_id'])),
            'titulo': doc['titulo'],
            'artista': doc['artista'],
            'genero': doc['genero'],
            'dircancion': doc['dircancion'],
            'dircaratula': doc['dircaratula'],
            'fecha': doc['fecha'],
            'reproducciones': doc['reproducciones'],
            'likes': doc['likes']
        })

    return jsonify(songs)

@app.route('/api/getArtistaBuscador/<info>', methods=['GET'])
def getArtistaBuscador(info):

    arts = []
    search = db.find({'usuario': {"$regex": '^'+info, '$options': 'i'}})

    for doc in search:
        arts.append({
            '_id': str(ObjectId(doc['_id'])),
            'usuario': doc['usuario'],
            'foto': doc['foto']
        })

    return jsonify(arts)

# OBTENER CANCION PO ID
@app.route('/api/getCancionPorId/<id>', methods=['GET'])
def getCancionPorId(id):

    data = str(id)

    song = dbfiles.find_one({'_id': ObjectId(data)}, {'titulo': 1,'artista': 1,'genero': 1,'dircancion': 1,'dircaratula': 1,'fecha': 1,'reproducciones': 1,'likes': 1})

    sys.stderr.write(str(song))

    return json.dumps(song , default=str)

#get music users
@app.route('/api/getMusic/<artista>', methods=['GET'])
def getUserSong(artista):

    songs = []
    search = dbfiles.find({'artista': artista})

    for doc in search:
        songs.append({
            '_id': str(ObjectId(doc['_id'])),
            'titulo': doc['titulo'],
            'artista': doc['artista'],
            'genero': doc['genero'],
            'dircancion': doc['dircancion'],
            'dircaratula': doc['dircaratula'],
            'fecha': doc['fecha'],
            'reproducciones': doc['reproducciones'],
            'likes': doc['likes']
            })  

    return jsonify(songs)

# Change Password from configuration

@app.route('/api/checkOldPassoword/<usuario>/<password>', methods=['GET'])
def checkPassword(usuario, password):
    validation = True
    checkUser = db.find_one({'usuario': usuario, 'contra': password})

    if checkUser == None:
        validation =  False
    else:
        validation = True
    print(validation)
    return str(validation)


@app.route('/api/changePassword/<usuario>', methods=['PUT'])
def changePassword(usuario):

    db.update_one({'usuario': usuario}, {'$set': {"contra": request.json['newPassword2']}})

    return 'ok'


#Update style music conf


@app.route('/api/changeStyle/', methods=['PUT'])
def uploadGen():
    validation = True
    
    if request.json['genero'] != '':
        db.update_one({'usuario': request.json['usuario']},{'$set': {"genero": request.json['genero']}})
        validation = True
    else:
        validation = False

    sys.stderr.write(str(validation))

    return str(validation)


@app.route('/api/checkStyleMusic/<usuario>', methods=['GET'])
def checkGen(usuario):
    
    gen = db.find_one({'usuario':usuario}, {"_id":0,"genero":1})
    
    sys.stderr.write(str(gen))

    return jsonify(gen)




if __name__ == "__main__":
    app.run(debug=True)

