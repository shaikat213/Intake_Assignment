USE [Intake]
GO
SET IDENTITY_INSERT [dbo].[Customers] ON 

INSERT [dbo].[Customers] ([Id], [CustomerName], [CustomerPhone]) VALUES (4, N'UMC Utrecht ', N'0154565656')
INSERT [dbo].[Customers] ([Id], [CustomerName], [CustomerPhone]) VALUES (5, N'shaikat', N'01747273641')
INSERT [dbo].[Customers] ([Id], [CustomerName], [CustomerPhone]) VALUES (6, N'AMC', N'0154565')
SET IDENTITY_INSERT [dbo].[Customers] OFF
GO
SET IDENTITY_INSERT [dbo].[Machines] ON 

INSERT [dbo].[Machines] ([Id], [MachineNr], [MachineTypeSerial]) VALUES (1, N'UMC-342', N'EWD222;338198304139 01')
INSERT [dbo].[Machines] ([Id], [MachineNr], [MachineTypeSerial]) VALUES (2, N'UMC-536J', N'EWD111;481385081010 1')
INSERT [dbo].[Machines] ([Id], [MachineNr], [MachineTypeSerial]) VALUES (3, N'AMC1-32 ', N'EWD1230-  PT;36849839827301')
SET IDENTITY_INSERT [dbo].[Machines] OFF
GO
SET IDENTITY_INSERT [dbo].[Sensors] ON 

INSERT [dbo].[Sensors] ([Id], [MachineSensor], [WaterTemp], [Pump10], [Pump5], [DraInSensor], [WaterLevel]) VALUES (1, N'MS1', N'23', 0, 1, 0, N'432')
INSERT [dbo].[Sensors] ([Id], [MachineSensor], [WaterTemp], [Pump10], [Pump5], [DraInSensor], [WaterLevel]) VALUES (3, N'MS2', N'25', 1, 0, 0, N'382')
INSERT [dbo].[Sensors] ([Id], [MachineSensor], [WaterTemp], [Pump10], [Pump5], [DraInSensor], [WaterLevel]) VALUES (4, N'MS3', N'22', 0, 1, 1, N'30')
SET IDENTITY_INSERT [dbo].[Sensors] OFF
GO
SET IDENTITY_INSERT [dbo].[Processes] ON 

INSERT [dbo].[Processes] ([Id], [CustomerId], [MachineId], [SensorId], [ProcessName], [StartDate], [EndDate], [OnlineFrom]) VALUES (2, 4, 1, 1, N'WashDisWash 

', CAST(N'2019-02-13T00:00:00.0000000' AS DateTime2), CAST(N'2019-02-13T00:00:00.0000000' AS DateTime2), CAST(N'2014-07-27T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[Processes] ([Id], [CustomerId], [MachineId], [SensorId], [ProcessName], [StartDate], [EndDate], [OnlineFrom]) VALUES (3, 4, 2, 1, N'WashDis ', CAST(N'2019-04-20T00:00:00.0000000' AS DateTime2), CAST(N'2019-04-20T00:00:00.0000000' AS DateTime2), CAST(N'2017-09-08T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[Processes] ([Id], [CustomerId], [MachineId], [SensorId], [ProcessName], [StartDate], [EndDate], [OnlineFrom]) VALUES (4, 6, 3, 4, N'Dis', CAST(N'2019-12-09T00:00:00.0000000' AS DateTime2), CAST(N'2019-12-09T00:00:00.0000000' AS DateTime2), CAST(N'2016-06-29T00:00:00.0000000' AS DateTime2))
SET IDENTITY_INSERT [dbo].[Processes] OFF
GO
