from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Parabéns, vc está acessando o servidor do Luiz Henrique.</p>"
