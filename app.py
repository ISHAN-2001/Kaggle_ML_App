from flask import Flask,jsonify, request
from flask_cors import CORS, cross_origin
import json
from joblib import load
import pandas as pd

#load models
crop_model = load('crop.pkl')
label_df = pd.read_csv('Crop_Label.csv')

lung_model = load('lung_cancer')

water_model = load('water_quality')


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/', methods=['GET'])
@cross_origin()
def welcome():
    return jsonify({'status':'Welcome to Kaggle ML app',
                    'crop-prediction': 'POST: http://localhost:3000/crop',
                    'Lung Cancer':'POST: http://localhost:3000/lung',
                    'water-potability':'POST: http://localhost:3000/water'})


@app.route('/crop',methods=['POST'])
@cross_origin()
def crop():

    print("In /crop route")
    record = request.get_json()
    print(record)

    
    # print("username",record['username'])
    # print("password",record['password'])
    # print("username ={} and  pasword={}".format(record['username'],record['password']))


    n= record['n']
    p= record['p']
    k = record['k']
    temp = record['temp']
    hum = record['hum']
    ph = record['ph']
    rain = record['rain']
    print(n,p,k,temp,hum,ph,rain)

    input = [n,p,k,temp,hum,ph,rain]
    plant = crop_model.predict([input])
    plant = plant[0]
    final_plant = label_df[label_df.label_le == plant]['label'].unique()[0]

    print(final_plant)

    return jsonify({"ans":final_plant})


@app.route('/water',methods=['POST'])
@cross_origin()
def water():

    print("In /water route")
    record = request.get_json()
    print(record)

    ph = record['ph']
    hard= record['hard']
    solids = record['solids']
    amines = record['amines']
    sulphur = record['sulphur']
    conductivity = record['conductivity']
    carbon = record['carbon']
    methane = record['methane']
    turbidity = record['turbidity']

    input = [ph,hard,solids,amines,sulphur,conductivity,carbon,methane,turbidity]

    ans = water_model.predict([input])[0]

    ans = 'HIGH' if input==1 else 'LOW'

    return jsonify({"ans":ans})


@app.route('/lung',methods=['POST'])
@cross_origin()
def lung():

    print("In /lung route")
    record = request.get_json()
    print(record)


    AGE=record['age']
    SMOKING=record['smoke']
    YELLOW_FINGERS=record['yellow']
    ANXIETY=record['anxiety']
    PEER_PRESSURE=record['peer']
    CHRONIC=record['chronic']
    FATIGUE=record['fatigue']
    ALLERGY=record['allergy']
    WHEEZING=record['wheeze']
    ALCOHOL=record['alcohol']
    COUGH=record['cough']
    BREATH=record['breath']
    SWALLOW=record['swallow']
    CHEST=record['chest']
    GENDER=record['gender']

    res =[AGE,SMOKING,YELLOW_FINGERS,ANXIETY,PEER_PRESSURE,CHRONIC,FATIGUE,ALLERGY,WHEEZING,ALCOHOL,COUGH,BREATH,SWALLOW,CHEST,GENDER]
    ans = lung_model.predict([res])[0]

    ans=  'YES' if ans==1 else 'NO'

    return jsonify({"ans":ans})






if __name__ == '__main__':
    app.run(port=3000,debug=True)