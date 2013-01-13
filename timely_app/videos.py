#!/usr/bin/env python

#import frameworks
import webapp2
import jinja2
import os

from model import Video
from tools import TString,ObjectJSONEncoder

from random import random as rand
import re

jinja_environment = jinja2.Environment( loader=jinja2.FileSystemLoader(os.path.dirname(__file__)))

def userIsLogged():
	return math.floor( rand*10 )%2==0

class RegisterContext(): 
	success_flag = False

class RegisterVideo(webapp2.RequestHandler):
	def get(self):
		template = jinja_environment.get_template('/templates/video_form.html')
		self.response.out.write(template.render( {} ))

	def post(self):
		title = TString.trim( self.request.get('txtTitle') )
		link = TString.trim( self.request.get('txtLink') )
		priority = TString.trim( self.request.get('txtPriority') )
		#self.response.out.write(title + ";" + link + ";" + priority)

		
		m = re.search('(http:\/\/)?\w\w\w\.[a-z]+\.[a-z]*.*',link)
		link = m.group(0).split("v=")[1]

		vc = RegisterContext()
		template = jinja_environment.get_template('/templates/video_form.html')

		if priority.isdigit():
			priority = int(priority)
			vc.success_flag = ( priority >= 1 and priority<=5 )
		else:
			vc.success_flag = False

		if vc.success_flag:
			new_v = Video(vd_title=title,vd_link=link,vd_priority=int(priority) )
			new_v.put()
		
		self.response.out.write(template.render({'video_ctx':vc}))
		

class PlayContext():
	user_logged = False

class PlayVideo(webapp2.RequestHandler):
	def get(self):
		pc = PlayContext()
		pc.user_logged = True

		self.response.out.write(ObjectJSONEncoder.encode(pc))

	def post(self):
		pass

class ListVideos(webapp2.RequestHandler):
	def get(self):
		q = Video.all()

		template_values = {
			'list_videos':q.run(limit=10)
		}

		template = jinja_environment.get_template('/templates/video_list.html')
		self.response.out.write(template.render(template_values))		

app = webapp2.WSGIApplication([
	('/videos/register',RegisterVideo),
	('/videos/play',PlayVideo),
	('/videos/list',ListVideos)
], debug=True)

