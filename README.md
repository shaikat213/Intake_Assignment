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

To Run/Execute the assignment Intake Solution, please follow the instructions.
1)	Keep both folders (aspnet-core and Intake-client) into same location
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
10)	Execute the Intake_seed.sql in the Intake database from sql server.
11)	Right click to the Intake.HttpApi.Host project and select Set as StartUp Project
12)	Run/Execute the solution. You will get the following result from the web browser.

 ![image](https://user-images.githubusercontent.com/5942302/208351326-2d74a6f6-e71d-483b-bd3f-3d9a9b649cee.png)


13)	The API is running. (you can see and check the customer, machine, sensor and process apis)
14)	Open the 2nd folder (Intake-client) in the visual studio or visual studio code.
15)	open cmd from the folder enter into the src directory then run the npm install command

![image](https://user-images.githubusercontent.com/5942302/208351346-1f0988c3-56fb-445c-8b78-977c61ebfb09.png)

 
16)	If installation done, then execute the following command npm start.  Compilation will be start.
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

 


