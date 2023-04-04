from flask import Flask, request, jsonify
from secret.Keys import appkey 
from models import User, Messages, Sublease, db
from werkzeug.security import generate_password_hash
import uuid
from flask_cors import CORS



app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = appkey #go to backend/secret/Keys.py
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'

db.init_app(app)
with app.app_context():
    db.create_all()

#test this server by running 'python routes.py in terminal, then curling in a different terminal
#install a vscode extension to view database

#returns JSON for a specific account given their ID
#test with curl 127.0.0.1:5000/account/0
@app.route('/account/<string:id>', methods=['GET'])
def getUser(id):
  user = User.query.get(id) #TODO update this to UUID and in database as well
  if not user:
        return jsonify({'error': 'User not found'}), 404
  user_dict = user.__dict__
  del user_dict['_sa_instance_state']
  return jsonify(user_dict)


#add a user to database, returns json from user in database
#test with curl --location --request POST '127.0.0.1:5000/signup' --header 'Content-Type: application/x-www-form-urlencoded' --data-urlencode 'username=johndoe' --data-urlencode 'password=secret' --data-urlencode 'email=john@doe.com' --data-urlencode 'id=0'
#CONNECTED TO REACT
@app.route('/api/signup', methods=['POST'])
def addUser():
    id = str(uuid.uuid4())
    email = request.json['email']
    password = request.json['password']
    username = request.json['username']

    print(f"\nNew User: {request.json} recieved")

    newUser = User(id=id, name=username, email=email, password=generate_password_hash(password, method='sha256'))
    db.session.add(newUser)
    db.session.commit()
    return getUser(id) ##return json of new user to confirm it worked

#add a listing to database, returns object from listing in database
#test with curl --location --request POST '127.0.0.1:5000/addListing' --header 'Content-Type: application/x-www-form-urlencoded' --data-urlencode 'apartment=' --data-urlencode 'rent=1000' --data-urlencode 'user_id=1' --data-urlencode 'bed=4' --data-urlencode 'bath=3' --data-urlencode 'sqft=2000' --data-urlencode 'location=houston' --data-urlencode 'description=This beautiful house is perfect for families or groups. It features three bedrooms, two bathrooms, a large living room, and a fully equipped kitchen. The house is located in a quiet, tree-lined neighborhood with easy access to shopping and dining.'
@app.route('/addListing', methods=['POST'])
def addSublet():
    id = str(uuid.uuid4())
    subleaser_id = request.form.get('user_id')
    apartment_name = request.form.get('apartment')
    rent = request.form.get('rent')
    bed = request.form.get('bed')
    bath = request.form.get('bath')
    sqft = request.form.get('sqft')
    desc = request.form.get('description')
    location = request.form.get('location')

    newListing = Sublease(id=id, subleaser_id=subleaser_id, apartment_name=apartment_name, rent=rent, bed=bed, bath=bath, sqft=sqft, description=desc, location=location)
    db.session.add(newListing)
    db.session.commit()

    return str(Sublease.query.get(id))+'\n' #TODO change this to JSON once getListing route implemented

#gets a list of json representations of all listings
#test with curl 127.0.0.1:5000/api/sublets
#CONNECTED TO REACT
@app.route('/api/sublets', methods=['GET'])
def get_sublets():
    sublets = Sublease.query.all()
    sublets_list = [sublet.to_dict() for sublet in sublets]
    return jsonify(sublets_list)




if __name__ == '__main__':
  app.run(debug=True)
