import connection_handler


@connection_handler.connection_handler
def registration(cursor, user_name, password):
    cursor.execute("""
                    INSERT INTO users (user_name, password) 
                    VALUES (%(user_name)s, %(password)s)
                    """,
                   {
                       'user_name': user_name,
                       'password': password
                   })


@connection_handler.connection_handler
def get_user_info_to_login(cursor, user_name):
    cursor.execute("""
                    SELECT * FROM users
                    WHERE user_name LIKE %(user_name)s;
                    """,
                   {
                       'user_name': user_name
                   })
    try:
        password = cursor.fetchone()['password']
        return password
    except:
        return False


@connection_handler.connection_handler
def check_if_user_name_exists_when_register(cursor, user_name):
    cursor.execute("""
                    SELECT * FROM users
                    WHERE user_name LIKE %(user_name)s;
                    """,
                   {
                       'user_name': user_name
                   })
    try:
        user_name_to_return = cursor.fetchone()['user_name']
        return user_name_to_return
    except:
        return False
