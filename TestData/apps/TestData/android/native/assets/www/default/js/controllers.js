
/* JavaScript content from js/controllers.js in folder common */
angular
		.module('starter.controllers', [])
		.controller(
				'SUP',
				function($rootScope, $scope, $ionicModal, $timeout,
						$cordovaToast) {
					navigator.notification.vibrate(500);
					$scope.signupdata = {};

					$scope.signup = function() {
						navigator.notification.vibrate(500);
						pushsec($scope.signupdata.username,
								$scope.signupdata.password);
						$scope.signupdata.username
						$scope.signupdata.password
						var invocationData = {
							adapter : 'TestDatabase',
							procedure : 'Insert_Member',
							parameters : [ $scope.signupdata.username,
									$scope.signupdata.password,
									'test@test.test' ]
						};

						WL.Client.invokeProcedure(invocationData, {
							onSuccess : SignUpSuccess,
							onFailure : SignupFail
						});
					};
					
					function SignUpSuccess() {
						window.plugins.toast.showLongBottom('Signup success!',
								function(a) {
									console.log('toast success: ' + a)
								}, function(b) {
									// alert('toast error: ' + b)
								})
					};

					function SignupFail() {
						window.plugins.toast.showLongBottom(
								'Username is already in use!', function(a) {
									console.log('toast success: ' + a)
								}, function(b) {
									alert('toast error: ' + b)
								})
					};
				})

		.controller(
				'AppCtrl',
				function($rootScope, $scope, $ionicModal, $timeout,
						$cordovaToast) {
					navigator.notification.vibrate(500);
					$scope.hidden=true;
					// Form data for the login modal
					$scope.Enabled = false;
					$scope.loginData = {};

					// Create the login modal that we will use later
					$ionicModal.fromTemplateUrl('templates/login.html', {
						scope : $scope
					}).then(function(modal) {
						$scope.modal = modal;
					});

					// Triggered in the login modal to close it
					$scope.closeLogin = function() {
						$scope.modal.hide();
					};

					// Open the login modal
					$scope.login = function() {
						$scope.modal.show();
						navigator.notification.vibrate(500);
					};

					$scope.doLogin = function() {
						pushsec($scope.loginData.username,
								$scope.loginData.password);
						console.log('Doing login', $scope.loginData);
						console.log($scope.loginData.username);
						console.log($scope.loginData.password);

						var invocationData = {
							adapter : 'TestDatabase',
							procedure : 'Login',
							parameters : [ $scope.loginData.username, $scope.loginData.password ]
						};

						WL.Client.invokeProcedure(invocationData, {
							onSuccess : loadsFeedsSuccess,
							onFailure : loadFeedsFailure
						});
					};

					// Perform the login action when the user submits the login
					function loadsFeedsSuccess(result) {
						$scope.hidden = false;
						if (result.invocationResult.resultSet[0].isTrue == '1') {
							if (WL.Client.Push) {
								// alert("Setting push noti");
								WL.Client.Push.onReadyToSubscribe = function() {
									// alert("onReadyToSubscribe");
									 alert("Subscribe buttons");
									WL.Client.Push.registerEventSourceCallback(
											"myPush", "PushAdapter",
											"PushEventSource",
											pushNotificationReceived);
								};
							}
							$scope.closeLogin();
							window.plugins.toast.showLongBottom(
									'Login Success!', function(a) {
										console.log('toast success: ' + a)
									}, function(b) {
										// alert('toast error: ' + b)
									})
							$rootScope.ID = result.invocationResult.resultSet[0].ID;
						}
						$scope.loginData.username = "loggedin";
						console
								.log(result.invocationResult.resultSet[0].isTrue);
					}
				})

		.controller(
				'PlaylistsCtrl',
				function($rootScope, $scope, $ionicModal, $timeout) {
					navigator.notification.vibrate(500);
					doSubscribe();
					$scope.ProjectData = {};
					$scope.Projects = [];

					function pushProjects() {
						$scope.Projects = [];

						var invocationData = {
							adapter : 'TestDatabase',
							procedure : 'GetProjects',
							parameters : [ $rootScope.ID ]
						};
						
						WL.Client.invokeProcedure(invocationData, {
							onSuccess : GetProjectsSuccess,
							onFailure : loadFeedsFailure
						});
						
						function GetProjectsSuccess(result) {
							// $scope.Projects=[];
							for (var i = 0; i < result.invocationResult.resultSet.length; i++) {
								$scope.Projects
										.push({
											title : result.invocationResult.resultSet[i].ProjectName,
											id : result.invocationResult.resultSet[i].ID
										});
								console
										.log(result.invocationResult.resultSet.ID);
							}
						}
					}
					;

					pushProjects();

					// $scope.Projects.push({title: $,id:$})
					$ionicModal.fromTemplateUrl('templates/addproject.html', {
						scope : $scope
					}).then(function(modal) {
						$scope.modal = modal;
					});

					// Open the newproject modal
					$scope.newproject = function() {
						$scope.modal.show();
						navigator.notification.vibrate(500);
					};

					$scope.doClose = function() {
						$scope.modal.hide();
					};

					$scope.doAddProject = function() {
						var invocationData = {
							adapter : 'TestDatabase',
							procedure : 'Insert_Project',
							parameters : [ $rootScope.ID,
									$scope.ProjectData.Name,
									$scope.ProjectData.Description ]
						};
						WL.Client.invokeProcedure(invocationData, {
							onSuccess : AddProjectSuccess,
							onFailure : loadFeedsFailure
						});

						function AddProjectSuccess(result) {
							// $scope.Projects=[];
							// alert("ProjectAdded");
							window.plugins.toast.showLongBottom(
									'Project Added Successfuly', function(a) {
										console.log('toast success: ' + a)
									}, function(b) {
										// alert('toast error: ' + b)
									})
							pushProjects();
							$scope.doClose();
						}

						function loadFeedsFailure(result) {
							window.plugins.toast.showLongBottom(
									'Failed to connect to server , Please check your internet connection',
									function(a) {
										console.log('toast success: '+ a)
									}, function(b) {
										// alert('toast error: ' + b)
									})
						}
					};
				})

		.controller(
				'PlaylistCtrl',
				function($scope, $stateParams, $ionicActionSheet, $ionicModal) {
					navigator.notification.vibrate(500);

					$scope.ProjectId = $stateParams.ProjectId;
					$scope.ProjectTitle = $stateParams.ProjectTitle;
					console.log("Project Name is ");
					$scope.TaskData = {};
					$scope.MemberData = {};
					$scope.MemberDeleteData = {};
					console.log($scope.ProjectTitle);
					$scope.Tasks = [];
					$scope.Members = [];

					function pushTasks() {
						$scope.Tasks = [];
						var invocationData = {
							adapter : 'TestDatabase',
							procedure : 'GetTasks',
							parameters : [ $scope.ProjectId ]
						};

						console.log("Invoking get tasks with pid");
						console.log($scope.ProjectId);
						console.log($stateParams.ProjectId);
						WL.Client.invokeProcedure(invocationData, {
							onSuccess : GetTasksSuccess,
							onFailure : loadFeedsFailure
						});

						function GetTasksSuccess(result) {
							// $scope.Projects=[];
							for (var i = 0; i < result.invocationResult.resultSet.length; i++) {
								$scope.Tasks
										.push({
											Name : result.invocationResult.resultSet[i].TaskName,
											id : result.invocationResult.resultSet[i].TaskID,
											Deadline : result.invocationResult.resultSet[i].DeadLine,
											isFinished : result.invocationResult.resultSet[i].IsFinished
										});
							}
						}
					}
					;

					pushTasks();

					function pushMembers() {
						navigator.notification.vibrate(500);
						$scope.Members = [];
						var invocationData = {
							adapter : 'TestDatabase',
							procedure : 'GetMembers',
							parameters : [ $scope.ProjectId ]
						};

						console.log("Invoking get tasks with pid");
						console.log($scope.ProjectId);
						console.log($stateParams.ProjectId);
						WL.Client.invokeProcedure(invocationData, {
							onSuccess : GetMembersSuccess,
							onFailure : loadFeedsFailure
						});

						function GetMembersSuccess(result) {
							// $scope.Projects=[];
							for (var i = 0; i < result.invocationResult.resultSet.length; i++) {
								$scope.Members
										.push({
											Name : result.invocationResult.resultSet[i].UserName
										});
							}
						}
					}
					;

					pushMembers();
					// $route.reload();

					$ionicModal.fromTemplateUrl('templates/addtask.html', {
						id : '1',
						scope : $scope
					}).then(function(modal) {
						$scope.modal1 = modal;
					});

					$scope.newtask = function() {
						$scope.modal1.show();
						navigator.notification.vibrate(500);
					};
					$scope.doClose = function() {
						$scope.modal1.hide();
					};
					$scope.AddTask = function() {
						// TaskData.TaskDeadline
						

						var Date = $scope.TaskData.TaskDeadline.getFullYear()
								+ '-'
								+ ($scope.TaskData.TaskDeadline.getMonth() + 1)
								+ '-' + $scope.TaskData.TaskDeadline.getDate();
						var invocationData = {
							adapter : 'TestDatabase',
							procedure : 'Insert_Task',
							parameters : [ $scope.ProjectId,
									$scope.TaskData.TaskName, Date ]
						};

						console.log('Adding Task');
						console.log(Date);
						console.log($scope.ProjectId);
						console.log($scope.TaskData.TaskName);
						console.log($scope.TaskData.TaskDescription);
						WL.Client.invokeProcedure(invocationData, {
							onSuccess : AddTaskSuccess,
							onFailure : loadFeedsFailure
						});

						function AddTaskSuccess(result) {
							// $scope.Projects=[];
							// alert("TaskAdded");
							window.plugins.toast.showLongBottom(
									'Task Added Successfuly', function(a) {
										console.log('toast success: ' + a)
									}, function(b) {
										alert('toast error: ' + b)
									})
							pushTasks();
							$scope.doClose();
						}
					};

					$scope.Options = function() {

						// Show the action sheet
						var hideSheet = $ionicActionSheet.show({
							buttons : [ {
								text : '<center><b>Add Task</b></center>'
							}, {
								text : '<center><b>Delete Project</b></center>'
							}, {
								text : '<center><b>Add Member</b></center>'
							}, {
								text : '<center><b>Remove Member</b></center>'
							} ],

							titleText : '<center><b>Options</center></b>',
							cancel : function() {
								// add cancel code..
							},
							buttonClicked : function(index) {
								if (index == 0)
									$scope.newtask();
								else if (index == 2)
									$scope.newMember();
								else if (index == 3)
									$scope.deleteMember();
								return true;
							}
						});

						// For example's sake, hide the sheet after two seconds
						$ionicModal.fromTemplateUrl(
								'templates/AddMember_Project.html', {
									id : '2',
									scope : $scope
								}).then(function(modal) {
							$scope.modal2 = modal;
						});

						// Open the newproject modal
						$scope.newMember = function() {
							$scope.modal2.show();
							navigator.notification.vibrate(500);
						};

						$scope.doClose = function() {
							$scope.modal1.hide();
							$scope.modal2.hide();
						};

						$scope.AddMemberProject = function() {
							var invocationData = {
								adapter : 'TestDatabase',
								procedure : 'Insert_Member_Project',
								parameters : [ $scope.MemberData.Name,
										$scope.ProjectId ]
							};
							WL.Client.invokeProcedure(invocationData, {
								onSuccess : Insert_Member_Project_Success,
								onFailure : loadFeedsFailure
							});

							function Insert_Member_Project_Success(result) {
								// $scope.Projects=[];
								// alert("MemberAdded");
								window.plugins.toast.showLongBottom(
										'Member Added Successfuly',
										function(a) {
											console.log('toast success: ' + a)
										}, function(b) {
											alert('toast error: ' + b)
										})
								pushMembers();
								$scope.doClose();
							}
						};

						// For example's sake, hide the sheet after two seconds
						$ionicModal.fromTemplateUrl(
								'templates/DeleteMember.html', {
									id : '3',
									scope : $scope
								}).then(function(modal) {
							$scope.modal3 = modal;
						});

						// Open the new project modal
						$scope.deleteMember = function() {
							$scope.modal3.show();
							navigator.notification.vibrate(500);
						};

						$scope.doClose = function() {
							$scope.modal1.hide();
							$scope.modal3.hide();
							$scope.modal2.hide();
						};

						$scope.deleteMember_Project = function() {
							var invocationData = {
								adapter : 'TestDatabase',
								procedure : 'Remove_Member_Project',
								parameters : [ $scope.MemberDeleteData.Name,
										$scope.ProjectId ]
							};
							WL.Client.invokeProcedure(invocationData, {
								onSuccess : Insert_Member_Project_Success,
								onFailure : loadFeedsFailure
							});

							console.log('Delete Member Name');
							console.log($scope.MemberDeleteData.Name);

							function Insert_Member_Project_Success(result) {
								// $scope.Projects=[];
								// alert("Deleted");
								window.plugins.toast.showLongBottom(
										'Member Deleted Successfuly', function(
												a) {
											console.log('toast success: ' + a)
										}, function(b) {
											// alert('toast error: ' + b)
										})
								pushMembers();
								$scope.doClose();
							}
						};

					};

				})

		.controller(
				'TaskCtrl',
				function($scope, $stateParams, $ionicActionSheet, $ionicModal,
						$ionicHistory) {
					navigator.notification.vibrate(500);
					$scope.TaskID = $stateParams.TaskID;
					//$scope.TaskName;
					//$scope.Deadline = "20/10/2015";
					$scope.Members = [];
					$scope.MemberData = {};
					
					function gettaskinfo()
					{
						var invocationData = {
								adapter : 'TestDatabase',
								procedure : 'GetTaskINFO',
								parameters : [ $scope.TaskID ]
							};

							WL.Client.invokeProcedure(invocationData, {
								onSuccess : GETTASKINFOSUCCESS,
								onFailure : loadFeedsFailure
							});

							function GETTASKINFOSUCCESS(result) {
								
//								var Date=(result.invocationResult.resultSet[0].DeadLine).getFullYear()
//								+ '-'
//								+ ((result.invocationResult.resultSet[0].DeadLine).getMonth() + 1)
//								+ '-' +(result.invocationResult.resultSet[0].DeadLine).getDate();
								$scope.TaskName =  result.invocationResult.resultSet[0].TaskName;
								$scope.Deadline=	result.invocationResult.resultSet[0].DeadLine;
							}
							;
					}
					gettaskinfo();
					function finishTask(){
						var invocationData = {
								adapter : 'TestDatabase',
								procedure : 'FinishTask',
								parameters : [ $scope.TaskID ]
							};

							WL.Client.invokeProcedure(invocationData, {
								onSuccess : finishTaskSuccess,
								onFailure : loadFeedsFailure
							});

							function finishTaskSuccess() {
								// alert("TaskDeleted");
								window.plugins.toast.showLongBottom(
										'Task Finished Successfully', function(a) {
											console.log('toast success: ' + a)
										}, function(b) {
											alert('toast error: ' + b)
										})
							}
							;
					}
					function deleteTask() {
						var invocationData = {
							adapter : 'TestDatabase',
							procedure : 'Remove_Task',
							parameters : [ $scope.TaskID ]
						};

						WL.Client.invokeProcedure(invocationData, {
							onSuccess : DeleteTask_Success,
							onFailure : loadFeedsFailure
						});

						function DeleteTask_Success() {
							// alert("TaskDeleted");
							window.plugins.toast.showLongBottom(
									'Task Deleted Successfuly', function(a) {
										console.log('toast success: ' + a)
									}, function(b) {
										alert('toast error: ' + b)
									})
							$ionicHistory.goBack();
						}
						;
					}

					function pushMembers() {
						$scope.Members = [];
						var invocationData = {
							adapter : 'TestDatabase',
							procedure : 'GetTaskMembers',
							parameters : [ $scope.TaskID ]
						};

						WL.Client.invokeProcedure(invocationData, {
							onSuccess : GetTaskMembersSuccess,
							onFailure : loadFeedsFailure
						});

						function GetTaskMembersSuccess(result) {
							// $scope.Projects=[];
							for (var i = 0; i < result.invocationResult.resultSet.length; i++) {
								$scope.Members
										.push({
											Name : result.invocationResult.resultSet[i].UserName
										});
							}
						}
					}
					;
					pushMembers();
					// $scope.Members.push({Name: $,id:$})

					$scope.Options = function() {
						// Show the action sheet
						var hideSheet = $ionicActionSheet.show({
							buttons : [ {
								text : '<center><b>Finish Task</b></center>'
							}, {
								text : '<center><b>Delete Task</b></center>'
							}, {
								text : '<center><b>Assign Member</b></center>'
							}, {
								text : '<center><b>Remove Member</b></center>'
							} ],

							titleText : '<center><b>Options</center></b>',
							cancel : function() {
								// add cancel code..
							},
							buttonClicked : function(index) {
								if (index == 2)
									$scope.newMember();
								else if (index == 1)
									deleteTask();
								else if (index ==0)
									finishTask();
								return true;
							}
						});

						$ionicModal.fromTemplateUrl(
								'templates/AddMember_Task.html', {
									scope : $scope
								}).then(function(modal) {
							$scope.modal = modal;
						});

						// Open the new project modal
						$scope.newMember = function() {
							$scope.modal.show();
							navigator.notification.vibrate(500);
						};

						$scope.doClose = function() {
							$scope.modal.hide();
						};

						$scope.AddMemberTask = function() {
							var invocationData = {
								adapter : 'TestDatabase',
								procedure : 'Insert_Member_Task',
								parameters : [ $scope.MemberData.Name,
										$scope.TaskID ]
							};

							WL.Client.invokeProcedure(invocationData, {
								onSuccess : Insert_Member_Task_Success,
								onFailure : loadFeedsFailure
							});

							function Insert_Member_Task_Success(result) {
								// $scope.Projects=[];
								// alert("MemberAdded");
								window.plugins.toast.showLongBottom(
										'Member Added Successfuly',
										function(a) {
											console.log('toast success: ' + a)
										}, function(b) {
											alert('toast error: ' + b)
										})
								pushMembers();
								$scope.doClose();
							}
						};
					};
				});