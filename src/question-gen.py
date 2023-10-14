# must install cohere in terminal to use:
# python -m pip install cohere 

import cohere
co = cohere.Client('L2VMOXwleskZQjVuP5QEe2puJTKNLAzGaRhSEVTK')

def generate_text(prompt, temp=0):
  response = co.generate(
    model='command',
    prompt=prompt,
    max_tokens=200,
    temperature=temp)
  return response.generations[0].text

context = "When it comes to designing software, effective design is very important. Connecting to databases can be an extremely expensive task, particularly because of how much time it typically takes. The inefficient way to use a database connection would be connecting and disconnecting multiple times every time the database is required. Because of this, the best practice is to connect to it once, perform all the necessary functions dealing with the database, and then disconnect [x]. Such a practice can be followed by using the singleton pattern in database connections. This involves setting up the database only once. Then, whichever methods require calling the database will leverage this connection [x]. This type of design is efficient in multiple ways. The primary business concern would be that it is fast, meaning that it spends less company time and is therefore less expensive. It is also beneficial for the environment, as it saves energy and processing power [x+1]. The reason for this is that excessive connections and disconnections to the database are avoided."
prompt = f"""Write questions based on this lesson: {context}, giving one question for every main topic. Write an answer on the following line.:

"""

# Example format:
# Input Lesson: Engineers, as practitioners of engineering, are professionals who invent, design, analyze, build and test machines, complex systems, structures, gadgets and materials to fulfill functional objectives and requirements while considering the limitations imposed by practicality, regulation, safety and cost.[1][2] The word engineer (Latin ingeniator[3]) is derived from the Latin words ingeniare ("to contrive, devise") and ingenium ("cleverness").[4][5] The foundational qualifications of a licensed professional engineer typically include a four-year bachelor's degree in an engineering discipline, or in some jurisdictions, a master's degree in an engineering discipline plus four to six years of peer-reviewed professional practice (culminating in a project report or thesis) and passage of engineering board examinations.
# The work of engineers forms the link between scientific discoveries and their subsequent applications to human and business needs and quality of life.Engineers develop new technological solutions. During the engineering design process, the responsibilities of the engineer may include defining problems, conducting and narrowing research, analyzing criteria, finding and analyzing solutions, and making decisions. Much of an engineer's time is spent on researching, locating, applying, and transferring information.[7] Indeed, research suggests engineers spend 56% of their time engaged in various information behaviours, including 14% actively searching for information.
# Engineers must weigh different design choices on their merits and choose the solution that best matches the requirements and needs. Their crucial and unique task is to identify, understand, and interpret the constraints on a design in order to produce a successful result. 
# Questions:
# Question 1: What are three things that engineers do?
# Answer 1: Invent, design, build.
# Question 2: What Latin words did the word "engineer" originate from?
# Answer 2: The word engineer originated from the Latin words ingeniare ("to contrive, devise") and ingenium ("cleverness").
# Question 3: What level of education are engineers expected to have?
# Answer 3: The foundational qualifications of a licensed professional engineer typically include a four-year bachelor's degree in an engineering discipline, or in some jurisdictions, a master's degree in an engineering discipline plus four to six years of peer-reviewed professional practice (culminating in a project report or thesis) and passage of engineering board examinations.
# Question 4: Why do engineers need to identify constraints?
# Answer 4: Engineers need to identify constraints in order to produce a successful result for their design.
# Question 5: How do engineers spend most of their design time?
# Answer 5: Engineers spend most of their time researching, locating, applying, and transferring information.
# Question 6: List three responsibilities of an engineer during the engineering design process.
# Answer 6: Defining problems, conducting and narrowing research, analyzing criteria, finding and analyzing solutions, making decisions.

question_response = generate_text (prompt, temp=0.5)
with open("question.txt", "r+") as q_text_file: 
  # save response as text file
  q_text_file.write(question_response)
  
  file_contents = q_text_file.read()
  print(file_contents)
  # first_line=q_text_file.readline().strip()
# print(question_response)

# take this response and instead of printing it
# first line (question) becomes output for viewer to see
# second line is answer that user's input is compared against
# loop continue calling the question-making function. end when 