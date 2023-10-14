import requests

# Replace with your Cohere API endpoint and API key
cohere_api_endpoint = "https://api.cohere-technologies.com/v1/similarity"
api_key = "L2VMOXwleskZQjVuP5QEe2puJTKNLAzGaRhSEVTK"

# output question

# Texts to compare
# text 1: input from user
text1 = input("Answer TutorBo!")
# text 2: get the corresponding answer from the array
text2 = "This is the second piece of text."

# Construct the request
data = {
    "text1": text1,
    "text2": text2
}

headers = {
    "Authorization": f"Bearer {api_key}"
}

# Make the API request
response = requests.post(cohere_api_endpoint, json=data, headers=headers)

if response.status_code == 200:
    result = response.json()
    similarity_score = result["similarity_score"]
    print(f"Similarity Score: {similarity_score}")
else:
    print(f"API Request Failed: {response.status_code} - {response.text}")
