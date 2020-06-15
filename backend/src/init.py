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
@app.route('/cancion')
@app.route('/perfilext')
def index():
    return app.send_static_file('index.html')



# Api Calls
## User Calls
@app.route('/api/login/<usuario>/<password>', methods=['GET'])
def getUser(usuario,password):

    checkUser = db.find_one({'usuario': usuario,'contra':password}, {"_id":1})
    return json.dumps(checkUser , default=str)

@app.route('/api/register', methods=['POST'])
def setNewUser():
    validation = True
    check = db.find_one({"$or": [{ 'usuario': request.json['usuario'] }, { 'email':request.json['email']} ] })

    foto = ""
    
    if request.json['urlPhoto'] == "":
        foto = "https://firebasestorage.googleapis.com/v0/b/jossicstorage.appspot.com/o/fotosperfil%2Favatar_defecto.png?alt=media&token=8753bb2f-7093-49dc-a397-a7ddd2e94590"
    else:
        foto = request.json['urlPhoto']

    if(check == None):
        db.insert({
            'usuario': request.json['usuario'],
            'email': request.json['email'],
            'fecha': request.json['fecha'],
            'contra': request.json['contra'],
            'genero': request.json['genero'],
            'foto': foto
        })
        validation = True
    else:
        validation = False
    
    return str(validation)

#Check email user for reset password
@app.route('/api/resetPassword/<email>', methods=['GET'])
def resetPasswordEmail(email):

    validation = True
    checkUser = db.find_one({'email': email}, {"_id":1})

    if checkUser == None:
        validation =  False
    else:
        validation = True
    
    sys.stderr.write(str(validation))
    
    return str(validation)

# Update data of user/artist
@app.route('/api/updateUserName/<id>', methods=['PUT'])
def updateUserName(id):
    validation = True

    data = str(id)

    db.update_one({'_id': ObjectId(data)}, {'$set': {'usuario': request.json['user']} })

    return str(validation)

@app.route('/api/updateEmail/<id>', methods=['PUT'])
def updateEmail(id):
    validation = True
    data = str(id)
    db.update_one({'_id': ObjectId(data)}, {'$set': {'usuario': request.json['user'],'email': request.json['email']} })

    return str(validation)

@app.route('/api/updatePhotoUser/<id>', methods=['PUT'])
def updateUserPhoto(id):
    validation = True

    data = str(id)

    db.update_one({'_id': ObjectId(data)}, {'$set': {'foto': request.json['urlPhoto']} })

    return str(validation)

# Get avatar by user
@app.route('/api/getDataUser/<id>', methods=['GET'])
def getDataUser(id):
    
    data = str(id)

    gen = db.find_one({'_id': ObjectId(data)}, {"_id": 0, 'usuario':1, "foto": 1, "fecha": 1, "email":1})
    return jsonify(gen)

# Get caratula by id
@app.route('/api/getCaratulaPhoto/<id>', methods=['GET'])
def getCaratulaPhoto(id):
    data = str(id)
    gen = dbfiles.find_one({'_id': ObjectId(data)}, {"_id": 0, "dircaratula": 1})
    return jsonify(gen)

# Get avatar by id
@app.route('/api/getPerfilPhoto/<id>', methods=['GET'])
def getPerfilPhoto(id):
    data = str(id)
    gen = db.find_one({'_id': ObjectId(data)}, {"_id": 0, "foto": 1})
    return jsonify(gen)

# Upload songs and files
@app.route('/api/uploadsong', methods=['POST'])
def uploadSong():
    sys.stderr.write('Fecha de hoy: '+str(time.strftime("%d/%m/%y")))
    id = dbfiles.insert({
        'titulo': request.json['titulo'],
        'descripcion': request.json['descripcion'],
        'artista': ObjectId(request.json['artista']),
        'genero': request.json['genero'],
        'dircancion': request.json['urlsong'],
        'dircaratula': request.json['urlCaratula'],
        'fecha': time.strftime("%d/%m/%y"),
        'reproducciones': 0,
        'likes': 0
    })
    
    return 'ok'

#eliminar cancion por id
@app.route('/api/deleteSong/<id>', methods=['GET'])
def deleteSong(id):

    data = str(id)
    
    dbfiles.delete_one({'_id': ObjectId(data)})

    return 'ok'

