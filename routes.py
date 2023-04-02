import sys 
import os
from data import storedListings, users
from secret import keys
sys.dont_write_bytecode = True
from flask import Flask, render_template, request, redirect, url_for, flash
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import LoginManager, login_user, logout_user, current_user, login_required, UserMixin

app = Flask(__name__)
app.secret_key= keys.flaskey
login_manager = LoginManager(app)
login_manager.login_view = 'login'



@app.route('/')
def home():
  return render_template('home.html', listings = storedListings.listings) 

@app.route('/listing')
def listing():
  return render_template('listing.html')

@app.route('/form')
def form():
  return render_template('newListForm.html')

@app.route('/create_listing', methods=['POST'])
def create_listing():
    beds = request.form['beds']
    baths = request.form['baths']
    sqft = request.form['sqft']
    location = request.form['location']
    rent = request.form['rent']
    description = request.form['description']
    image_file = request.files['image']
    image_filename = image_file.filename
    image_path =os.path.join('static/img', image_filename)
    image_file.save(image_path)
    storedListings.listings.append({"beds":beds,"baths":baths,"sqft":sqft,"location":location,"description":description,"rent":rent,"imageName":image_filename})
    return render_template('listing.html', beds=beds, baths=baths, sqft=sqft, location=location, rent=rent, description=description, filename=image_filename)


@app.route('/account')
@login_required
def account():
   return render_template('account.html')

#login implementation
class User(UserMixin):
    name: str
    passwordHash: str
    def __init__(self, email, password, name):
        self.id = email
        self.name = name
        self.passwordHash = generate_password_hash(password,method='sha256')

    def __repr__(self):
        return f"<User {self.id}>"


@login_manager.user_loader
def load_user(email):
    if(email in users.users):
       return User(email, users.users[email][0], users.users[email][1])
    return None



@app.route('/signup')
def signup():
    return render_template('signup.html')


@app.route('/signup', methods=['POST'])
def signup_post():

    email = request.form.get('email')
    name = request.form.get('name')
    password = request.form.get('password')
    print(email,name,password)

    # if this returns a user, then the email already exists in database
    if email in users.users:
      print(email,name)
      flash('Email address already exists')
      return render_template('signup.html')

    # create new user with the form data. Hash the password so plaintext version isn't saved.
    users.users[email] = [generate_password_hash(password, method='sha256'),name]

    # add the new user to the database TO DO

    return render_template('login.html')


@app.route('/login')
def login():
    return render_template('login.html')


@app.route('/login', methods=['POST'])
def login_post():
    email = request.form.get('email')
    password = request.form.get('password')
    remember = True if request.form.get('remember') else False

    # check if user actually exists
    if email not in users.users:
      print(email)
      flash('Email address not found ')
      return render_template("login.html")
    
    # take the user supplied password, hash it, and compare it to the hashed password in database
    if not check_password_hash(users.users[email][0], password):
        flash('Please check your login details and try again.')
        return render_template('login.html')  # if user doesn't exist or password is wrong, reload the page

    # # if the above check passes, then we know the user has the right credentials
    user = User(email, users.users[email][0], users.users[email][1])
    login_user(user, remember=remember)
    return redirect(url_for('home'))

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('home'))


if __name__ == '__main__':
  app.run(debug=True)
