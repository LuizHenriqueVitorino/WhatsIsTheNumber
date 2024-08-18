from flask import Flask, jsonify, request
from random import randint
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

NUMBER = None

@app.route('/generate', methods=['POST'])
def genereteNumber():
    global NUMBER
    number = randint(1, 100)
    NUMBER = number
    return jsonify({'code': 200, 'message': 'Número aleatório gerado', 'number': NUMBER}), 200

@app.route('/view', methods=['GET'])
def viewNumber():
    return jsonify({'code': 200, 'number': NUMBER}), 200

@app.route('/check', methods=['POST'])
def checkNumber():
    data = request.get_json()

    if not data or 'number' not in data:
        return jsonify({'code': 400, 'message': 'Forneça um número.'}), 400
    
    if NUMBER is None:
        return jsonify({'code': 400, 'message': 'Número não definido.'}), 400

    number = data["number"]

    if not isinstance(number, int):
        return jsonify({'code': 400, 'message': 'Precisa ser um número inteiro.'}), 400

    if number < NUMBER:
        message = f'O número {number} é menor'

    if number > NUMBER:
        message = f'O número {number} é maior'

    if number == NUMBER:
        message = f'O número {number} está correto'

    return jsonify({'code': 200, 'message': message}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)