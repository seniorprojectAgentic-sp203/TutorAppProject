from google.adk.agents import Agent, LlmAgent, ParallelAgent
from google.adk.runners import Runner
from google.adk.tools import google_search 
from google.genai import types
from google.adk.tools.tool_context import ToolContext


async def save_doc_artifact(tool_context: ToolContext, doc_content: str, filename: str) -> dict:
    data_bytes = doc_content.encode("utf-8")

    new_artifact = types.Part(
        inline_data=types.Blob(mime_type="text/plain", data= data_bytes)
    )
    await tool_context.save_artifact(filename, new_artifact)

async def save_image_artifact(tool_context: ToolContext, image_content: str, filename: str) -> dict:
    data_bytes = image_content.encode("utf-8")

    new_artifact = types.Part(
        inline_data=types.Blob(mime_type="image/jpeg", data= data_bytes)
    )
    await tool_context.save_artifact(filename, new_artifact)


async def save_pdf_artifact(tool_context: ToolContext, pdf_content: str, filename: str) -> dict:
    data_bytes = pdf_content.encode("utf-8")

    new_artifact = types.Part(
        inline_data=types.Blob(mime_type="application/pdf", data= data_bytes)
    )
    await tool_context.save_artifact(filename, new_artifact)


async def load_doc_artifact(tool_context: ToolContext, version: int, filename: str) -> dict:
    await tool_context.load_artifact(filename, version)


code_research_agent = LlmAgent(
    model="gemini-2.5-flash",
    name="ResearchAgent",
    description="Researches and develops a solution to help tutor the user on the requested subject",
    instruction=""" 
    "You are a tutor agent. Determine the steps used to solve the user's question and 
    provide those step-by-step solutions to the user. Use the Google Search tool to develop the solution and its steps.

    1. Provide a topic overview of what the question is about. 
    2. Create a step-by-step solution to the problem for the user.
    
    """,
    
    tools=[google_search],
    output_key= "research_output",
)

code_file_agent = LlmAgent(
    model="gemini-2.5-flash",
    name="FileAgent",
    description="Responsible for saving and loading artifacts",
    instruction=""" 
    "You are an artifact agent. Determine what the user wants to do with a file or if they want a file to be created. 
    You can also help the user by creating tests or images on the subject material.

    1. If the user asks to create a quiz or test based on the topic or uploads a file, you MUST call the 'save_doc_artifact' for a docx or text file,
    the 'save_pdf_artifact' for a pdf file, or the 'save_image_artifact' for jpeg files. Save the file with all content to save it as an artifact.
    2. If asked questions about previously saved artifacts, use the 'load_doc_artifact' tool to retrieve them.
    
    """,
    
    tools=[save_doc_artifact, save_pdf_artifact, save_image_artifact, load_doc_artifact],
    output_key= "file_output",
)

code_parallel_agent = ParallelAgent(
    name="ParallelAgent",
    sub_agents=[code_research_agent, code_file_agent],
)


root_agent = code_parallel_agent

#Edit later

###inline_data=types.Blob(mime_type="application/pdf", data=content_bytes),
        ###inline_data=types.Blob(mime_type="image/png", data=content_bytes),
        ###inline_data=types.Blob(mime_type="image/jpeg", data=content_bytes)

"""
def agent_greeting(tool_context: ToolContext) -> dict:
    if not tool_context.state.get("greeted"):
        message = "Hello, I am a study assistant that gives you step-by-step instructions on solving your homework problems! Attach an image or input what you would like help with."
        tool_context.state["greeted"] = True
        return {"response": message}
    else:
        return {"response": ""}

code_greeting_agent = LlmAgent(
    name="GreetingAgent",
    description= "Greets users and tells them what it is capable of",
    instruction="You are a helpful assistant that greets the user and notifies them of what you are capable of. Use the \'agent_greeting\' tool to let the user know about your features. If the tool provides an empty response do not greet the user.",
    tools=[agent_greeting],
)

code_image_analysis_agent = LlmAgent(
    model="gemini-2.5-flash",
     name="ImageAnalysisAgent",
    description="Analyzes any image that the user inputs",
    instruction="You are an image analysis agent. You only run when the user attaches an image or document. When the user uploads an image or document use the \"save_user_artifact\" tool to save the file as an artifact with the given filename.",
    output_key= "image_analysis_output",
    tools=[save_user_artifact]
)

code_parallel_solution_agent = ParallelAgent(
    name="ParallelSolutionAgent",
    description="Runs the ResearchAgent and ImageAnalysisAgent to gather information for a solution to the user's problem",
    sub_agents=[code_research_agent,code_image_analysis_agent],
)

code_merger_agent = LlmAgent(
    name="MergerAgent",
    model="gemini-2.5-flash",
    description="Merges the information gathered from the ResearchAgent and ImageAnalysisAgent",
    instruction=You are an agent that helps combine and structure the information gathered from the research and image analysis agents into a neat format. If given a mathematical formula or expression use Markdown syntax formatting for the output.
    
    Input from other Agents:
    -Topic Research: {research_output}
    -Image Analysis: {image_analysis_output}

    Provide a topic overview of what the question is about and then create a step-by-step solution to the problem for the user.
    , 
)

code_workflow_agent = SequentialAgent(
    name='SQ_WorkflowAgent',
    description= "Executes the subagents in sequential order",
    sub_agents=[code_greeting_agent, code_parallel_solution_agent, code_merger_agent],
)


"""