# Buscador de contenido de canciones
@app.route('/api/getCancionBuscador/<info>', methods=['GET'])
def getCancionBuscador(info):

    songs = []
    search = dbfiles.find({'titulo': {"$regex": '^'+info, '$options': 'i'}})

    for doc in search:
        artista = db.find_one( {"_id":ObjectId(str(doc['artista']))} , {"usuario":1} )
        songs.append({
            '_id': str(ObjectId(doc['_id'])),
            'titulo': doc['titulo'],
            'artista': artista['usuario'],
            'genero': doc['genero'],
            'dircancion': doc['dircancion'],
            'dircaratula': doc['dircaratula'],
            'fecha': doc['fecha'],
            'reproducciones': doc['reproducciones'],
            'likes': doc['likes']
        })

    return json.dumps(songs , default=str)

# Buscador de contenido de artistas
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
    song = dbfiles.find_one({'_id': ObjectId(data)}, {'titulo': 1,'artista': 1,'genero': 1,'descripcion':1,'dircancion': 1,'dircaratula': 1,'fecha': 1,'reproducciones': 1,'likes': 1})

    return json.dumps(song , default=str)

#Obtener comentarios para cada cancion
@app.route('/api/getCommentsSongs/<song>', methods=['GET'])
def getCommentsSong(song):

    id = str(song)
    comments = dbfiles.find({'_id': ObjectId(id)}, {"_id":0,"comentarios":1})
    sys.stderr.write(str(comments))

    return json.dumps(list(comments) , default=str)

#Crear comentario
@app.route('/api/crearComentario/<id>/<numCom>', methods=['PUT'])
def createComment(id, numCom):

    data = str(id)
    
    dbfiles.update_one({"_id": ObjectId(data)}, {'$addToSet': {"comentarios":{
        "_id": numCom,
        "usuario":request.json['usuario'],
        "foto":request.json['foto'],
        "texto":request.json['comentario'],
        "puntuación":request.json['ranking']
        }}})

    return getCommentsSong(data)



# OBTENER ARTISTA POR ID
@app.route('/api/getArtistaPorId/<id>', methods=['GET'])
def getArtistaPorId(id):
    data = str(id)
    song = db.find_one({'_id': ObjectId(data)}, {'usuario': 1,'email': 1,'fecha': 1,'genero': 1})

    return json.dumps(song , default=str)


#get music users
@app.route('/api/getMusic/<artista>', methods=['GET'])
def getUserSong(artista):
    
    id = str(artista)
    search = dbfiles.find({'artista': ObjectId(id)})
    
    songs = []
    

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

    sys.stderr.write(str(songs))
    return json.dumps(songs , default=str)

#get music stylemusic on homepage
@app.route('/api/getMusicStyleHome/<genero>', methods=['GET'])
def getHomeStyleSongs(genero):

    songs = []
    search = dbfiles.find({'genero': genero})

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

    return json.dumps(songs , default=str)

#get artist stylemusic on homepage
@app.route('/api/getArtistsStyleHome/<genero>', methods=['GET'])
def getHomeStyleArtists(genero):

    songs = []
    search = db.find({'genero': genero})
    for doc in search:
        songs.append({
            '_id': str(ObjectId(doc['_id'])),
            'usuario': doc['usuario'],
            'genero': doc['genero'],
            'foto': doc['foto']
            })  

    return jsonify(songs)

# Change Password from configuration
@app.route('/api/checkOldPassoword/<usuario>/<password>', methods=['GET'])
def checkPassword(usuario, password):
    id = str(usuario)
    validation = True
    checkUser = db.find_one({'_id': ObjectId(id), 'contra': password})

    if checkUser == None:
        validation =  False
    else:
        validation = True
    print(validation)
    return str(validation)


@app.route('/api/changePassword/<usuario>', methods=['PUT'])
def changePassword(usuario):
    id = str(usuario)

    db.update_one({'_id': ObjectId(id)}, {'$set': {"contra": request.json['newPassword2']}})

    return 'ok'


#Update style music conf


@app.route('/api/changeStyle/', methods=['PUT'])
def uploadGen():
    validation = True
    
    if request.json['genero'] != '':
        id = str(request.json['usuario'])
        db.update_one({'_id': ObjectId(id)},{'$set': {"genero": request.json['genero']}})
        validation = True
    else:
        validation = False

    sys.stderr.write(str(validation))

    return str(validation)


@app.route('/api/checkStyleMusic/<usuario>', methods=['GET'])
def checkGen(usuario):
    id = str(usuario)
    gen = db.find_one({'_id':ObjectId(id)}, {"_id":0,"genero":1})
    
    sys.stderr.write(str(gen))

    return jsonify(gen)




if __name__ == "__main__":
    app.run(debug=True)

