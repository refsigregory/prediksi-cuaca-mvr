from flask import Flask
from flask import render_template, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)


@app.route("/getdata", methods=['GET', 'POST'])
def datdata():
    import numpy as np

    #text = request.values.get('text')

    import numpy as np
    import pandas as pd
    import matplotlib.pyplot as plt

    from sklearn.preprocessing import LabelEncoder
    from sklearn.preprocessing import RobustScaler
    from sklearn.model_selection import train_test_split

    import tensorflow as tf

    from sklearn.metrics import f1_score

    data = pd.read_csv("data_bmkg_filter_3.xls")
    pd.set_option('display.max_columns', None)
    data.drop('Tanggal', axis=1, inplace=True)
    data.drop('Bulan', axis=1, inplace=True)
    data.isnull().sum()
    data['Tempratur'].unique()
    data['curahhujan'] = data['curahhujan'].fillna('No')
    y = data['curahhujan']
    X = data.drop('curahhujan', axis=1)
    scaler = RobustScaler()
    X = pd.DataFrame(scaler.fit_transform(X), columns=X.columns)
    X_train, X_test, y_train, y_test = train_test_split(X, y, train_size=0.8)
    inputs = tf.keras.Input(shape=(5,))
    x = tf.keras.layers.Dense(16, activation='relu')(inputs)
    x = tf.keras.layers.Dense(16, activation='relu')(x)
    outputs = tf.keras.layers.Dense(2, activation='softmax')(x)

    model = tf.keras.Model(inputs=inputs, outputs=outputs)

    model.summary()

    model.compile(
        optimizer='adam',
        loss='sparse_categorical_crossentropy',
        metrics=['accuracy']
    )

    EPOCHS = 10
    BATCH_SIZE = 64

    history = model.fit(
        X_train,
        y_train,
        validation_split=0.2,
        epochs=EPOCHS,
        batch_size=BATCH_SIZE,
        verbose=1
    )

    plt.figure(figsize=(14, 10))

    plt.plot(range(EPOCHS), history.history['loss'], color='b')
    plt.plot(range(EPOCHS), history.history['val_loss'], color='r')

    plt.xlabel('Epoch')
    plt.ylabel('Loss')

    #plt.show(); // hide plt

    np.argmin(history.history['val_loss'])

    print(f"Model Accuracy: {model.evaluate(X_test, y_test, verbose=0)[1]}")

    y.sum() / len(y)

    y_pred = model.predict(X_test)

    y_pred

    y_test

    y_pred = list(map(lambda x: np.argmax(x), y_pred))

    print(f"Model F1 Score: {f1_score(y_test, y_pred)}")

    # kelembapan = 1.314286
    # udara_rata2 = -1.333333
    # tekanan = -0.769231
    # kecepatan = -0.296296
    # arahangin = -0.642857
    kelembapan = float(request.values.get('kelembapan'))
    udara_rata2 = float(request.values.get('udara_rata2'))
    tekanan = float(request.values.get('tekanan'))
    kecepatan = float(request.values.get('kecepatan'))
    arahangin = float(request.values.get('arahangin'))

    new_input = [[kelembapan, udara_rata2, tekanan, kecepatan, arahangin]]

    new_output = model.predict(new_input)

    print("new input: ", new_input, "prediksi cuaca", new_output)

    return jsonify(new_output.tolist())

@app.route("/newinput", methods=['GET', 'POST'])
def newinput():
    # kata = request.values.get('kata_typo')
    # saran = request.values.get('kata_baku')
    # ini_typo = request.values.get('ini_typo')
    # ini_baku = request.values.get('ini_baku')
    # ini_valid = request.values.get('ini_valid')
    #
    # pendeteksi.addCorrection(pendeteksi, 'data/kamus_typo.csv', [kata, saran, ini_typo, ini_baku, ini_valid])
    #
    return "ok"


if __name__ == "__main__":
    app.run(debug=True)