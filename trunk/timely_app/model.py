#coding:utf-8

from google.appengine.ext import db

class User(db.Model):
	us_name_st = db.StringProperty(required=True)
	us_email_st = db.EmailProperty(required=True)
	us_password_st = db.StringProperty(required=True)
	us_points_int = db.IntegerProperty()
	
class Comment(db.Model):
	cm_user = db.ReferenceProperty(User,required=True)
	cm_jackpot = db.IntegerProperty(required=True)	#TODO: Change to ReferenceProperty
	cm_comment = db.TextProperty(required=True)
	
	


	
