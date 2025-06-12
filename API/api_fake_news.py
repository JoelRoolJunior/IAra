from flask import Flask, request, jsonify
from functions import predict_text

app = Flask(__name__)
# http://127.0.0.1:5000/responder?texto=textoExemplo
@app.route('/responder', methods=['GET'])
def responder():
    texto_recebido = request.args.get('texto')

    if not texto_recebido:
        return jsonify({'erro': 'Nenhum texto foi enviado'}), 400

    # Aqui você pode gerar ou modificar a resposta
    resposta = predict_text(texto_recebido)

    return jsonify({'resposta': resposta})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')