import os
from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing for Angular frontend
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = 'uploads'  # Folder for uploaded files
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)  # Ensure folder exists
db = SQLAlchemy(app)
migrate = Migrate(app, db)

class Application(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(100), nullable=False)
    job_url = db.Column(db.String(200), nullable=False)
    cv = db.Column(db.String(100), nullable=False)
    cover_letter = db.Column(db.String(100), nullable=False)

@app.route('/api/applications', methods=['GET'])
def get_applications():
    """Fetch all job applications."""
    applications = Application.query.all()
    return jsonify([{
        "id": app.id,
        "name": app.name,
        "status": app.status,
        "job_url": app.job_url,
        "cv": app.cv,
        "cover_letter": app.cover_letter
    } for app in applications])

@app.route('/api/applications', methods=['POST'])
def add_application():
    """Add a new job application."""
    data = request.form  # For handling FormData
    if 'cv' not in request.files or 'cover_letter' not in request.files:
        return jsonify({"error": "Both CV and Cover Letter are required"}), 400

    cv_file = request.files['cv']
    cover_letter_file = request.files['cover_letter']

    # Save files securely
    cv_filename = secure_filename(cv_file.filename)
    cover_letter_filename = secure_filename(cover_letter_file.filename)

    cv_path = os.path.join(app.config['UPLOAD_FOLDER'], cv_filename)
    cover_letter_path = os.path.join(app.config['UPLOAD_FOLDER'], cover_letter_filename)

    cv_file.save(cv_path)
    cover_letter_file.save(cover_letter_path)

    new_application = Application(
        name=data.get("name"),
        status=data.get("status"),
        job_url=data.get("job_url"),
        cv=cv_path,
        cover_letter=cover_letter_path
    )
    db.session.add(new_application)
    db.session.commit()
    return jsonify({
        "id": new_application.id,
        "name": new_application.name,
        "status": new_application.status,
        "job_url": new_application.job_url,
        "cv": new_application.cv,
        "cover_letter": new_application.cover_letter
    }), 201

@app.route('/api/applications/filter', methods=['GET'])
def filter_applications():
    """Filter job applications based on status and company name."""
    status = request.args.get('status')
    name = request.args.get('name')

    filtered = Application.query
    if status:
        filtered = filtered.filter(Application.status == status)
    if name:
        filtered = filtered.filter(Application.name.ilike(f"%{name}%"))

    return jsonify([{
        "id": app.id,
        "name": app.name,
        "status": app.status,
        "job_url": app.job_url,
        "cv": app.cv,
        "cover_letter": app.cover_letter
    } for app in filtered.all()])

@app.route('/api/applications/<int:application_id>/cv', methods=['GET'])
def get_cv(application_id):
    """Fetch the CV of a job application."""
    application = Application.query.get(application_id)
    if not application:
        return jsonify({"error": "Application not found"}), 404
    return send_file(application.cv, as_attachment=False)  # Change to as_attachment=False

@app.route('/api/applications/<int:application_id>/cover_letter', methods=['GET'])
def get_cover_letter(application_id):
    """Fetch the cover letter of a job application."""
    application = Application.query.get(application_id)
    if not application:
        return jsonify({"error": "Application not found"}), 404
    return send_file(application.cover_letter, as_attachment=False)  # Change to as_attachment=False

@app.route('/api/applications/<int:application_id>', methods=['PUT'])
def update_application(application_id):
    """Update a job application."""
    application = Application.query.get(application_id)
    if not application:
        return jsonify({"error": "Application not found"}), 404

    data = request.form  # For handling FormData
    if 'cv' in request.files:
        cv_file = request.files['cv']
        cv_filename = secure_filename(cv_file.filename)
        cv_path = os.path.join(app.config['UPLOAD_FOLDER'], cv_filename)
        cv_file.save(cv_path)
        application.cv = cv_path

    if 'cover_letter' in request.files:
        cover_letter_file = request.files['cover_letter']
        cover_letter_filename = secure_filename(cover_letter_file.filename)
        cover_letter_path = os.path.join(app.config['UPLOAD_FOLDER'], cover_letter_filename)
        cover_letter_file.save(cover_letter_path)
        application.cover_letter = cover_letter_path

    application.name = data.get("name")
    application.status = data.get("status")
    application.job_url = data.get("job_url")

    db.session.commit()
    return jsonify({
        "id": application.id,
        "name": application.name,
        "status": application.status,
        "job_url": application.job_url,
        "cv": application.cv,
        "cover_letter": application.cover_letter
    })

@app.route('/api/applications/<int:application_id>', methods=['DELETE'])
def remove_application(application_id):
    """Remove a job application."""
    application = Application.query.get(application_id)
    if not application:
        return jsonify({"error": "Application not found"}), 404

    db.session.delete(application)
    db.session.commit()
    return jsonify({"message": "Application removed successfully"}), 200

if __name__ == '__main__':
    app.run(debug=True)