#!/usr/env/python

import inspect

class TString():
	@staticmethod
	def trim(str):
		return str.replace(" ", "")
		
class ObjectJSONEncoder():
	@staticmethod
	def encode(obj):
		is_not_method = lambda x: not inspect.isroutine(x)
		non_methods = inspect.getmembers(obj,is_not_method)
		return { attr:value for attr,value in non_methods 
				 if not attr.startswith('__') } 
				 