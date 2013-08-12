
import json

filename = "ae.json"
f = open(filename)
strdata = f.read()
data = json.loads(strdata)
context = data['@context']
items = data['items']

subset = items[0:10]

strset = json.dumps(subset)

f = open(filename + ".subset", "w")
f.write(strset)
f.close()


#for item in items:
#	print "item has keys: " + str(item.keys())
	#print "selector array has length: " + str(len(item["target"]["selector"]))
	#print "annotatedBy: " + str(item["annotatedBy"])
	#print "selector keys" + str(item['target']['selector'][0].keys())
	#print "target keys" + str(item['target'].keys())
	#print "body keys" + str(item['body'].keys())
