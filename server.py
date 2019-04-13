from flask import Flask, render_template, session, request, redirect, url_for
import password_hashing_and_verifying
import data_handler

app = Flask(__name__)
app.secret_key = 'a52#&358qPLsa&&@34'


@app.route('/')
def homepage():
    if 'user_name' in session:
        logged_in = True
        user_name = session['user_name']
    else:
        logged_in = False
        user_name = None

    return render_template('homepage.html', logged_in=logged_in, user_name=user_name)


@app.route('/registration/', methods=['GET', 'POST'])
def registration():
    if request.method == 'POST':
        user_name = request.form.get('user_name')
        pass1 = request.form.get('pass1')
        pass2 = request.form.get('pass2')
        if data_handler.check_if_user_name_exists_when_register(user_name):
            message = 'This username is already in use!'
            return render_template('registration.html', message=message, usrnm=user_name)

        if pass1 == pass2:
            hashed_pass = password_hashing_and_verifying.hash_password(pass1)
            data_handler.registration(user_name, hashed_pass)
            return redirect(url_for('homepage'))
        else:
            message = 'Passwords were different, please try again!'
            return render_template('registration.html', message=message, usrnm=user_name)


    return render_template('registration.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == "POST":
        user_name = request.form.get('user_name')
        password = request.form.get('pass')
        hashed_pass_from_database = data_handler.get_user_info_to_login(user_name)

        if hashed_pass_from_database:
            verification = password_hashing_and_verifying.verify_password(password, hashed_pass_from_database)

            if verification:
                session['user_name'] = request.form.get('user_name')
                return redirect(url_for('homepage'))
            else:
                text = 'Invalid username or password. Please try again!'
                return render_template('login.html', text=text)
        text = 'Invalid username or password. Please try again!'
        return render_template('login.html', text=text)

    return render_template('login.html')


@app.route('/logout', methods=['GET', 'POST'])
def logout():
    session.pop('user_name', None)
    return redirect(url_for('homepage'))


if __name__ == '__main__':
    app.run()
