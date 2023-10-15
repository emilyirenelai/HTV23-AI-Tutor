# # WORKS: Getting matching questions and answers
# q_s = ['Question: What is the main idea of this lesson?', 'Question: Why is it expensive to connect and disconnect from a database multiple times?', 'Question: What is the Singleton Pattern?', 'Question: Why is it beneficial for the environment to save energy and processing power?']
# a_s = ['Answer: Connecting to databases can be expensive in terms of time and resources, therefore, it is efficient to connect once and perform all the necessary functions dealing with the database.', 'Answer: Because it requires spending time and company resources for each connection and disconnection.', 'Answer: The Singleton Pattern is a design pattern that restricts the instantiation of a class to one object. It is often used for database connections.', 'Answer: Because the excessive connections and disconnections to the database are avoided. This, in turn, reduces the carbon footprint.']
# counta = len(q_s)
# for i in range(counta):
#   if q_s[i] and a_s[i]:
#     print(q_s[i])
#     print(a_s[i])

import requests

def generate_text(prompt, temp=0):
  response = co.generate(
    model='command',
    prompt=prompt,
    max_tokens=200,
    temperature=temp)
  return response.generations[0].text

# Replace with your Cohere API endpoint and API key
cohere_api_endpoint = "https://api.cohere.ai/v1/embed"
api_key = "L2VMOXwleskZQjVuP5QEe2puJTKNLAzGaRhSEVTK"

# Texts to compare
text1 = "This is the first piece of text."
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
