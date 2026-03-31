from flask import Flask
from flask_cors import CORS
from routes.waste_routes import waste_bp
from routes.ai_routes import ai_bp
from routes.report_routes import report_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(waste_bp, url_prefix='/api/waste')
app.register_blueprint(ai_bp, url_prefix='/api/ai')
app.register_blueprint(report_bp, url_prefix='/api/report')


@app.route('/')
def home():
    return {
        'message': 'BioWaste AI Backend is running!',
        'routes': {
            'waste': '/api/waste',
            'ai': '/api/ai',
            'report': '/api/report'
        }
    }


@app.errorhandler(404)
def not_found(e):
    return {'error': 'Route not found'}, 404


@app.errorhandler(500)
def server_error(e):
    return {'error': 'Internal server error'}, 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)