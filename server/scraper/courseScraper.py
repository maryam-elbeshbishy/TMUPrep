from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import datetime;
import json

class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'
    
options = Options()
options.add_experimental_option("detach", True)
options.add_argument("--start-maximized")
options.add_argument('--headless')
options.add_argument('--disable-gpu')

courseInfoFormat = {
    "courseCode": "",
    "faculty": "",
    "subject": "",
    "title": "",
    "url": "",
    "description": "",
    "prerequisites": "",
    "corequisites": "",
    "antirequisites": "",
    "customrequisites": "",
}

driver1 = webdriver.Chrome(service=Service(
    ChromeDriverManager().install()), options=options)
driver2 = webdriver.Chrome(service=Service(
    ChromeDriverManager().install()), options=options)
driver3 = webdriver.Chrome(service=Service(
    ChromeDriverManager().install()), options=options)

f = open("data2.txt", "a")

driver1.get("https://www.torontomu.ca/calendar/2023-2024/courses/")

subjects = driver1.find_elements("xpath", "//*[@id='DataTables_Table_0']/tbody/tr")

for subject in subjects:
    try:
        subjectUrl = subject.find_element("xpath", "./td/a").get_attribute("href")
        
        faculty = subject.find_element("xpath", "./td[2]").text
        
        driver2.get(subjectUrl)
        courses = driver2.find_elements("xpath", "//*[@id='mainContent']/div[3]/div/div/div/ul/li/a")
        
        # Subject
        subjectName = driver2.find_element("xpath", "//*[@id='mainContent']/div[2]").text
        
        for course in courses:
            courseUrl = course.get_attribute("href")
            driver3.get(courseUrl)
            print(f'{bcolors.OKBLUE}[{datetime.datetime.now()}] Accessing Course: {courseUrl}{bcolors.ENDC}')
            
            courseInfo = courseInfoFormat.copy()
            courseInfo["url"] = courseUrl
            courseInfo["subject"] = subjectName
            courseInfo["faculty"] = faculty
            courseInfo["courseCode"] = driver3.find_element("xpath", '//*[@id="mainContent"]/div[2]/h1').text
            courseInfo["title"] = driver3.find_element("xpath", '//*[@id="mainContent"]/div[2]/h2').text
            courseInfo["description"] = driver3.find_element("xpath", '//*[@class="courseDescription"]').text
            print(f'{bcolors.OKBLUE}[{datetime.datetime.now()}] Scraping Course: {courseInfo["subject"]}-{courseInfo["courseCode"]}-{courseInfo["title"]}{bcolors.ENDC}')
            
            courseRequisites = driver3.find_elements("xpath", "//*[@class='requisites']/p")

            coursePrerequisites = courseRequisites[0]
            courseInfo["prerequisites"] = coursePrerequisites.text        
            courseCorequisites = courseRequisites[1]
            courseInfo["corequisites"] = courseCorequisites.text
            courseAntirequisites = courseRequisites[2]
            courseInfo["antirequisites"] = courseAntirequisites.text
            courseCustomReq = courseRequisites[3]
            courseInfo["customrequisites"] = courseCustomReq.text
            
            f.write(json.dumps(courseInfo, indent = 4) + ',\n')
            print(f'{bcolors.OKGREEN}[{datetime.datetime.now()}] Added Course: {courseInfo["subject"]}-{courseInfo["courseCode"]}-{courseInfo["title"]}{bcolors.ENDC}')
            
    except Exception as e:
        print(f'{bcolors.FAIL}[{datetime.datetime.now()}] Error for course: {courseInfo["subject"]}-{courseInfo["courseCode"]}-{courseInfo["title"]}{bcolors.ENDC}')

f.close()

    
