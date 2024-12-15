
# from flask import Flask, request, render_template, jsonify
# import os
# import csv
# import json
# import google.generativeai as genai
# from flask_cors import CORS

# app = Flask(__name__)

# # Enable CORS for all domains (or specify a list of allowed origins)
# CORS(app, resources={r"/*": {"origins": "*"}})  # This allows all origins. You can specify your frontend origin here if needed.

# # Configure upload folder and allowed file extensions
# app.config['UPLOAD_FOLDER'] = './media'
# app.config['ALLOWED_EXTENSIONS'] = {'csv'}

# # My Gemini API key
# MY_GEMINI_API_KEY = "AIzaSyB-wj9C-4ba2iQegvU2T9guXo5p1JeRdqY"

# # Configure Gemini
# genai.configure(api_key=MY_GEMINI_API_KEY)

# # Check allowed extensions
# def allowed_file(filename):
#     return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

# # Convert CSV to JSON, limiting to the first 500 rows
# def csv_to_json(csv_file, limit=500):
#     data = []
#     with open(csv_file, 'r') as csvfile:
#         reader = csv.DictReader(csvfile)
#         for i, row in enumerate(reader):
#             if i >= limit:  # Stop after 'limit' rows
#                 break
#             data.append(row)
#     json_data = json.dumps(data, indent=4)
#     return json_data

# @app.route('/')
# def index():
#     return render_template('index.html')  # The HTML form

# @app.route('/upload', methods=['POST'])
# def upload_file():
#     # Print all files in the request for debugging purposes
#     print(request.files.getlist('file'))  # You can print all files sent in the request

#     # Retrieve the file from the request
#     file = request.files.get('file')  # Use .get to safely access the file

#     # Check if the file was provided
#     if file is None:
#         return jsonify({'error': 'No file part'}), 400

#     # Get the filename from the file object
#     filename = file.filename

#     # Check if a file was selected (filename must not be empty)
#     if not filename:
#         return jsonify({'error': 'No selected file'}), 400

#     # Validate file extension (only allow CSV files)
#     if not allowed_file(filename):
#         return jsonify({'error': 'Only CSV files are allowed'}), 400

#     # Ensure the media folder exists
#     os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

#     # Define the path where the file will be saved
#     file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)

#     # Save the file to the media folder
#     file.save(file_path)

#     # Example usage:
#     csv_file = f'./media/{filename}'
#     json_string = csv_to_json(csv_file, limit=500)

#     # Generate summary using Gemini model
#     model = genai.GenerativeModel("gemini-1.5-flash")
#     response = model.generate_content([f"Give me a summary of this CSV data: {json_string}"])

#     # Print the response in the console window
#     print("Generated Summary:", response.text)

#     # Manually add CORS headers to the response
#     response_json = jsonify({'summary': response.text})
#     response_json.headers.add('Access-Control-Allow-Origin', '*')  # Add the CORS header

#     return response_json

# if __name__ == '__main__':
#     app.run(debug=True)
from flask import Flask, request, render_template, jsonify
import os
import csv
import json
import google.generativeai as genai
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS for all domains (or specify a list of allowed origins)
CORS(app, resources={r"/*": {"origins": "*"}})  # This allows all origins. You can specify your frontend origin here if needed.

# Configure upload folder and allowed file extensions
app.config['UPLOAD_FOLDER'] = './media'
app.config['ALLOWED_EXTENSIONS'] = {'csv'}

# My Gemini API key
MY_GEMINI_API_KEY = "AIzaSyB-wj9C-4ba2iQegvU2T9guXo5p1JeRdqY"

# Configure Gemini
genai.configure(api_key=MY_GEMINI_API_KEY)

# Check allowed extensions
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

# Convert CSV to JSON, limiting to the first 500 rows
def csv_to_json(csv_file, limit=500):
    data = []
    with open(csv_file, 'r') as csvfile:
        reader = csv.DictReader(csvfile)
        for i, row in enumerate(reader):
            if i >= limit:  # Stop after 'limit' rows
                break
            data.append(row)
    json_data = json.dumps(data, indent=4)
    return json_data

# Function to generate summary for objectives, inclusion/exclusion criteria, and methodology
def generate_summary(csv_data):
    objectives = []
    inclusion_criteria = []
    exclusion_criteria = []
    methodology = []

    # Sample logic to extract objectives, inclusion/exclusion criteria, and methodology from the CSV data
    for row in csv_data:
        # Assuming 'Objectives', 'Inclusion Criteria', 'Exclusion Criteria', 'Methodology' are column names in the CSV
        objectives.append(row.get('Objectives', 'N/A'))
        inclusion_criteria.append(row.get('Inclusion Criteria', 'N/A'))
        exclusion_criteria.append(row.get('Exclusion Criteria', 'N/A'))
        methodology.append(row.get('Methodology', 'N/A'))

    # Format the extracted data
    summary = {
        'objectives': objectives[:5],  # Limiting to first 5 objectives for brevity
        'inclusion_exclusion_criteria': {
            'inclusion': inclusion_criteria[:5],  # Limiting to first 5 inclusion criteria
            'exclusion': exclusion_criteria[:5],  # Limiting to first 5 exclusion criteria
        },
        'methodology': methodology[:5]  # Limiting to first 5 methodologies
    }

    return summary

@app.route('/')
def index():
    return render_template('index.html')  # The HTML form

@app.route('/upload', methods=['POST'])
def upload_file():
    # Print all files in the request for debugging purposes
    print(request.files.getlist('file'))  # You can print all files sent in the request

    # Retrieve the file from the request
    file = request.files.get('file')  # Use .get to safely access the file

    # Check if the file was provided
    if file is None:
        return jsonify({'error': 'No file part'}), 400

    # Get the filename from the file object
    filename = file.filename

    # Check if a file was selected (filename must not be empty)
    if not filename:
        return jsonify({'error': 'No selected file'}), 400

    # Validate file extension (only allow CSV files)
    if not allowed_file(filename):
        return jsonify({'error': 'Only CSV files are allowed'}), 400

    # Ensure the media folder exists
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

    # Define the path where the file will be saved
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)

    # Save the file to the media folder
    file.save(file_path)

    # Convert CSV to JSON (Limiting to 500 rows)
    csv_file = f'./media/{filename}'
    csv_data = csv_to_json(csv_file, limit=500)

    # Parse CSV data into a dictionary
    csv_dict = json.loads(csv_data)

    # Generate the summary based on the parsed CSV data
    summary = generate_summary(csv_dict)

    # Print the summary in the console window
    print("Generated Summary:", summary)

    # Manually add CORS headers to the response
    response_json = jsonify({'summary': summary})
    response_json.headers.add('Access-Control-Allow-Origin', '*')  # Add the CORS header

    return response_json

if __name__ == '__main__':
    app.run(debug=True)
