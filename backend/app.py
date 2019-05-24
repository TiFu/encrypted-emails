from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/cryptomail/api/v1.0/CreateKeys', methods = ["POST"])
def getKeys():
    data = request.get_json()
    print(type(data))
    return "Hello, World!"

if __name__ == '__main__':
    app.run(debug=True)