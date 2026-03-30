from flask import Blueprint, jsonify, request
from models.waste_model import waste_collection, report_collection
from datetime import datetime

report_bp = Blueprint('report', _name_)


@report_bp.route('/monthly', methods=['GET'])
def monthly_report():
    month = datetime.now().strftime("%Y-%m")

    logs = list(waste_collection.find(
        {"date": {"$regex": f"^{month}"}},
        {"_id": 0}
    ))

    category_summary = {}
    total_kg = 0

    for log in logs:
        cat = log.get("category", "Unknown")
        kg = log.get("quantity_kg", 0)
        total_kg += kg

        if cat not in category_summary:
            category_summary[cat] = {"count": 0, "total_kg": 0}

        category_summary[cat]["count"] += 1
        category_summary[cat]["total_kg"] += kg

    report = {
        "month": month,
        "total_entries": len(logs),
        "total_kg": total_kg,
        "category_summary": category_summary,
        "compliance_status": "Submitted" if len(logs) > 0 else "Pending",
        "generated_at": datetime.now().isoformat(),
        "logs": logs
    }

    return jsonify(report), 200


@report_bp.route('/save', methods=['POST'])
def save_report():
    data = request.get_json()
    data["saved_at"] = datetime.now().isoformat()
    result = report_collection.insert_one(data)
    return jsonify({
        "message": "Report saved!",
        "id": str(result.inserted_id)
    }), 201


@report_bp.route('/all', methods=['GET'])
def get_all_reports():
    reports = list(report_collection.find({}, {"_id": 0}))
    return jsonify(reports), 200


@report_bp.route('/test', methods=['GET'])
def test():
    return jsonify({"message": "Report routes working!"}), 200