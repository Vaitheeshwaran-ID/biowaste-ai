from flask import Blueprint, request, jsonify
from models.waste_model import waste_collection
from datetime import datetime

waste_bp = Blueprint('waste', _name_)


@waste_bp.route('/log', methods=['POST'])
def log_waste():
    data = request.get_json()

    if not data:
        return jsonify({'error': 'No data provided'}), 400

    department = data.get('department', '')
    description = data.get('description', '')
    category = data.get('category', '')
    quantity_kg = data.get('quantity_kg', 0)

    if not department or not description or not category:
        return jsonify({'error': 'department, description and category are required'}), 400

    waste_entry = {
        "department": department,
        "description": description,
        "category": category,
        "quantity_kg": quantity_kg,
        "date": datetime.now().isoformat(),
        "status": "logged"
    }

    result = waste_collection.insert_one(waste_entry)

    return jsonify({
        "message": "Waste logged successfully!",
        "id": str(result.inserted_id)
    }), 201


@waste_bp.route('/logs', methods=['GET'])
def get_all_logs():
    logs = list(waste_collection.find({}, {"_id": 0}))
    return jsonify(logs), 200


@waste_bp.route('/logs/<department>', methods=['GET'])
def get_logs_by_department(department):
    logs = list(waste_collection.find(
        {"department": department},
        {"_id": 0}
    ))
    return jsonify(logs), 200


@waste_bp.route('/stats', methods=['GET'])
def get_stats():
    pipeline = [
        {
            "$group": {
                "_id": "$category",
                "count": {"$sum": 1},
                "total_kg": {"$sum": "$quantity_kg"}
            }
        }
    ]
    stats = list(waste_collection.aggregate(pipeline))

    formatted = []
    for s in stats:
        formatted.append({
            "category": s["_id"],
            "count": s["count"],
            "total_kg": s["total_kg"]
        })

    return jsonify(formatted), 200


@waste_bp.route('/log/<log_id>', methods=['DELETE'])
def delete_log(log_id):
    from bson import ObjectId
    result = waste_collection.delete_one({"_id": ObjectId(log_id)})
    if result.deleted_count == 1:
        return jsonify({"message": "Log deleted"}), 200
    return jsonify({"error": "Log not found"}), 404


@waste_bp.route('/test', methods=['GET'])
def test():
    return jsonify({"message": "Waste routes working!"}), 200