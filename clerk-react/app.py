from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)

# Enable CORS for all origins
CORS(app)

# Load the trained model
model = joblib.load('expense_categorizer_model.pk3')

@app.route('/api/categorize', methods=['POST'])
def categorize():
    data = request.json
    description = data.get('description', '') # type: ignore
    
    # Predict the category using the model
    prediction = model.predict([description])
    
    return jsonify({'category': prediction[0]})

if __name__ == '__main__':
    app.run(port=5001)
