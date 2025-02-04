from flask import Flask, render_template, request, jsonify
import sqlite3

app = Flask(__name__)

# Create table
def init_db():
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    cursor.execute("CREATE TABLE IF NOT EXISTS roses (id INTEGER PRIMARY KEY)")
    conn.commit()
    conn.close()

init_db()  # Initializes database

@app.route("/")
def home():
    # Get the current rose count
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM roses")
    rose_count = cursor.fetchone()[0]
    conn.close()

    return render_template("index.html", rose_count=rose_count)

@app.route("/add_rose", methods=["POST"])
def add_rose():
    # Add a new rose to the database
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    cursor.execute("INSERT INTO roses DEFAULT VALUES")
    conn.commit()
    conn.close()

    # Get the updated rose count
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM roses")
    rose_count = cursor.fetchone()[0]
    conn.close()

    # Return the updated rose count
    return jsonify({"message": "Rose planted!", "rose_count": rose_count})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
