
import json

filename = "1b.json"
f = open(filename)
strdata = f.read()
data = json.loads(strdata)
context = data['@context']
items = data['items']

for item in items:
	#print "item has keys: " + str(item.keys())
	#print len(item["target"]["selector"])
	print "annotatedBy: " + str(item["annotatedBy"])