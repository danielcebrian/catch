

var fs = require('fs');

//var filename = "ae.json";
var filename = "media.json";
var fdata = fs.readFileSync(filename);

var data = JSON.parse(fdata);

var strdata = JSON.stringify(data);

strdata = strdata.replace(/'/g, "\\'");
strdata = strdata.replace(/\\n/g, "\\\\n");
strdata = strdata.replace(/\\t/g, "\\\\t");

outfileName = filename + ".fix";
fs.writeFileSync(outfileName, strdata);



/*

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
*/