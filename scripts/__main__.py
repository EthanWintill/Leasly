import os
import requests

API_KEY = os.environ.get('API_KEY')
LOCATION = os.environ.get('LOCATION')
RADIUS = os.environ.get('RADIUS')
LAST_PAGE_TOKEN = os.environ.get('LAST_PAGE_TOKEN')

should_use_page_token = False
if not should_use_page_token:
    response = requests.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={}&radius={}&key={}'.format(LOCATION, RADIUS, API_KEY))
else:
    response = requests.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken={}&key={}'.format(LAST_PAGE_TOKEN, API_KEY))

print(response.text)

with open("response10000-2.txt", "w") as f:
    f.write(response.text)