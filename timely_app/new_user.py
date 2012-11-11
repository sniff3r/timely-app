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
		if 'username' in self.request.arguments():
			self.load_user(self.request.get('username'))
		else:
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
		
	def load_user(self,username):
		q = User.all()
		q.filter("us_name_st =",username)
		
		user = None
		for u in q.run(limit=1):
			user = u
		
		template_values = {
			'user': user
		}
		
		template = jinja_environment.get_template('/templates/user_form.html')
		self.response.out.write(template.render(template_values))
		
app = webapp2.WSGIApplication([
    ('/user/new_user', UserForm) #The pattern here matches with all the url
], debug=True)
		
		