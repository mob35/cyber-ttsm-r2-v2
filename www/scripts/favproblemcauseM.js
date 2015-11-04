//MULTI_CAUSE_ID	
//MULTI_CAUSE_DESCRIPTION	
//MULTI_CAUSE_STATUS	
//MULTI_CAUSE_LEVEL	
//MULTI_CAUSE_GROUP	
//MULTI_CAUSE_GROUP_PARENT

(function(global) {
	var FavoriteProblemCauseMViewModel,
		app = global.app = global.app || {};


	FavoriteProblemCauseMViewModel = kendo.data.ObservableObject.extend({
		_isLoading: true,
		groupParent: 0,
		multiCauseIds: [],
		multiCauseLevels: [],
		multiCauseDescs: [],
		userId: function() {
			var cache = localStorage.getItem("profileData");
			if (cache == null || cache == undefined) {
				return null;
			} else {
				return JSON.parse(cache).userId;
			}
		},
		initProblemCauseMultiMaster: function() {
			var that = this;

			var ProblemCauseMulti = new kendo.data.DataSource({
				transport: {
					read: function(operation) {
						operation.success(JSON.parse(localStorage.getItem("favoriteProblemCausesMultiData")));
					}
				},
				schema: {
					data: "favoriteProblemCauses"
				},
				filter: {
					field: "groupParent",
					operator: "eq",
					value: that.get("groupParent")
				}
			});


			$("#lvFProblemCauseM").kendoMobileListView({
				dataSource: ProblemCauseMulti,
				click: function(e) {
					app.FavoriteproblemCauseMService.viewModel.selectPbCM(e);
				},
				template: $("#favorite-problem-cause-multi-template").html(),
				filterable: {
					field: "multiCauseDesc",
					ignoreCase: true
				}
			});

		},
         onBack: function(){
            //console.log('##### onBack #####');
            app.FavoriteproblemCauseMService.viewModel.set("multiCauseIds",[]);
            app.FavoriteproblemCauseMService.viewModel.set("multiCauseLevels",[]);
            app.FavoriteproblemCauseMService.viewModel.set("multiCauseDescs",[]);  
              
        },
		loadProblemCauseMultiMaster: function() {
			var that = this;

			var ProblemCauseMulti = new kendo.data.DataSource({
				transport: {
					read: function(operation) {
						operation.success(JSON.parse(localStorage.getItem("favoriteProblemCausesMultiData")));
					}
				},
				schema: {
					data: "favoriteProblemCauses"
				},
				filter: {
					field: "groupParent",
					operator: "eq",
					value: that.get("multiCauseDesc")
				}
			});

			var lvFProblemCauseM = $("#lvFProblemCauseM").data("kendoMobileListView");

			lvFProblemCauseM.setDataSource(ProblemCauseMulti);

            //console.log('####### load lv Problem cause multi Master Loaded #######');

		},
		selectPbCM: function(e) {
            //console.log('####### selectPbCM #######');
			var that = app.jobService.viewModel;
			var multiCauseIds = app.FavoriteproblemCauseMService.viewModel.get("multiCauseIds");
			var multiCauseLevels = app.FavoriteproblemCauseMService.viewModel.get("multiCauseLevels");
			var multiCauseDescs = app.FavoriteproblemCauseMService.viewModel.get("multiCauseDescs");
			var selectItem = that.get("selectItem");

			var checkDatasource = new kendo.data.DataSource({
				transport: {
					read: function(operation) {
						operation.success(JSON.parse(localStorage.getItem("favoriteProblemCausesMultiData")));
					}
				},
				schema: {
					data: "favoriteProblemCauses"
				},
				filter: {
					field: "groupParent",
					operator: "eq",
					value: e.dataItem.group
				}
			});

			checkDatasource.fetch(function() {

				var data = checkDatasource.view();

                                  var flagDup = false;

                favProblemCauseId.push(e.dataItem.id);
				multiCauseLevel.push(e.dataItem.level);
				multiCauseDesc.push(e.dataItem.description);

				if (data.length) {
					var lvFProblemCauseM = $("#lvFProblemCauseM").data("kendoMobileListView");
					lvFProblemCauseM.setDataSource(checkDatasource);
					lvFProblemCauseM.refresh();
				} else {
					var selectProblemCM = app.jobService.viewModel.get("selectProblemCM");

					if (selectProblemCM != undefined && selectProblemCM != null) {
						var data = selectProblemCM.data();
						for (var i = 0; i < data.length; i++) {
							if (data[i].multiCauseIds == multiCauseIds.join("|") ) {
								navigator.notification.alert("Duplicate problem cause.",
                                function() {
                                  app.FavoriteproblemCauseMService.viewModel.set("favProblemCauseId",[]);
                                  app.FavoriteproblemCauseMService.viewModel.set("multiCauseLevel",[]);
                                  app.FavoriteproblemCauseMService.viewModel.set("multiCauseDesc",[]);
                                  app.application.navigate(
                                                           '#job-problem-cause-multi'
                                                           );
                                  }, "Error", 'OK');
								flagDup = true;
                                                                    //return false;
							}
						}
					}else{
						selectProblemCM=new kendo.data.DataSource();
					}

					if (!flagDup) {
						selectItem.cntProblemCause++;
						
						var pbcm = {
							//"ids": e.dataItem.id,
							"jobId": selectItem.jobId,
							"seqId": null,
                            "multiCauseIds": favProblemCauseId.join("|"),
							"multiCauseLevels": multiCauseLevel.join("|"),
							"maxLevel": e.dataItem.maxLevel,
							"multiCauseDescs": multiCauseDesc.join(" => ")
						}
                            selectProblemCM.pushCreate(pbcm);

// favProblemCauseId: "2"
// maxLevel: "2"
// multiCauseDesc: "Fiber optic"
// multiCauseId: "45"
// multiCauseLevel: "2"
// seqId: "1"
// userId: "7478"
						that.set("selectProblemCM", selectProblemCM);
                                  
						app.application.navigate(
							'#job-problem-cause-multi'
						);
					} else {
                                  //navigator.notification.alert("Problem cause duplicate",
                                  //function() {}, "Error", 'OK');
                                  ////console.log("Problem cause duplicate");
					}
                                  app.FavoriteproblemCauseMService.viewModel.set("multiCauseIds",[]);
                                  app.FavoriteproblemCauseMService.viewModel.set("multiCauseLevels",[]);
                                  app.FavoriteproblemCauseMService.viewModel.set("multiCauseDescs",[]);
                                  
				}
				//lvFProblemCauseM
                                  
			});

			//MULTI_CAUSE_ID
			//MULTI_CAUSE_DESCRIPTION
			//MULTI_CAUSE_STATUS
			//MULTI_CAUSE_LEVEL	
			//MULTI_CAUSE_GROUP	
			//MULTI_CAUSE_GROUP_PARENT

			//that.set("selectPage", 2);
                                                                   

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

	app.FavoriteproblemCauseMService = {
		init: function() {
			////console.log("problemCauseMulti init start");
			app.FavoriteproblemCauseMService.viewModel.initProblemCauseMultiMaster();
			////console.log("problemCauseMulti init end");
		},
		show: function() {
            //console.log("##### problemCauseMulti show start #####");
			//app.FavoriteproblemCauseMService.viewModel.showLoading();
			// app.FavoriteproblemCauseMService.viewModel.loadProblemCauseMultiMaster();
			//app.myService.viewModel.hideLoading(////console.logle.debug("myteam hide hide");
        
		},
		hide: function() {
			////console.log("problemCauseMulti hide start");
			//app.myService.viewModel.hideLoading();
			////console.log("problemCauseMulti hide hide");
		},
		viewModel: new FavoriteProblemCauseMViewModel()
	}
})(window);
