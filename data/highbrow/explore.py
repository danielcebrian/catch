
import json

filename = "1b.json"
f = open(filename)
strdata = f.read()
data = json.loads(strdata)
context = data['@context']
items = data['items']

for item in items:
	print "item has keys: " + str(item.keys())
	#print "selector array has length: " + str(len(item["target"]["selector"]))
	#print "annotatedBy: " + str(item["annotatedBy"])
	#print "selector keys" + str(item['target']['selector'][0].keys())
	#print "target keys" + str(item['target'].keys())
	#print "body keys" + str(item['body'].keys())
