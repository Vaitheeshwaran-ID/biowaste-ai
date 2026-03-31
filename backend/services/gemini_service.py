import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-1.5-flash")


def classify_waste(waste_description):
    prompt = f"""
You are a biomedical waste expert trained on CPCB
(Central Pollution Control Board) India guidelines
and Biomedical Waste Management Rules 2016.

A hospital staff member describes this waste:
"{waste_description}"

Classify this waste and respond ONLY in this exact format:

CATEGORY: (choose one: Yellow / Red / Blue / White / Black)
BAG COLOR: (color of bag to use for disposal)
RISK LEVEL: (choose one: High / Medium / Low)
DISPOSAL METHOD: (exact steps to dispose this waste safely)
PRECAUTIONS: (safety steps the staff must follow)
COMPLIANCE NOTE: (which CPCB rule applies)
    """
    response = model.generate_content(prompt)
    return response.text


def get_safety_advice(chemical_name):
    prompt = f"""
You are a laboratory safety expert.

A lab worker is asking about this chemical:
"{chemical_name}"

Respond ONLY in this exact format:

HAZARD LEVEL: (High / Medium / Low)
TYPE OF HAZARD: (Toxic / Flammable / Corrosive / Biohazard)
FIRST AID: (what to do if exposed)
PPE REQUIRED: (gloves / mask / goggles etc)
STORAGE: (how to store safely)
DISPOSAL: (how to dispose safely)
    """
    response = model.generate_content(prompt)
    return response.text