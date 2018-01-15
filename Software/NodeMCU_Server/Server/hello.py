from flask import Flask
from flask import request

app = Flask(__name__)


@app.route('/postjson', methods=['POST'])
def postJsonHandler():
    content = request.get_json()
    print(content)
    return 'JSON posted'
app.run(host='192.168.4.19', port=8081)