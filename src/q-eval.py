# make sure to pip install cohere altair

import cohere
import pandas as pd
import numpy as np
import seaborn as sns
import altair as alt

api_key = 'L2VMOXwleskZQjVuP5QEe2puJTKNLAzGaRhSEVTK'
co = cohere.Client(api_key)

q_s = ['Question: What is the main idea of this lesson?', 'Question: Why is it expensive to connect and disconnect from a database multiple times?', 'Question: What is the Singleton Pattern?', 'Question: Why is it beneficial for the environment to save energy and processing power?']
a_s = ['Answer: Connecting to databases can be expensive in terms of time and resources, therefore, it is efficient to connect once and perform all the necessary functions dealing with the database.', 'Answer: Because it requires spending time and company resources for each connection and disconnection.', 'Answer: The Singleton Pattern is a design pattern that restricts the instantiation of a class to one object. It is often used for database connections.', 'Answer: Because the excessive connections and disconnections to the database are avoided. This, in turn, reduces the carbon footprint.']


sentence1 = np.array(co.embed(q_s[1]).embeddings)
sentence1 = np.array(co.embed(_s[1]).embeddings)
