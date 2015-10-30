(function(global) {
	var FaProblemCauseViewModel,
		app = global.app = global.app || {};


	FaProblemCauseViewModel = kendo.data.ObservableObject.extend({
		_isLoading: true,
		userId: function() {
			var cache = localStorage.getItem("profileData");
			if (cache == null || cache == undefined) {
				return null;
			} else {
				return JSON.parse(cache).userId;
			}
		},
		initFaProblemCauseMaster: function() {
			var that = this;

			$("#lvFProblemCause").kendoMobileListView({
				dataSource: {
					transport: {
						read: function(operation) {
							operation.success(JSON.parse(localStorage.getItem("favoriteProblemCausesData")));
						}
					},
					schema: {
						data: "favoriteProblemCauses"
					}
				},

				template: $("#Fproblem-cause-template").html(),
				databound: function() {
					that.hideLoading();
				},
				filterable: {
					field: "problemCauseDesc",
					ignoreCase: true
				},
				click: function(e) {
					that.selectPbC(e);
				}
				//virtualViewSize: 30,
				//endlessScroll: true,
			});
			////console.log('lv Problemcause Master Loaded');

		},
		loadFaProblemCauseMaster: function() {
			var that = this;
			var lvProblemCauseMaster = $("#lvFProblemCause").data("kendoMobileListView");
			//lvProblemCauseMaster.reset();
			app.application.view().scroller.reset();
			//$("#lvProblemCauseMaster").kendoMobileListView({
			//	dataSource: problemCauseData
			//		},
			//		schema: {
			//			data: "problemCauses"
			//		},
			//		
			//	}),
			//	template: $("#problem-cause-template").html(),
			//});
			////console.log('lv Problemcause Master Loaded');

		},
		selectPbC: function(e) {
			//console.log("###### selectPbC #########");
			var that = app.jobService.viewModel;

			var selectItem = that.get("selectItem");

			var selectProblemC = that.get("selectProblemC");

			var flag = true;

			//var pbc = [{"jobId": selectItem.jobId,
			//			"problemCauseMainId": e.problemCauseId,
			//			"problemCauseDesc": e.problemCauseDescription,
			//			"problemCauseSubId": e.subproCauseId,
			//			"problemCauseSubDesc": e.subproCauseDescription,
			//			"seqId":null,
			//			"levelCause":null,
			//			"problemCauseId":null
			//			}]





			if (selectProblemC != null && selectProblemC != undefined) {
				var data = selectProblemC.data();
				for (var i = 0; i < data.length; i++) {
					if (data[i].favProblemCauseId == e.dataItem.favProblemCauseId) {
						flag = false;
						e.preventDefault();
						navigator.notification.alert("Duplicate problem cause.",
							function() {}, "Error", 'OK');
						i = data.length;
					}
				}
			} else {
				selectProblemC = new kendo.data.DataSource();

			}

			if (flag) {

				selectItem.problemCauseMainId++;
// problemCauseDesc: "AC MAIN FAILED"
// problemCauseMainId: "08"
// problemCauseSubDesc: "Phase Error / Loss of Phase"
// problemCauseSubId: "050"

				var pbc = {
					"jobId": selectItem.jobId,
					"problemCauseMainId": e.dataItem.id,
					"problemCauseDesc": e.dataItem.problemCauseDesc,
					"problemCauseSubId": e.dataItem.problemCauseSubId,
					"problemCauseSubDesc": e.dataItem.problemCauseSubDesc,
					"seqId": null,
					"levelCause": null,
					"problemCauseId": null
				};

				selectProblemC.pushCreate(pbc);


				selectProblemC.fetch(function() {
					that.set("selectProblemC", selectProblemC);
				});

				app.faProblemCauseService.viewModel.setFaProblemSolveRadio();
				//SUBPRO_CAUSE_ID	
				//SUBPRO_CAUSE_DESCRIPTION	
				//SUBPRO_CAUSE_STATUS	
				//SUBPRO_CAUSE_PRO_CAUSE_ID	
				//PROBLEM_CAUSE_ID	
				//PROBLEM_CAUSE_DESCRIPTION

				that.set("selectItem", selectItem);
				//that.set("selectPage", 2);
				app.application.navigate(
					'#job-problem-cause'
				);
			} else {
				//				navigator.notification.alert("Problem cause duplicate",
				//					function() {}, "Error", 'OK');
			}
		},
		setFaProblemSolveRadio: function() {
			var that = app.jobService.viewModel;

			var selectItem = that.get("selectItem");

			var problemSolveRadioData = null;

			var selectProblemC = that.get("selectProblemC");
			var selectProblemS = that.get("selectProblemS");

			var problemSolveData = new kendo.data.DataSource({
				transport: {
					read: function(operation) {
						operation.success(JSON.parse(localStorage.getItem("favoriteProblemCausesData")));
					}
				},
				schema: {
					data: "favoriteProblemCauses"
				}
			});

			var filter = {
				logic: "or",
				filters: []
			}

			if (selectProblemC != undefined && selectProblemC != null) {

				var data = selectProblemC.data();
				for (var i = 0; i < data.length; i++) {
					var filters = {
						field: "subproblemCauseId",
						operator: "eq",
						value: data[i].problemCauseSubId
					};

					filter.filters.push(filters);

				}

				problemSolveData.filter(filter);

				problemSolveData.fetch(function() {
					problemSolveRadioData = new kendo.data.DataSource({
						transport: {
							read: function(operation) {
								operation.success(problemSolveData.view());
							}
						},
						filter: [{
							field: "description",
							operator: "eq",
							value: "Temporary"
						}]
					});

					////console.log(JSON.stringify(problemSolveData));

					problemSolveRadioData.fetch(function() {
						data = problemSolveRadioData.view();
						if (data.length > 0) {
							var a = data.length;
							for (var i = 0; i < a; i++) {

								if (selectProblemS != undefined && selectProblemS != null) {
									selectProblemS.fetch(function() {

										dataS = selectProblemS.data();
										if (dataS.length > 0) {

											var flagDup = false;
											var b = dataS.length;

											for (var j = 0; j < b; j++) {
												if (data[i].subproblemCauseId == dataS[j].subProblemCauseId) {
													var flagDup = true;
													//return false;
													j = dataS.length;
												}
											}

											if (!flagDup) {
												var pbs = {
													"jobId": selectItem.jobId,
													"problemSolveId": data[i].id,
													"problemSolveDesc": data[i].subProblemCauseDesc + "-" + data[i].description,
													"processDesc": "",
													"subProblemCauseId": data[i].subproblemCauseId,
													"process": "N"
												};
												selectProblemS.pushCreate(pbs);
											}
										} else {
											var pbs = [{
												"jobId": selectItem.jobId,
												"problemSolveId": data[i].id,
												"problemSolveDesc": data[i].subProblemCauseDesc + "-" + data[i].description,
												"processDesc": "",
												"subProblemCauseId": data[i].subproblemCauseId,
												"process": "N"
											}];
											selectProblemS = new kendo.data.DataSource({
												data: pbs
											});
										}
									})
								} else {
									var pbs = [{
										"jobId": selectItem.jobId,
										"problemSolveId": data[i].id,
										"problemSolveDesc": data[i].subProblemCauseDesc + "-" + data[i].description,
										"processDesc": "",
										"subProblemCauseId": data[i].subproblemCauseId,
										"process": "N"
									}];
									selectProblemS = new kendo.data.DataSource({
										data: pbs
									});

								}
							}
						}
						if (selectProblemS != null && selectProblemS != undefined) {
							selectProblemS.fetch(function() {
								that.set("selectProblemS", selectProblemS);
							});
						} else {
							that.set("selectProblemS", new kendo.data.DataSource());

						}
					});
				});
			}

			//
		},
		showLoading: function() {
			//if (this._isLoading) {
				app.application.showLoading();
				//}
		},
		hideLoading: function() {
			app.application.hideLoading();
		},

	});

	app.faProblemCauseService = {
		init: function() {
			////console.log("myteam init start");
			app.faProblemCauseService.viewModel.initFaProblemCauseMaster();
			////console.log("myteam init end");
		},
		show: function() {
			////console.log("myteam show start");
			//app.problemCauseService.viewModel.showLoading();
			//app.problemCauseService.viewModel.loadProblemCauseMaster();
			//app.myService.viewModel.hideLoading(////console.logle.debug("myteam hide hide");
		},
		hide: function() {
			////console.log("myteam hide start");
			//app.myService.viewModel.hideLoading();
			////console.log("myteam hide hide");
		},
		viewModel: new FaProblemCauseViewModel()
	}
})(window);
