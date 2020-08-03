import requests
# If you are using a Jupyter notebook, uncomment the following line.
# %matplotlib inline
import os
import json
import matplotlib.pyplot as plt
from PIL import Image
from io import BytesIO

analyze_url = "https://westcentralus.api.cognitive.microsoft.com/" + "face/v1.0/detect"

# Set image_path to the local path of an image that you want to analyze.
image_path = "./images/image.png"

# Read the image into a byte array
image_data = open(image_path, "rb").read()
headers = {'Ocp-Apim-Subscription-Key': 'ece7c99725fb4c5eaa47bfdfa6b31d81',
           'Content-Type': 'application/octet-stream'}
params = {'returnFaceAttributes': "age,gender,smile"}
response = requests.post(
    analyze_url, headers=headers, params=params, data=image_data)
response.raise_for_status()

# The 'analysis' object contains various fields that describe the image. The most
# relevant caption for the image is obtained from the 'description' property.
analysis = response.json()
print(analysis)
print("Output from Python") 

with open('data.json', 'w') as outfile:
    json.dump(analysis, outfile)