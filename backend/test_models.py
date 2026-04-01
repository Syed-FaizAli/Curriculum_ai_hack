import os
import google.generativeai as genai
from dotenv import load_dotenv
from pathlib import Path

# Load env safely
BASE_DIR = Path(__file__).resolve().parent
env_path = BASE_DIR / '.env'
load_dotenv(dotenv_path=env_path)

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    print("API Key not found!")
    exit(1)

genai.configure(api_key=api_key)

models_to_test = [
    'gemini-1.5-flash',
    'gemini-2.0-flash-exp',
    'gemini-pro',
    'gemini-1.5-pro'
]

print(f"Testing Gemini API with key: {api_key[:10]}...")

for model_name in models_to_test:
    print(f"\n--- Testing {model_name} ---")
    try:
        model = genai.GenerativeModel(model_name)
        response = model.generate_content("Hello, are you working?")
        print(f"SUCCESS: {model_name} responded: {response.text}")
    except Exception as e:
        print(f"FAILED: {model_name} - {e}")
