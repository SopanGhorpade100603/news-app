from flask import Flask, request, jsonify
from flask_cors import CORS 
import mysql.connector

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

db_config = {
    "host": "localhost",
    "user": "root",
    "password": "root",
    "database": "newsApp"
}

@app.route('/signup', methods=['POST']) #Access the JSON data sent from the frontend
def signup():
    data = request.get_json()  
    print("data is *** ", data)

    fName = data.get("fName")
    lName = data.get("lName")
    userName = data.get("userName")
    password = data.get("password")
    mobileNumber = data.get("mobileNumber")

    try:
        # Connect to MySQL database
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()

        query = "INSERT INTO users (firstName, lastName, username, password, contactNumber) VALUES (%s, %s, %s, %s, %s)"
        values = (fName, lName, userName, password, mobileNumber)
        cursor.execute(query, values)
        connection.commit()

        # Return success message
        return jsonify({"message": "User registered successfully!", "statusCode": 200}), 200

    except mysql.connector.Error as err:
        # Handle database error
        print("Database Error:", err)
        return jsonify({"error": "Failed to register user"}), 400

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()



@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()  # Access the JSON data sent from the frontend
    if 'formData' not in data:
        return jsonify({"error": "No data provided"}), 400
    
    print("Received data:", data)
    username = data['formData'].get('username')
    password = data['formData'].get('password')

    print("username ** ",username)
    print("password ** ",password)
    if not username :
        return jsonify({'message': 'Username are required'}), 400
    
    elif not password:
        return jsonify({'message': 'Password are required'}), 400  
    

    # Connect to the database
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        query = "SELECT * FROM users WHERE username = %s AND password = %s"
        parameters = (username, password)
        cursor.execute(query, parameters)
        result = cursor.fetchall()
        print("result is ** ",result)

        if result != [] :
            print("login successfull")
            return jsonify({"message": "Data received successfully", "statusCode": 200 ,}) #send respose to ui
    
        else:
            print("User not found")
            return jsonify({'message': 'User not found','statusCode':400}), 400
        
    except mysql.connector.Error as error:
        print("Error to connect db:", error)
        return jsonify({"error": "Database connection error", "statusCode": 500}), 500

    finally:
        if cursor:
            cursor.close()
        if connection.is_connected():
            connection.close()

if __name__ == '__main__':
    app.run(debug=True)