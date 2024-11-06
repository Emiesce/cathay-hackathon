import os
try:
  from config import myAPIkey
except ImportError:
  raise ImportError("You need to define a function myAPIkey() in a file called config.py that returns your API key as a string.")
    

APIKey = myAPIkey()
mappings = {
  "customers": ["details", "bagallowance", "regulatoryrequirements"],
  "flights": ["seatmaps", ""]
}

id = ["6NX8PT", "6I4CKI", "6I4BVT", "6JMJ7I", "6JLWEK", "6JM64U", "6JO9DL", "6JOQ3B", "6JVTAO"]

def format(category, id, infotype):
    return f"https://developers.cathaypacific.com/hackathon-apigw/hackathon-middleware/v1/airport/{category}/{id}/{infotype}"

def getjson(category, id, infotype, jsonfile):
  text = format(category, id, infotype)
  os.system(f" curl -X 'GET' \
    '{text}' \
    -H 'accept: application/json' \
    -H 'apiKey:  {APIKey}' > {jsonfile}")

