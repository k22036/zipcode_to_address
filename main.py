from flask import Flask, request, render_template, jsonify
import requests

app = Flask(__name__)
app.config["JSON_AS_ASCII"] = False  # 日本語などのASCII以外の文字列を返したい場合は、こちらを設定しておく

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/address', methods=['POST'])
def result():
    zipcode = request.form['zipcode']
    
    # format check
    if len(zipcode) != 7 or zipcode.isdigit() == False:
        res = {'zipcode':zipcode, 'address': '-1'}
        return jsonify(res)
    
    url = 'https://api.zipaddress.net/'
    params = {'zipcode': zipcode}
    response = requests.get(url, params=params)
    code = response.json()['code']
    if code == 200:
        fullAddress = response.json()['data']['fullAddress']
        res = {'zipcode':zipcode, 'address': fullAddress}
        return jsonify(res)
    else:
        res = {'zipcode':zipcode, 'address': '-1'}
        return jsonify(res)
    
if __name__ == "__main__":
    # debugモードが不要の場合は、debug=Trueを消してください
    app.run(debug=True)