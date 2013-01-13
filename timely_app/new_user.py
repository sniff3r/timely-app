#!/usr/bin/env python

#import frameworks
import webapp2
import jinja2
import os

#import models
from model import User
import logging

jinja_environment = jinja2.Environment( loader=jinja2.FileSystemLoader(os.path.dirname(__file__)))

class UserForm(webapp2.RequestHandler):
	def get(self):
		template = jinja_environment.get_template('/templates/user_form.html')
		self.response.out.write(template.render({'username':'None yet'}))
					
	def post(self):
		_u = self.request.get('textUsername')
		_e  = self.request.get('emailEmail')
		_pw = self.request.get('passPassword')
		_pt = 0
	
		new_user = User(us_name_st=_u,us_email_st=_e,us_password_st=_pw,us_points_int=_pt)
		new_user.put()
		
		template_values = {
			'username':_u
		}
		
		template = jinja_environment.get_template('/templates/user_form.html')
		self.response.out.write(template.render(template_values))
		

class UserList(webapp2.RequestHandler):
	def get(self):
		q = User.all()

		template_values = {
			'list_users':q.run(limit=10)
		}

		template = jinja_environment.get_template('/templates/user_list.html')
		self.response.out.write(template.render(template_values))

class Login(webapp2.RequestHandler):		
	def post(self):		
		q = User.all()
		q.filter("us_name_st =",self.request.get("login"))
		q.filter("us_password_st",self.request.get("password"))
		
		user = None
		for u in q.run(limit=1):
			user = u
		
		login_error = user is None

		template_values = {
			'login_error': login_error,
			'user': user
		}
		
		template = jinja_environment.get_template('/templates/main.html')
		self.response.out.write(template.render(template_values))		

		
app = webapp2.WSGIApplication([
    ('/user/new', UserForm), #The pattern here matches with all the url
	('/user/list',UserList),
	('/user/login',Login)
], debug=True)
		
		