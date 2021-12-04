from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class GeneralModel: 
    def save(self):
        db.session.add(self)
        db.session.commit()
    
    def commit ():
        db.session.commit()

    def add (self):
        db.session.add(self)
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()

class User(db.Model, GeneralModel):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)


    def __repr__(self):
        return '<User %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,      
        }

    def get_user_by_id (id):
        return User.query.filter_by(id=id).first()

    def get_user_by_email (email):
        return User.query.filter_by(email=email).first()
    
    def get_all_users ():
        return User.query.all()