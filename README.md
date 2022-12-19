# Intake_Assignment
Assignment for CIM Solution

Intake Assignment:

1)	Used library or framework: abp.io from volosoft (https://abp.io/)
2)	Development Platform: .Net Core
3)	Development Architecture: Microservice
4)	Client UI Theme: Metronic Theme from KeenTheme.com
5)	Client Web UI framework/platform: Angular 23 framework
6)	Database connectivity: Entity framework Core (Code First)
7)	Database: SQL Server

*** Find the folders after download
     i) 01.asp-net.core
    ii) 02.Intake-client
   iii) 03.Database

*** Api Link from asp-net.core :- https://localhost:44330/swagger/index.html
*** CLient UI Link :- http://localhost:4200

### The solution architecture description.

1) The solution structure as following.

![image](https://user-images.githubusercontent.com/5942302/208354962-7470c696-2160-48e0-9d5f-5832df894c65.png)

2) The database connectivity int to the folloing two files.

![image](https://user-images.githubusercontent.com/5942302/208355294-3b3eaca0-8150-4dda-8338-1f26441ac985.png)

![image](https://user-images.githubusercontent.com/5942302/208355390-e3d834d3-1a65-454b-a203-e616f485737c.png)

3) The database model designed at the following folder

![image](https://user-images.githubusercontent.com/5942302/208355599-e680a4b3-effe-4372-a417-9b9d598ef9b6.png)

4) DTO and Interfaces are designed as following

![image](https://user-images.githubusercontent.com/5942302/208356113-5d5f5e8f-9851-43eb-8740-713196de3dec.png)

5) The all the Service are designed as following

![image](https://user-images.githubusercontent.com/5942302/208356315-6c7698eb-33df-41f5-aeba-f6c5bad1f844.png)

### The client UI structure description

1) The client UI Solution stucture as bellow

![image](https://user-images.githubusercontent.com/5942302/208356710-79449b02-154b-4470-b6f1-5cd99159ee43.png)

2) The environment setup designed at the following files for the client to api connectivity.

![image](https://user-images.githubusercontent.com/5942302/208357099-51322377-dbb9-4f68-8423-3d20e450e262.png)

3) The UI Modules and componets

![image](https://user-images.githubusercontent.com/5942302/208357477-ec01b441-166d-44fb-b7bf-32a9e55d2340.png)

4) The api proxys are designed at following files from the api

![image](https://user-images.githubusercontent.com/5942302/208357878-7aa0b0b6-39fe-46df-bdf6-914fc4877e7e.png)


To Run/Execute the assignment Intake Solution, please follow the instructions.


1)	Keep both folders (01.asp-net.core and 02.Intake-client) into same location
2)	Run the command prompt from the aspnet-core folder and execute the following command
a.	dotnet tool install -g Volo.Abp.Cli
3)	Open the solution Intake.Sln from aspnet-core folder using Visual Studio 2022
4)	Find and Open appsettings.json from projects Intake.DbMigrator and Intake.HttpApi.Host
5)	Set the default database server (sql server) from the both appsettings.json files
6)	Right click to the Intake.DbMigrator project and select Set as StartUp Project
7)	Build the solution to ensure the solution is error free.
8)	Run/Execute the solution. You will get the following result 

 ![image](https://user-images.githubusercontent.com/5942302/208351257-5495980c-2c4d-4b06-aaae-163c3daf03a5.png)


9)	Check the into SQL Server, the database Intake is created.
10)	Execute the Intake_seed.sql in the 03.Database from sql server.
11)	Right click to the Intake.HttpApi.Host project and select Set as StartUp Project
12)	Run/Execute the solution. You will get the following result from the web browser.

 ![image](https://user-images.githubusercontent.com/5942302/208351326-2d74a6f6-e71d-483b-bd3f-3d9a9b649cee.png)


13)	The API is running. (you can see and check the customer, machine, sensor and process apis)
14)	Open the 2nd folder (02.Intake-client) in the visual studio or visual studio code.
15)	open cmd from the folder enter into the src directory then run the npm install command. The angular packages will be installed.

![image](https://user-images.githubusercontent.com/5942302/208351346-1f0988c3-56fb-445c-8b78-977c61ebfb09.png)

 
16)	If installation done, then execute the following command npm start.  Compilation will be started.
17)	After successful compile the login page will be appeared.
 
 ![image](https://user-images.githubusercontent.com/5942302/208351377-d99c7790-aae5-4121-8910-2f233f700d84.png)

 
Login Credentials:
User email: admin@abp.io
Password: 1q2w3E*

The question answers for the assignment

1)	The process overview page:

 ![image](https://user-images.githubusercontent.com/5942302/208351402-c28ecebb-ba8a-4256-9168-13b30cdc8113.png)


2)	To See details for a single process, click to the view button from action column on process overview list.
3)	Search a process by the customer name from process overvie page.
4)	Search a process by the Sensor data from process overvie page.

The additional pages from setup menu

5)	Customer list and Entry page

 
![image](https://user-images.githubusercontent.com/5942302/208351433-cffb3acd-90ff-4311-bb55-ca3256e4b7a6.png)

![image](https://user-images.githubusercontent.com/5942302/208351461-f7736916-4bd2-4a4a-bfb0-f3c383f0632e.png)


6)	Machine list and Entry page

![image](https://user-images.githubusercontent.com/5942302/208351494-db5df679-a8bc-4dbd-8ec2-d611d04f7c0f.png)

![image](https://user-images.githubusercontent.com/5942302/208351525-94a4d9b2-9cc8-4187-9bee-557101a5d469.png)

7)	Sensor list and entry page

![image](https://user-images.githubusercontent.com/5942302/208351570-f004cecf-f461-42f9-8a23-d2b229a9470b.png)

![image](https://user-images.githubusercontent.com/5942302/208351604-a16eb5b2-8684-48fc-bbf7-ade21f2e00f1.png)

8)	Process entry page.

![image](https://user-images.githubusercontent.com/5942302/208351630-25fc794f-de12-402c-b670-0206fbf09093.png)

 


