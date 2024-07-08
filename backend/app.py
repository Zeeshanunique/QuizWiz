from flask import Flask, render_template, request, jsonify, session
from flask_cors import CORS
from dotenv import load_dotenv
import os
import json
import google.generativeai as genai

# Load environment variables
load_dotenv()

# Configure Google Generative AI
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

app = Flask(__name__)
CORS(app)
app.secret_key = os.getenv("SECRET_KEY", "fallback_secret_key")

def get_gemini_response(input_text):
    model = genai.GenerativeModel("gemini-1.5-flash", generation_config={"response_mime_type": "application/json"})
    response = model.generate_content(input_text)
    return response.text

@app.route('/generate_quiz', methods=['POST'])
def generate_quiz():
    try:
        quiz_data = request.json
        if not quiz_data:
            return jsonify({"error": "No data received"}), 400
        
        prompt = f"""
        Create a quiz with the following parameters:
        - Target audience: {quiz_data['quiz_for']}
        - Subject: {quiz_data['subject']}
        - Schooling level: {quiz_data.get('schooling_level', 'N/A')}
        - Number of questions: {quiz_data['numQuestions']}
        - Difficulty level: {quiz_data['level']}
        - Language: {quiz_data['language']}

        Use this JSON schema:
        {{
            "questions": [
                {{
                    "question": ["str"],
                    "options": ["str", "str", "str", "str"],
                    "correct_answer": "str"
                }}
            ]
        }}
        
        Return a list of {quiz_data['numQuestions']} questions following this schema.
        """
        
        raw_response = get_gemini_response(prompt)
        print("Raw Response from Gemini:", raw_response)
        
        data = json.loads(raw_response)
        session['questions'] = data['questions']
        return jsonify(data)
    except json.JSONDecodeError as e:
        print("JSON Decode Error:", e)
        return jsonify({"error": "Error parsing the response. Please try again."}), 400
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "An error occurred. Please try again."}), 500

@app.route('/submit_quiz', methods=['POST'])
def submit_quiz():
    try:
        questions = session.get('questions')
        if not questions:
            return jsonify({"error": "Quiz not found. Please generate a new quiz."}), 400

        user_answers = request.json
        score = 0
        results = []

        for idx, question in enumerate(questions):
            correct_answer = question['correct_answer']
            user_answer = user_answers.get(f"question_{idx}")
            is_correct = user_answer == correct_answer
            if is_correct:
                score += 1
            results.append({
                'question': question['question'],
                'correct_answer': correct_answer,
                'user_answer': user_answer,
                'is_correct': is_correct
            })

        return jsonify({"results": results, "score": score, "total": len(questions)})
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "An error occurred. Please try again."}), 500

if __name__ == '__main__':
    app.run(debug=True)