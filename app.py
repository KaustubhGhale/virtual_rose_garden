from flask import Flask, render_template, request, jsonify
import sqlite3

app = Flask(__name__)

#Create table
def init_db():
    conn=sqlite3.connect("database.db")
    cursor=conn.cursor()
    cursor.execute("CREATE TABLE IF NOT EXISTS roses (id INTEGER PRIMARY KEY)")
    conn.commit()
    conn.close()

init_db() #Initializes database

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/add_rose", methods=["POST"])
def add_rose():
    conn=sqlite3.connect("database.db")
    cursor = conn.cursor()
    cursor.execute("INSERT INTO roses DEFAULT VALUES")
    conn.commit()
    conn.close()
    return jsonify({"message":"Rose planted!"})

if __name__=="__main__":
    app.run(debug=True)
