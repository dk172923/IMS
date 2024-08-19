import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
import joblib

# Load your data
data = pd.read_csv('sample.csv')  # Ensure your data has 'description' and 'category' columns

# Split data into features and labels
X = data['description']
y = data['category']

# Create a pipeline that first converts text data to feature vectors and then trains a Naive Bayes classifier
model = Pipeline([
    ('vectorizer', CountVectorizer()),  # Convert text to features
    ('classifier', MultinomialNB())     # Train a Naive Bayes classifier
])

# Train the model
model.fit(X, y)

# Save the model
joblib.dump(model, 'expense_categorizer_model.pkl')

print("Model trained and saved as 'expense_categorizer_model.pkl'")
