from flask import Blueprint, request, jsonify
from services.gemini_service import classify_waste, get_safety_advice

ai_bp = Blueprint('ai', _name_)


@ai_bp.route('/classify', methods=['POST'])
def classify():
    data = request.get_json()
    description = data.get('description', '')

    if not description:
        return jsonify({'error': 'No description provided'}), 400

    if len(description) < 5:
        return jsonify({'error': 'Description too short'}), 400

    try:
        result = classify_waste(description)
        return jsonify({'result': result}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@ai_bp.route('/safety', methods=['POST'])
def safety():
    data = request.get_json()
    chemical = data.get('chemical', '')

    if not chemical:
        return jsonify({'error': 'No chemical name provided'}), 400

    try:
        result = get_safety_advice(chemical)
        return jsonify({'result': result}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@ai_bp.route('/test', methods=['GET'])
def test():
    return jsonify({'message': 'AI routes working!'}), 200