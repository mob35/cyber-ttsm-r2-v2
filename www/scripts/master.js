 (function(global) {
     var MasterViewModel,
         app = global.app = global.app || {};

     MasterViewModel = kendo.data.ObservableObject.extend({
         userId: null,
         relocateFlag: null,
         userRole: null, // 02,03 = workforce, 01 = MC
         loadProfile: function() {
             var that = this;
             var Profiles = null;

             var profileData = localStorage.getItem("profileData");
             if (profileData != null && profileData != undefined && profileData != "") {
                 var relocateFlag = JSON.parse(localStorage.getItem("profileData")).profiles[0].relocateFlag;

                 if (relocateFlag == "Y") {
                     that.set("relocateFlag", true);
                 } else {
                     that.set("relocateFlag", false);
                 }

                 var userRole = JSON.parse(localStorage.getItem("profileData")).profiles[0].userRole;

                 if (userRole == "01") {
                     that.set("userRole", userRole);
                     $(".tMy").show();
                     $(".tTeam").hide();
                 } else {

                     that.set("userRole", userRole);
                     $(".tTeam").show();
                     $(".tMy").hide();
                 }


             } else {

                 $.ajax({ //using jsfiddle's echo service to simulate remote data loading
                     type: "POST",
                     timeout: 180000,
                     url: app.configService.serviceUrl + 'post-json.service?s=master-service&o=getProfileTTSME.json',
                     data: JSON.stringify({
                         "token": localStorage.getItem("token"),
                         "userId": app.loginService.viewModel.get("userId"),
                         "version": "2"
                     }),
                     async: false,
                     dataType: "json",
                     contentType: 'application/json',
                     success: function(response) {
                         //store response
                         //console.log(JSON.stringify(response));
                         localStorage.setItem("profileData", JSON.stringify(response));
                         var relocateFlag = JSON.parse(localStorage.getItem("profileData")).profiles[0].relocateFlag;

                         if (relocateFlag == "Y") {
                             that.set("relocateFlag", true);
                         } else {
                             that.set("relocateFlag", false);
                         }

                         var userRole = JSON.parse(localStorage.getItem("profileData")).profiles[0].userRole;

                         console.debug(userRole);
                         if (userRole == "01") {
                             console.debug("show my");
                             that.set("userRole", userRole);
                             $(".tMy").show();
                             $(".tTeam").hide();
                         } else {
                             that.set("userRole", userRole);
                             console.debug("show team");
                             $(".tTeam").show();
                             $(".tMy").hide();
                         }

                         ////console.log(JSON.stringify(response));
                         ////console.log("fetch Profile : Complete");
                     },
                     error: function(xhr, error) {

                         if (!app.ajaxHandlerService.error(xhr, error)) {
                             var cache = localStorage.getItem("profileData");

                             if (cache == null || cache == undefined) {
                                 ////console.log("Get Master Profile failed");
                                 ////console.log(xhr);
                                 ////console.log(error);

                                 navigator.notification.alert(xhr.status + error,
                                     function() {}, "Get Master Profile failed", 'OK');
                             }
                         }
                         return;
                     },
                     complete: function() {
                         var cache = localStorage.getItem("profileData");

                         if (cache != null || cache != undefined) {
                             cache.profiles
                         }
                     }
                 });
             }
             if (!app.configService.isMorkupData) {
              setTimeout(function() {
                 app.dashboardFilterService.viewModel.initFilter();
                 app.mapService.initLocation();
                 app.mapFilterService.viewModel.initFilter();

             }, 5000);
             }
             
         },

         loadPriority: function() {
             var that = this;
             if (app.configService.isMorkupData) {
                 var response = {
                     "priorityList": [{
                         "id": "1",
                         "name": "None"
                     }, {
                         "id": "2",
                         "name": "Minor"
                     }, {
                         "id": "3",
                         "name": "Major"
                     }, {
                         "id": "4",
                         "name": "Critical"
                     }],
                     "version": "1"
                 };
                 localStorage.setItem("priorityData", JSON.stringify(response));
             } else {
                 $.ajax({ //using jsfiddle's echo service to simulate remote data loading
                     type: "POST",
                     timeout: 180000,
                     url: app.configService.serviceUrl + 'post-json.service?s=master-service&o=getPriority.json',
                     data: JSON.stringify({
                         "token": localStorage.getItem("token"),
                         "version": "2"
                     }),
                     async: true,
                     dataType: "json",
                     contentType: 'application/json',
                     success: function(response) {
                         //store response
                         localStorage.setItem("priorityData", JSON.stringify(response));

                         ////console.log("fetch Priority : Complete");
                     },
                     error: function(xhr, error) {
                         if (!app.ajaxHandlerService.error(xhr, error)) {
                             var cache = localStorage.getItem("priorityData");

                             if (cache == null || cache == undefined) {
                                 ////console.log("Get Master Priority failed");
                                 ////console.log(xhr);
                                 ////console.log(error);
                                 navigator.notification.alert(xhr.status + error,
                                     function() {}, "Get Master Priority failed", 'OK');
                             }
                         }
                         return;
                     }
                 });
             }

         },
         loadStatus: function() {
             var that = this;
             var Statuses = null;
             if (app.configService.isMorkupData) {
                 var response = {
                     "jobStatus": [{
                         "jbStatusId": "01",
                         "status": "Assign"
                     }, {
                         "jbStatusId": "02",
                         "status": "Accept"
                     }, {
                         "jbStatusId": "03",
                         "status": "Initiate"
                     }, {
                         "jbStatusId": "04",
                         "status": "On-Site"
                     }, {
                         "jbStatusId": "05",
                         "status": "Report"
                     }, {
                         "jbStatusId": "06",
                         "status": "Config Update"
                     }, {
                         "jbStatusId": "07",
                         "status": "Reject"
                     }, {
                         "jbStatusId": "08",
                         "status": "Close"
                     }, {
                         "jbStatusId": "09",
                         "status": "Transfer"
                     }, {
                         "jbStatusId": "10",
                         "status": "Report(Request more detail)"
                     }],
                     "version": "1"
                 };
                 localStorage.setItem("statusData", JSON.stringify(response));
             } else {
                 $.ajax({ //using jsfiddle's echo service to simulate remote data loading
                     type: "POST",
                     timeout: 180000,
                     url: app.configService.serviceUrl + 'post-json.service?s=master-service&o=getJobStatus.json',
                     data: JSON.stringify({
                         "token": localStorage.getItem("token"),
                         "version": "2"
                     }),
                     async: true,
                     dataType: "json",
                     contentType: 'application/json',
                     success: function(response) {
                         //store response
                         localStorage.setItem("statusData", JSON.stringify(response));
                         ////console.log("fetch Status : Complete");
                     },
                     error: function(xhr, error) {
                         if (!app.ajaxHandlerService.error(xhr, error)) {
                             var cache = localStorage.getItem("statusData");

                             if (cache == null || cache == undefined) {
                                 ////console.log("Get Master Status failed");
                                 ////console.log(xhr);
                                 ////console.log(error);
                                 navigator.notification.alert(xhr.status + error,
                                     function() {}, "Get Master Status failed", 'OK');
                             }
                         }
                         return;
                     }
                 });
             }

         },
         loadReportType: function() {
             var that = this;
             var ReportTypes = null;
             if (app.configService.isMorkupData) {
                 var response = {
                     "jobReportTypes": [{
                         "typeId": "01",
                         "reportType": "Solution Complete"
                     }, {
                         "typeId": "02",
                         "reportType": "Solution Not Complete"
                     }, {
                         "typeId": "03",
                         "reportType": "Solution will be Followed-up"
                     }, {
                         "typeId": "04",
                         "reportType": "Visit Site and Solution Complete"
                     }, {
                         "typeId": "05",
                         "reportType": "Visit Site but Solution Not Complete"
                     }, {
                         "typeId": "06",
                         "reportType": "Visit Site and Solution will be Followed-up"
                     }],
                     "version": "1"
                 };
                 localStorage.setItem("reportTypeData", JSON.stringify(response));
             } else {
                 $.ajax({ //using jsfiddle's echo service to simulate remote data loading
                     type: "POST",
                     timeout: 180000,
                     url: app.configService.serviceUrl + 'post-json.service?s=master-service&o=getJobReportType.json',
                     data: JSON.stringify({
                         "token": localStorage.getItem("token"),
                         "version": "2"
                     }),
                     async: true,
                     dataType: "json",
                     contentType: 'application/json',
                     success: function(response) {
                         //store response
                         localStorage.setItem("reportTypeData", JSON.stringify(response));
                         ////console.log("fetch ReportType : " + JSON.stringify(response));
                         ////console.log("fetch ReportType : Complete");
                     },
                     error: function(xhr, error) {
                         if (!app.ajaxHandlerService.error(xhr, error)) {
                             var cache = localStorage.getItem("reportTypeData");

                             if (cache == null || cache == undefined) {
                                 ////console.log("Get Master ReportType failed");
                                 ////console.log(xhr);
                                 ////console.log(error);
                                 navigator.notification.alert(xhr.status + error,
                                     function() {}, "Get Master ReportType failed", 'OK');

                             }
                         }
                         return;
                     }
                 });
             }

         },
         loadProblemCause: function() {
             var that = this;
             var ProblemCauses = null;
             if (app.configService.isMorkupData) {
                 var response = {
                     "problemCauses": [{
                         "id": "28",
                         "description": "Battery",
                         "status": "A",
                         "subProblemCauseId": "243",
                         "subProblemCauseDesc": "TEST Battery2",
                         "rownum": null,
                         "priority": 1
                     }, {
                         "id": "28",
                         "description": "Battery",
                         "status": "A",
                         "subProblemCauseId": "131",
                         "subProblemCauseDesc": "Battery Failed",
                         "rownum": null,
                         "priority": 1
                     }, {
                         "id": "02",
                         "description": "Transmission",
                         "status": "A",
                         "subProblemCauseId": "115",
                         "subProblemCauseDesc": "Fiber high loss or over spec",
                         "rownum": null,
                         "priority": 2
                     }, {
                         "id": "02",
                         "description": "Transmission",
                         "status": "A",
                         "subProblemCauseId": "114",
                         "subProblemCauseDesc": "STM-1/e link problem",
                         "rownum": null,
                         "priority": 2
                     }, {
                         "id": "02",
                         "description": "Transmission",
                         "status": "A",
                         "subProblemCauseId": "011",
                         "subProblemCauseDesc": "TT&T link failed",
                         "rownum": null,
                         "priority": 2
                     }, {
                         "id": "02",
                         "description": "Transmission",
                         "status": "A",
                         "subProblemCauseId": "012",
                         "subProblemCauseDesc": "SDH Mux equipment",
                         "rownum": null,
                         "priority": 2
                     }, {
                         "id": "02",
                         "description": "Transmission",
                         "status": "A",
                         "subProblemCauseId": "013",
                         "subProblemCauseDesc": "PDH Mux equipment",
                         "rownum": null,
                         "priority": 2
                     }, {
                         "id": "02",
                         "description": "Transmission",
                         "status": "A",
                         "subProblemCauseId": "014",
                         "subProblemCauseDesc": "Microwave equipment",
                         "rownum": null,
                         "priority": 2
                     }, {
                         "id": "02",
                         "description": "Transmission",
                         "status": "A",
                         "subProblemCauseId": "015",
                         "subProblemCauseDesc": "HDSL equipment",
                         "rownum": null,
                         "priority": 2
                     }, {
                         "id": "02",
                         "description": "Transmission",
                         "status": "A",
                         "subProblemCauseId": "016",
                         "subProblemCauseDesc": "Connector/Patch cord",
                         "rownum": null,
                         "priority": 2
                     }, {
                         "id": "02",
                         "description": "Transmission",
                         "status": "A",
                         "subProblemCauseId": "017",
                         "subProblemCauseDesc": "Sub-marine link down",
                         "rownum": null,
                         "priority": 2
                     }, {
                         "id": "02",
                         "description": "Transmission",
                         "status": "A",
                         "subProblemCauseId": "018",
                         "subProblemCauseDesc": "Satellite link down",
                         "rownum": null,
                         "priority": 2
                     }, {
                         "id": "02",
                         "description": "Transmission",
                         "status": "A",
                         "subProblemCauseId": "019",
                         "subProblemCauseDesc": "Software TRS problem",
                         "rownum": null,
                         "priority": 2
                     }, {
                         "id": "02",
                         "description": "Transmission",
                         "status": "A",
                         "subProblemCauseId": "007",
                         "subProblemCauseDesc": "Optical fiber cable cut",
                         "rownum": null,
                         "priority": 2
                     }, {
                         "id": "02",
                         "description": "Transmission",
                         "status": "A",
                         "subProblemCauseId": "008",
                         "subProblemCauseDesc": "Microwave link down",
                         "rownum": null,
                         "priority": 2
                     }, {
                         "id": "02",
                         "description": "Transmission",
                         "status": "A",
                         "subProblemCauseId": "009",
                         "subProblemCauseDesc": "HDSL drop wire failed",
                         "rownum": null,
                         "priority": 2
                     }, {
                         "id": "21",
                         "description": "Generator",
                         "status": "A",
                         "subProblemCauseId": "130",
                         "subProblemCauseDesc": "Generator Emergency Stop",
                         "rownum": null,
                         "priority": 2
                     }, {
                         "id": "21",
                         "description": "Generator",
                         "status": "A",
                         "subProblemCauseId": "129",
                         "subProblemCauseDesc": "Generator Auto Block",
                         "rownum": null,
                         "priority": 2
                     }, {
                         "id": "21",
                         "description": "Generator",
                         "status": "A",
                         "subProblemCauseId": "128",
                         "subProblemCauseDesc": "Generator Low Fuel",
                         "rownum": null,
                         "priority": 2
                     }, {
                         "id": "21",
                         "description": "Generator",
                         "status": "A",
                         "subProblemCauseId": "127",
                         "subProblemCauseDesc": "Generator Failed",
                         "rownum": null,
                         "priority": 2
                     }, {
                         "id": "02",
                         "description": "Transmission",
                         "status": "A",
                         "subProblemCauseId": "029",
                         "subProblemCauseDesc": "Other",
                         "rownum": null,
                         "priority": 2
                     }, {
                         "id": "02",
                         "description": "Transmission",
                         "status": "A",
                         "subProblemCauseId": "010",
                         "subProblemCauseDesc": "TOT link failed",
                         "rownum": null,
                         "priority": 2
                     }, {
                         "id": "02",
                         "description": "Transmission",
                         "status": "A",
                         "subProblemCauseId": "126",
                         "subProblemCauseDesc": "DWDM Hardware or equipment fail",
                         "rownum": null,
                         "priority": 2
                     }, {
                         "id": "02",
                         "description": "Transmission",
                         "status": "A",
                         "subProblemCauseId": "125",
                         "subProblemCauseDesc": "Control bus or data bus problem",
                         "rownum": null,
                         "priority": 2
                     }, {
                         "id": "02",
                         "description": "Transmission",
                         "status": "A",
                         "subProblemCauseId": "124",
                         "subProblemCauseDesc": "Siemens loss communication",
                         "rownum": null,
                         "priority": 2
                     }, {
                         "id": "02",
                         "description": "Transmission",
                         "status": "A",
                         "subProblemCauseId": "123",
                         "subProblemCauseDesc": "Huawei Loss communication",
                         "rownum": null,
                         "priority": 2
                     }, {
                         "id": "02",
                         "description": "Transmission",
                         "status": "A",
                         "subProblemCauseId": "122",
                         "subProblemCauseDesc": "Optical inteface unit degrade",
                         "rownum": null,
                         "priority": 2
                     }, {
                         "id": "02",
                         "description": "Transmission",
                         "status": "A",
                         "subProblemCauseId": "121",
                         "subProblemCauseDesc": "Microwave problem",
                         "rownum": null,
                         "priority": 2
                     }, {
                         "id": "02",
                         "description": "Transmission",
                         "status": "A",
                         "subProblemCauseId": "120",
                         "subProblemCauseDesc": "HDSL problem",
                         "rownum": null,
                         "priority": 2
                     }, {
                         "id": "02",
                         "description": "Transmission",
                         "status": "A",
                         "subProblemCauseId": "119",
                         "subProblemCauseDesc": "Facility problem",
                         "rownum": null,
                         "priority": 2
                     }, {
                         "id": "02",
                         "description": "Transmission",
                         "status": "A",
                         "subProblemCauseId": "118",
                         "subProblemCauseDesc": "SDH MUX hardware or equipment failed",
                         "rownum": null,
                         "priority": 2
                     }, {
                         "id": "02",
                         "description": "Transmission",
                         "status": "A",
                         "subProblemCauseId": "104",
                         "subProblemCauseDesc": "SDH Mux equipment replace",
                         "rownum": null,
                         "priority": 2
                     }, {
                         "id": "02",
                         "description": "Transmission",
                         "status": "A",
                         "subProblemCauseId": "105",
                         "subProblemCauseDesc": "SDH Mux equipment reset",
                         "rownum": null,
                         "priority": 2
                     }, {
                         "id": "02",
                         "description": "Transmission",
                         "status": "A",
                         "subProblemCauseId": "106",
                         "subProblemCauseDesc": "Optical fiber cable high loss",
                         "rownum": null,
                         "priority": 2
                     }, {
                         "id": "02",
                         "description": "Transmission",
                         "status": "A",
                         "subProblemCauseId": "107",
                         "subProblemCauseDesc": "Associated failed",
                         "rownum": null,
                         "priority": 2
                     }, {
                         "id": "02",
                         "description": "Transmission",
                         "status": "A",
                         "subProblemCauseId": "108",
                         "subProblemCauseDesc": "ADC link failed",
                         "rownum": null,
                         "priority": 2
                     }, {
                         "id": "02",
                         "description": "Transmission",
                         "status": "A",
                         "subProblemCauseId": "109",
                         "subProblemCauseDesc": "2 M failed",
                         "rownum": null,
                         "priority": 2
                     }, {
                         "id": "02",
                         "description": "Transmission",
                         "status": "A",
                         "subProblemCauseId": "110",
                         "subProblemCauseDesc": "Data network transmission failed",
                         "rownum": null,
                         "priority": 2
                     }, {
                         "id": "02",
                         "description": "Transmission",
                         "status": "A",
                         "subProblemCauseId": "111",
                         "subProblemCauseDesc": "Server",
                         "rownum": null,
                         "priority": 2
                     }, {
                         "id": "02",
                         "description": "Transmission",
                         "status": "A",
                         "subProblemCauseId": "112",
                         "subProblemCauseDesc": "DWDM",
                         "rownum": null,
                         "priority": 2
                     }, {
                         "id": "02",
                         "description": "Transmission",
                         "status": "A",
                         "subProblemCauseId": "113",
                         "subProblemCauseDesc": "2M link problem",
                         "rownum": null,
                         "priority": 2
                     }, {
                         "id": "02",
                         "description": "Transmission",
                         "status": "A",
                         "subProblemCauseId": "117",
                         "subProblemCauseDesc": "NEC Association failed",
                         "rownum": null,
                         "priority": 2
                     }, {
                         "id": "02",
                         "description": "Transmission",
                         "status": "A",
                         "subProblemCauseId": "116",
                         "subProblemCauseDesc": "Fiber Cut",
                         "rownum": null,
                         "priority": 2
                     }, {
                         "id": "03",
                         "description": "BTS",
                         "status": "A",
                         "subProblemCauseId": "030",
                         "subProblemCauseDesc": "Other",
                         "rownum": null,
                         "priority": 3
                     }, {
                         "id": "03",
                         "description": "BTS",
                         "status": "A",
                         "subProblemCauseId": "022",
                         "subProblemCauseDesc": "Software BTS problem",
                         "rownum": null,
                         "priority": 3
                     }, {
                         "id": "03",
                         "description": "BTS",
                         "status": "A",
                         "subProblemCauseId": "021",
                         "subProblemCauseDesc": "Antenna Problem",
                         "rownum": null,
                         "priority": 3
                     }, {
                         "id": "03",
                         "description": "BTS",
                         "status": "A",
                         "subProblemCauseId": "020",
                         "subProblemCauseDesc": "BTS equipment",
                         "rownum": null,
                         "priority": 3
                     }, {
                         "id": "03",
                         "description": "BTS",
                         "status": "A",
                         "subProblemCauseId": "040",
                         "subProblemCauseDesc": "Parameter Problem",
                         "rownum": null,
                         "priority": 3
                     }, {
                         "id": "03",
                         "description": "BTS",
                         "status": "A",
                         "subProblemCauseId": "143",
                         "subProblemCauseDesc": "RF Equipment Failed",
                         "rownum": null,
                         "priority": 3
                     }, {
                         "id": "03",
                         "description": "BTS",
                         "status": "A",
                         "subProblemCauseId": "142",
                         "subProblemCauseDesc": "Repeater Failed",
                         "rownum": null,
                         "priority": 3
                     }, {
                         "id": "04",
                         "description": "BSC",
                         "status": "A",
                         "subProblemCauseId": "024",
                         "subProblemCauseDesc": "Software BSC problem",
                         "rownum": null,
                         "priority": 4
                     }, {
                         "id": "04",
                         "description": "BSC",
                         "status": "A",
                         "subProblemCauseId": "039",
                         "subProblemCauseDesc": "Parameter Problem",
                         "rownum": null,
                         "priority": 4
                     }, {
                         "id": "04",
                         "description": "BSC",
                         "status": "A",
                         "subProblemCauseId": "023",
                         "subProblemCauseDesc": "BSC equipment",
                         "rownum": null,
                         "priority": 4
                     }, {
                         "id": "04",
                         "description": "BSC",
                         "status": "A",
                         "subProblemCauseId": "031",
                         "subProblemCauseDesc": "Other",
                         "rownum": null,
                         "priority": 4
                     }, {
                         "id": "05",
                         "description": "Activity",
                         "status": "A",
                         "subProblemCauseId": "025",
                         "subProblemCauseDesc": "Planned work",
                         "rownum": null,
                         "priority": 5
                     }, {
                         "id": "05",
                         "description": "Activity",
                         "status": "A",
                         "subProblemCauseId": "035",
                         "subProblemCauseDesc": "Preventive Activity",
                         "rownum": null,
                         "priority": 5
                     }, {
                         "id": "05",
                         "description": "Activity",
                         "status": "A",
                         "subProblemCauseId": "036",
                         "subProblemCauseDesc": "Implementation Activity",
                         "rownum": null,
                         "priority": 5
                     }, {
                         "id": "05",
                         "description": "Activity",
                         "status": "A",
                         "subProblemCauseId": "037",
                         "subProblemCauseDesc": "Optimization Activity",
                         "rownum": null,
                         "priority": 5
                     }, {
                         "id": "05",
                         "description": "Activity",
                         "status": "A",
                         "subProblemCauseId": "038",
                         "subProblemCauseDesc": "Configuration Activity",
                         "rownum": null,
                         "priority": 5
                     }, {
                         "id": "05",
                         "description": "Activity",
                         "status": "A",
                         "subProblemCauseId": "032",
                         "subProblemCauseDesc": "Other",
                         "rownum": null,
                         "priority": 5
                     }, {
                         "id": "06",
                         "description": "NSS",
                         "status": "A",
                         "subProblemCauseId": "026",
                         "subProblemCauseDesc": "NSS equipment",
                         "rownum": null,
                         "priority": 6
                     }, {
                         "id": "06",
                         "description": "NSS",
                         "status": "A",
                         "subProblemCauseId": "041",
                         "subProblemCauseDesc": "Parameter Problem",
                         "rownum": null,
                         "priority": 6
                     }, {
                         "id": "06",
                         "description": "NSS",
                         "status": "A",
                         "subProblemCauseId": "033",
                         "subProblemCauseDesc": "Other",
                         "rownum": null,
                         "priority": 6
                     }, {
                         "id": "06",
                         "description": "NSS",
                         "status": "A",
                         "subProblemCauseId": "027",
                         "subProblemCauseDesc": "Software NSS problem",
                         "rownum": null,
                         "priority": 6
                     }, {
                         "id": "08",
                         "description": "AC MAIN FAILED",
                         "status": "A",
                         "subProblemCauseId": "042",
                         "subProblemCauseDesc": "MEA/PEA Failed",
                         "rownum": null,
                         "priority": 7
                     }, {
                         "id": "08",
                         "description": "AC MAIN FAILED",
                         "status": "A",
                         "subProblemCauseId": "043",
                         "subProblemCauseDesc": "AC From Building",
                         "rownum": null,
                         "priority": 7
                     }, {
                         "id": "08",
                         "description": "AC MAIN FAILED",
                         "status": "A",
                         "subProblemCauseId": "044",
                         "subProblemCauseDesc": "Transformer Failed",
                         "rownum": null,
                         "priority": 7
                     }, {
                         "id": "08",
                         "description": "AC MAIN FAILED",
                         "status": "A",
                         "subProblemCauseId": "045",
                         "subProblemCauseDesc": "Lightning",
                         "rownum": null,
                         "priority": 7
                     }, {
                         "id": "08",
                         "description": "AC MAIN FAILED",
                         "status": "A",
                         "subProblemCauseId": "046",
                         "subProblemCauseDesc": "High Volt Fuse Failed",
                         "rownum": null,
                         "priority": 7
                     }, {
                         "id": "08",
                         "description": "AC MAIN FAILED",
                         "status": "A",
                         "subProblemCauseId": "047",
                         "subProblemCauseDesc": "Low Volt Fuse Failed",
                         "rownum": null,
                         "priority": 7
                     }, {
                         "id": "08",
                         "description": "AC MAIN FAILED",
                         "status": "A",
                         "subProblemCauseId": "048",
                         "subProblemCauseDesc": "UPS Failed",
                         "rownum": null,
                         "priority": 7
                     }, {
                         "id": "08",
                         "description": "AC MAIN FAILED",
                         "status": "A",
                         "subProblemCauseId": "049",
                         "subProblemCauseDesc": "AC Main Circuit Breaker Trip",
                         "rownum": null,
                         "priority": 7
                     }, {
                         "id": "08",
                         "description": "AC MAIN FAILED",
                         "status": "A",
                         "subProblemCauseId": "050",
                         "subProblemCauseDesc": "Phase Error / Loss of Phase",
                         "rownum": null,
                         "priority": 7
                     }, {
                         "id": "08",
                         "description": "AC MAIN FAILED",
                         "status": "A",
                         "subProblemCauseId": "051",
                         "subProblemCauseDesc": "Sensor / Control Board Failed",
                         "rownum": null,
                         "priority": 7
                     }, {
                         "id": "08",
                         "description": "AC MAIN FAILED",
                         "status": "A",
                         "subProblemCauseId": "052",
                         "subProblemCauseDesc": "Other",
                         "rownum": null,
                         "priority": 7
                     }, {
                         "id": "09",
                         "description": "RECTIFIER UNIT FAILED",
                         "status": "A",
                         "subProblemCauseId": "053",
                         "subProblemCauseDesc": "AC Input Circuit Breaker Trip",
                         "rownum": null,
                         "priority": 8
                     }, {
                         "id": "09",
                         "description": "RECTIFIER UNIT FAILED",
                         "status": "A",
                         "subProblemCauseId": "057",
                         "subProblemCauseDesc": "Other",
                         "rownum": null,
                         "priority": 8
                     }, {
                         "id": "09",
                         "description": "RECTIFIER UNIT FAILED",
                         "status": "A",
                         "subProblemCauseId": "054",
                         "subProblemCauseDesc": "Loss of Phase",
                         "rownum": null,
                         "priority": 8
                     }, {
                         "id": "09",
                         "description": "RECTIFIER UNIT FAILED",
                         "status": "A",
                         "subProblemCauseId": "055",
                         "subProblemCauseDesc": "PSU Failed",
                         "rownum": null,
                         "priority": 8
                     }, {
                         "id": "09",
                         "description": "RECTIFIER UNIT FAILED",
                         "status": "A",
                         "subProblemCauseId": "056",
                         "subProblemCauseDesc": "Control Board Failed",
                         "rownum": null,
                         "priority": 8
                     }, {
                         "id": "10",
                         "description": "LOW VOLTAGE ALARM",
                         "status": "A",
                         "subProblemCauseId": "061",
                         "subProblemCauseDesc": "Control Board Failed",
                         "rownum": null,
                         "priority": 9
                     }, {
                         "id": "10",
                         "description": "LOW VOLTAGE ALARM",
                         "status": "A",
                         "subProblemCauseId": "062",
                         "subProblemCauseDesc": "Other",
                         "rownum": null,
                         "priority": 9
                     }, {
                         "id": "10",
                         "description": "LOW VOLTAGE ALARM",
                         "status": "A",
                         "subProblemCauseId": "060",
                         "subProblemCauseDesc": "Battery Fuse Open",
                         "rownum": null,
                         "priority": 9
                     }, {
                         "id": "10",
                         "description": "LOW VOLTAGE ALARM",
                         "status": "A",
                         "subProblemCauseId": "058",
                         "subProblemCauseDesc": "System Low / Under Voltage",
                         "rownum": null,
                         "priority": 9
                     }, {
                         "id": "10",
                         "description": "LOW VOLTAGE ALARM",
                         "status": "A",
                         "subProblemCauseId": "059",
                         "subProblemCauseDesc": "DC Circuit Breaker Trip",
                         "rownum": null,
                         "priority": 9
                     }, {
                         "id": "11",
                         "description": "OBSERVE ALARM",
                         "status": "A",
                         "subProblemCauseId": "063",
                         "subProblemCauseDesc": "High Voltage Alarm",
                         "rownum": null,
                         "priority": 10
                     }, {
                         "id": "11",
                         "description": "OBSERVE ALARM",
                         "status": "A",
                         "subProblemCauseId": "068",
                         "subProblemCauseDesc": "Other",
                         "rownum": null,
                         "priority": 10
                     }, {
                         "id": "11",
                         "description": "OBSERVE ALARM",
                         "status": "A",
                         "subProblemCauseId": "067",
                         "subProblemCauseDesc": "Control Board Failed",
                         "rownum": null,
                         "priority": 10
                     }, {
                         "id": "11",
                         "description": "OBSERVE ALARM",
                         "status": "A",
                         "subProblemCauseId": "066",
                         "subProblemCauseDesc": "Temperature Sensor Failed",
                         "rownum": null,
                         "priority": 10
                     }, {
                         "id": "11",
                         "description": "OBSERVE ALARM",
                         "status": "A",
                         "subProblemCauseId": "065",
                         "subProblemCauseDesc": "Optic Communication Error",
                         "rownum": null,
                         "priority": 10
                     }, {
                         "id": "11",
                         "description": "OBSERVE ALARM",
                         "status": "A",
                         "subProblemCauseId": "064",
                         "subProblemCauseDesc": "Fan Failed",
                         "rownum": null,
                         "priority": 10
                     }, {
                         "id": "12",
                         "description": "Air Condition",
                         "status": "A",
                         "subProblemCauseId": "069",
                         "subProblemCauseDesc": "CDU failed",
                         "rownum": null,
                         "priority": 11
                     }, {
                         "id": "12",
                         "description": "Air Condition",
                         "status": "A",
                         "subProblemCauseId": "073",
                         "subProblemCauseDesc": "Other",
                         "rownum": null,
                         "priority": 11
                     }, {
                         "id": "12",
                         "description": "Air Condition",
                         "status": "A",
                         "subProblemCauseId": "072",
                         "subProblemCauseDesc": "Sensor failed",
                         "rownum": null,
                         "priority": 11
                     }, {
                         "id": "12",
                         "description": "Air Condition",
                         "status": "A",
                         "subProblemCauseId": "071",
                         "subProblemCauseDesc": "Control failed",
                         "rownum": null,
                         "priority": 11
                     }, {
                         "id": "12",
                         "description": "Air Condition",
                         "status": "A",
                         "subProblemCauseId": "070",
                         "subProblemCauseDesc": "FCU failed",
                         "rownum": null,
                         "priority": 11
                     }, {
                         "id": "13",
                         "description": "Tower",
                         "status": "A",
                         "subProblemCauseId": "074",
                         "subProblemCauseDesc": "Obstruction Light failed",
                         "rownum": null,
                         "priority": 12
                     }, {
                         "id": "13",
                         "description": "Tower",
                         "status": "A",
                         "subProblemCauseId": "075",
                         "subProblemCauseDesc": "Control Obstruction Light failed",
                         "rownum": null,
                         "priority": 12
                     }, {
                         "id": "13",
                         "description": "Tower",
                         "status": "A",
                         "subProblemCauseId": "076",
                         "subProblemCauseDesc": "Other",
                         "rownum": null,
                         "priority": 12
                     }, {
                         "id": "26",
                         "description": "Door",
                         "status": "A",
                         "subProblemCauseId": "140",
                         "subProblemCauseDesc": "Door Open",
                         "rownum": null,
                         "priority": 13
                     }, {
                         "id": "27",
                         "description": "Smoke Detector",
                         "status": "A",
                         "subProblemCauseId": "141",
                         "subProblemCauseDesc": "Smoke Detector Failed",
                         "rownum": null,
                         "priority": 13
                     }, {
                         "id": "25",
                         "description": "Fan",
                         "status": "A",
                         "subProblemCauseId": "137",
                         "subProblemCauseDesc": "Control Fan Failed",
                         "rownum": null,
                         "priority": 13
                     }, {
                         "id": "24",
                         "description": "ATS ",
                         "status": "A",
                         "subProblemCauseId": "136",
                         "subProblemCauseDesc": "ATS Not Auto",
                         "rownum": null,
                         "priority": 13
                     }, {
                         "id": "23",
                         "description": "UPS",
                         "status": "A",
                         "subProblemCauseId": "135",
                         "subProblemCauseDesc": "UPS Failed",
                         "rownum": null,
                         "priority": 13
                     }, {
                         "id": "22",
                         "description": "Surge",
                         "status": "A",
                         "subProblemCauseId": "134",
                         "subProblemCauseDesc": "Fuse Surge Blown",
                         "rownum": null,
                         "priority": 13
                     }, {
                         "id": "25",
                         "description": "Fan",
                         "status": "A",
                         "subProblemCauseId": "138",
                         "subProblemCauseDesc": "Fan Failed",
                         "rownum": null,
                         "priority": 13
                     }, {
                         "id": "22",
                         "description": "Surge",
                         "status": "A",
                         "subProblemCauseId": "132",
                         "subProblemCauseDesc": "Surge Protection Failed",
                         "rownum": null,
                         "priority": 13
                     }, {
                         "id": "22",
                         "description": "Surge",
                         "status": "A",
                         "subProblemCauseId": "133",
                         "subProblemCauseDesc": "Surge Main CB Trip",
                         "rownum": null,
                         "priority": 13
                     }, {
                         "id": "26",
                         "description": "Door",
                         "status": "A",
                         "subProblemCauseId": "139",
                         "subProblemCauseDesc": "Door Sensor Failed",
                         "rownum": null,
                         "priority": 13
                     }, {
                         "id": "14",
                         "description": "Site Facility",
                         "status": "A",
                         "subProblemCauseId": "077",
                         "subProblemCauseDesc": "Other",
                         "rownum": null,
                         "priority": 14
                     }, {
                         "id": "15",
                         "description": "Radio parameter",
                         "status": "A",
                         "subProblemCauseId": "086",
                         "subProblemCauseDesc": "Other parameter",
                         "rownum": null,
                         "priority": 15
                     }, {
                         "id": "15",
                         "description": "Radio parameter",
                         "status": "A",
                         "subProblemCauseId": "082",
                         "subProblemCauseDesc": "Interfere",
                         "rownum": null,
                         "priority": 15
                     }, {
                         "id": "15",
                         "description": "Radio parameter",
                         "status": "A",
                         "subProblemCauseId": "081",
                         "subProblemCauseDesc": "Low SS",
                         "rownum": null,
                         "priority": 15
                     }, {
                         "id": "15",
                         "description": "Radio parameter",
                         "status": "A",
                         "subProblemCauseId": "080",
                         "subProblemCauseDesc": "Wrong decode BSIC",
                         "rownum": null,
                         "priority": 15
                     }, {
                         "id": "15",
                         "description": "Radio parameter",
                         "status": "A",
                         "subProblemCauseId": "079",
                         "subProblemCauseDesc": "Layer,penalty",
                         "rownum": null,
                         "priority": 15
                     }, {
                         "id": "15",
                         "description": "Radio parameter",
                         "status": "A",
                         "subProblemCauseId": "078",
                         "subProblemCauseDesc": "Add/delete Neighbour",
                         "rownum": null,
                         "priority": 15
                     }, {
                         "id": "15",
                         "description": "Radio parameter",
                         "status": "A",
                         "subProblemCauseId": "083",
                         "subProblemCauseDesc": "Not suitable handover",
                         "rownum": null,
                         "priority": 15
                     }, {
                         "id": "16",
                         "description": "Power",
                         "status": "A",
                         "subProblemCauseId": "087",
                         "subProblemCauseDesc": "Increase/decrease power",
                         "rownum": null,
                         "priority": 16
                     }, {
                         "id": "17",
                         "description": "Hardware",
                         "status": "A",
                         "subProblemCauseId": "084",
                         "subProblemCauseDesc": "Tilt and direction",
                         "rownum": null,
                         "priority": 17
                     }, {
                         "id": "17",
                         "description": "Hardware",
                         "status": "A",
                         "subProblemCauseId": "085",
                         "subProblemCauseDesc": "TRU or CDU",
                         "rownum": null,
                         "priority": 17
                     }, {
                         "id": "17",
                         "description": "Hardware",
                         "status": "A",
                         "subProblemCauseId": "088",
                         "subProblemCauseDesc": "Other",
                         "rownum": null,
                         "priority": 17
                     }, {
                         "id": "18",
                         "description": "Technical drop",
                         "status": "A",
                         "subProblemCauseId": "089",
                         "subProblemCauseDesc": "Technical drop",
                         "rownum": null,
                         "priority": 18
                     }, {
                         "id": "19",
                         "description": "VAS",
                         "status": "A",
                         "subProblemCauseId": "090",
                         "subProblemCauseDesc": "Rating Error",
                         "rownum": null,
                         "priority": 19
                     }, {
                         "id": "19",
                         "description": "VAS",
                         "status": "A",
                         "subProblemCauseId": "091",
                         "subProblemCauseDesc": "Costcode Error",
                         "rownum": null,
                         "priority": 19
                     }, {
                         "id": "19",
                         "description": "VAS",
                         "status": "A",
                         "subProblemCauseId": "092",
                         "subProblemCauseDesc": "Application Error\n",
                         "rownum": null,
                         "priority": 19
                     }, {
                         "id": "19",
                         "description": "VAS",
                         "status": "A",
                         "subProblemCauseId": "093",
                         "subProblemCauseDesc": "User to inspect",
                         "rownum": null,
                         "priority": 19
                     }, {
                         "id": "20",
                         "description": "SMS1175 &PCS",
                         "status": "A",
                         "subProblemCauseId": "103",
                         "subProblemCauseDesc": "IIS",
                         "rownum": null,
                         "priority": 20
                     }, {
                         "id": "20",
                         "description": "SMS1175 &PCS",
                         "status": "A",
                         "subProblemCauseId": "102",
                         "subProblemCauseDesc": "Database",
                         "rownum": null,
                         "priority": 20
                     }, {
                         "id": "20",
                         "description": "SMS1175 &PCS",
                         "status": "A",
                         "subProblemCauseId": "101",
                         "subProblemCauseDesc": "PCS Sender",
                         "rownum": null,
                         "priority": 20
                     }, {
                         "id": "20",
                         "description": "SMS1175 &PCS",
                         "status": "A",
                         "subProblemCauseId": "100",
                         "subProblemCauseDesc": "Web page Error",
                         "rownum": null,
                         "priority": 20
                     }, {
                         "id": "20",
                         "description": "SMS1175 &PCS",
                         "status": "A",
                         "subProblemCauseId": "099",
                         "subProblemCauseDesc": "StoreProcedure",
                         "rownum": null,
                         "priority": 20
                     }, {
                         "id": "20",
                         "description": "SMS1175 &PCS",
                         "status": "A",
                         "subProblemCauseId": "098",
                         "subProblemCauseDesc": "SrvCtrl\n",
                         "rownum": null,
                         "priority": 20
                     }, {
                         "id": "20",
                         "description": "SMS1175 &PCS",
                         "status": "A",
                         "subProblemCauseId": "097",
                         "subProblemCauseDesc": "SMSPushingGw\n",
                         "rownum": null,
                         "priority": 20
                     }, {
                         "id": "20",
                         "description": "SMS1175 &PCS",
                         "status": "A",
                         "subProblemCauseId": "096",
                         "subProblemCauseDesc": "FileCopyManager\n",
                         "rownum": null,
                         "priority": 20
                     }, {
                         "id": "20",
                         "description": "SMS1175 &PCS",
                         "status": "A",
                         "subProblemCauseId": "094",
                         "subProblemCauseDesc": "Hardware Error\n",
                         "rownum": null,
                         "priority": 20
                     }, {
                         "id": "20",
                         "description": "SMS1175 &PCS",
                         "status": "A",
                         "subProblemCauseId": "095",
                         "subProblemCauseDesc": "BatchFileManager",
                         "rownum": null,
                         "priority": 20
                     }, {
                         "id": "07",
                         "description": "Other",
                         "status": "A",
                         "subProblemCauseId": "034",
                         "subProblemCauseDesc": "Other",
                         "rownum": null,
                         "priority": 24
                     }, {
                         "id": "07",
                         "description": "Other",
                         "status": "A",
                         "subProblemCauseId": "253",
                         "subProblemCauseDesc": "test1",
                         "rownum": null,
                         "priority": 24
                     }, {
                         "id": "07",
                         "description": "Other",
                         "status": "A",
                         "subProblemCauseId": "254",
                         "subProblemCauseDesc": "test2",
                         "rownum": null,
                         "priority": 24
                     }],
                     "version": "1",
                     "status": null
                 };
                 localStorage.setItem("problemCauseData", JSON.stringify(response));
             } else {
                 $.ajax({ //using jsfiddle's echo service to simulate remote data loading
                     type: "POST",
                     timeout: 180000,
                     url: app.configService.serviceUrl + 'post-json.service?s=master-service&o=getProblemCause.json',
                     data: JSON.stringify({
                         "token": localStorage.getItem("token"),
                         "version": "2"
                     }),
                     async: true,
                     dataType: "json",
                     contentType: 'application/json',
                     success: function(response) {
                         //store response
                         localStorage.setItem("problemCauseData", JSON.stringify(response));
                         ////console.log(JSON.stringify(response));
                         ////console.log("fetch Problem Cause : Complete");
                     },
                     error: function(xhr, error) {
                         if (!app.ajaxHandlerService.error(xhr, error)) {
                             var cache = localStorage.getItem("problemCauseData");

                             if (cache == null || cache == undefined) {
                                 ////console.log("Get Master Problem Cause failed");
                                 ////console.log(xhr);
                                 ////console.log(error);
                                 navigator.notification.alert(xhr.status + error,
                                     function() {}, "Get Master Problem Cause failed", 'OK');
                             }
                         }
                         return;
                     }
                 });
             }

         },
         loadProblemCauseMulti: function() {
             var that = this;
             var ProblemCausesMulti = null;
             if (app.configService.isMorkupData) {
                 var response = {
                     "problemCausesMulti": [{
                         "ids": null,
                         "id": 143,
                         "description": "AC Breaker tip",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 22,
                         "groupParent": 11
                     }, {
                         "ids": null,
                         "id": 204,
                         "description": "AC adaptor problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 26,
                         "groupParent": 17
                     }, {
                         "ids": null,
                         "id": 220,
                         "description": "AC adaptor problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 27,
                         "groupParent": 18
                     }, {
                         "ids": null,
                         "id": 142,
                         "description": "AC power fail",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 22,
                         "groupParent": 11
                     }, {
                         "ids": null,
                         "id": 33,
                         "description": "ADC L2 network",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 2,
                         "group": 9,
                         "groupParent": 2
                     }, {
                         "ids": null,
                         "id": 149,
                         "description": "Activity",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 22,
                         "groupParent": 11
                     }, {
                         "ids": null,
                         "id": 122,
                         "description": "Activity",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 20,
                         "groupParent": 9
                     }, {
                         "ids": null,
                         "id": 132,
                         "description": "Activity",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 21,
                         "groupParent": 10
                     }, {
                         "ids": null,
                         "id": 13,
                         "description": "Activity - link down",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 1,
                         "group": 5,
                         "groupParent": 0
                     }, {
                         "ids": null,
                         "id": 15,
                         "description": "Activity - link speed problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 1,
                         "group": 5,
                         "groupParent": 0
                     }, {
                         "ids": null,
                         "id": 14,
                         "description": "Activity - link unstable",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 1,
                         "group": 5,
                         "groupParent": 0
                     }, {
                         "ids": null,
                         "id": 16,
                         "description": "Air condition - link down",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 1,
                         "group": 6,
                         "groupParent": 0
                     }, {
                         "ids": null,
                         "id": 18,
                         "description": "Air condition - link speed problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 1,
                         "group": 6,
                         "groupParent": 0
                     }, {
                         "ids": null,
                         "id": 17,
                         "description": "Air condition - link unstable",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 1,
                         "group": 6,
                         "groupParent": 0
                     }, {
                         "ids": null,
                         "id": 41,
                         "description": "Bandwidth controler",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 2,
                         "group": 10,
                         "groupParent": 3
                     }, {
                         "ids": null,
                         "id": 43,
                         "description": "Base station",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 2,
                         "group": 11,
                         "groupParent": 4
                     }, {
                         "ids": null,
                         "id": 46,
                         "description": "Base station",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 2,
                         "group": 12,
                         "groupParent": 5
                     }, {
                         "ids": null,
                         "id": 147,
                         "description": "Battery backup problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 22,
                         "groupParent": 11
                     }, {
                         "ids": null,
                         "id": 115,
                         "description": "Breaker tip",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 20,
                         "groupParent": 9
                     }, {
                         "ids": null,
                         "id": 205,
                         "description": "Breaker tip",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 26,
                         "groupParent": 17
                     }, {
                         "ids": null,
                         "id": 221,
                         "description": "Breaker tip",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 27,
                         "groupParent": 18
                     }, {
                         "ids": null,
                         "id": 175,
                         "description": "Breaker tip",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 24,
                         "groupParent": 15
                     }, {
                         "ids": null,
                         "id": 190,
                         "description": "Breaker tip",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 25,
                         "groupParent": 16
                     }, {
                         "ids": null,
                         "id": 112,
                         "description": "Broadcast problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 20,
                         "groupParent": 9
                     }, {
                         "ids": null,
                         "id": 114,
                         "description": "Broadcast problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 20,
                         "groupParent": 9
                     }, {
                         "ids": null,
                         "id": 131,
                         "description": "Configuration problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 21,
                         "groupParent": 10
                     }, {
                         "ids": null,
                         "id": 224,
                         "description": "Configuration problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 27,
                         "groupParent": 18
                     }, {
                         "ids": null,
                         "id": 171,
                         "description": "Configuration problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 24,
                         "groupParent": 15
                     }, {
                         "ids": null,
                         "id": 208,
                         "description": "Configuration problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 26,
                         "groupParent": 17
                     }, {
                         "ids": null,
                         "id": 118,
                         "description": "Configuration problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 20,
                         "groupParent": 9
                     }, {
                         "ids": null,
                         "id": 188,
                         "description": "Copper cut",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 25,
                         "groupParent": 16
                     }, {
                         "ids": null,
                         "id": 189,
                         "description": "Copper high loss(low SNR)",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 25,
                         "groupParent": 16
                     }, {
                         "ids": null,
                         "id": 7,
                         "description": "Core network - link down",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 1,
                         "group": 3,
                         "groupParent": 0
                     }, {
                         "ids": null,
                         "id": 9,
                         "description": "Core network - link speed problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 1,
                         "group": 3,
                         "groupParent": 0
                     }, {
                         "ids": null,
                         "id": 8,
                         "description": "Core network - link unstable",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 1,
                         "group": 3,
                         "groupParent": 0
                     }, {
                         "ids": null,
                         "id": 53,
                         "description": "Customer can send but can't receive email all user",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 2,
                         "group": 14,
                         "groupParent": 7
                     }, {
                         "ids": null,
                         "id": 60,
                         "description": "Customer can send but can't receive email all user some time",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 2,
                         "group": 14,
                         "groupParent": 7
                     }, {
                         "ids": null,
                         "id": 54,
                         "description": "Customer can send but can't receive email some user",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 2,
                         "group": 14,
                         "groupParent": 7
                     }, {
                         "ids": null,
                         "id": 61,
                         "description": "Customer can send but can't receive email some user some time",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 2,
                         "group": 14,
                         "groupParent": 7
                     }, {
                         "ids": null,
                         "id": 51,
                         "description": "Customer can't send but can receive email all user",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 2,
                         "group": 14,
                         "groupParent": 7
                     }, {
                         "ids": null,
                         "id": 58,
                         "description": "Customer can't send but can receive email all user some time",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 2,
                         "group": 14,
                         "groupParent": 7
                     }, {
                         "ids": null,
                         "id": 52,
                         "description": "Customer can't send but can receive email some user",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 2,
                         "group": 14,
                         "groupParent": 7
                     }, {
                         "ids": null,
                         "id": 59,
                         "description": "Customer can't send but can receive email some user some time",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 2,
                         "group": 14,
                         "groupParent": 7
                     }, {
                         "ids": null,
                         "id": 49,
                         "description": "Customer can't send/receive email  all user",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 2,
                         "group": 14,
                         "groupParent": 7
                     }, {
                         "ids": null,
                         "id": 56,
                         "description": "Customer can't send/receive email  all user some time",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 2,
                         "group": 14,
                         "groupParent": 7
                     }, {
                         "ids": null,
                         "id": 50,
                         "description": "Customer can't send/receive email  some user",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 2,
                         "group": 14,
                         "groupParent": 7
                     }, {
                         "ids": null,
                         "id": 57,
                         "description": "Customer can't send/receive email  some user some time",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 2,
                         "group": 14,
                         "groupParent": 7
                     }, {
                         "ids": null,
                         "id": 153,
                         "description": "Customer problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 23,
                         "groupParent": 14
                     }, {
                         "ids": null,
                         "id": 55,
                         "description": "Customer receive more spam mail",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 2,
                         "group": 14,
                         "groupParent": 7
                     }, {
                         "ids": null,
                         "id": 144,
                         "description": "DC Breaker tip",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 22,
                         "groupParent": 11
                     }, {
                         "ids": null,
                         "id": 42,
                         "description": "DNS",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 2,
                         "group": 10,
                         "groupParent": 3
                     }, {
                         "ids": null,
                         "id": 155,
                         "description": "DNS problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 23,
                         "groupParent": 14
                     }, {
                         "ids": null,
                         "id": 32,
                         "description": "DWDM",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 2,
                         "group": 9,
                         "groupParent": 2
                     }, {
                         "ids": null,
                         "id": 37,
                         "description": "DWDM",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 2,
                         "group": 10,
                         "groupParent": 3
                     }, {
                         "ids": null,
                         "id": 4,
                         "description": "Distribution network - link down",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 1,
                         "group": 2,
                         "groupParent": 0
                     }, {
                         "ids": null,
                         "id": 6,
                         "description": "Distribution network - link speed problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 1,
                         "group": 2,
                         "groupParent": 0
                     }, {
                         "ids": null,
                         "id": 5,
                         "description": "Distribution network - link unstable",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 1,
                         "group": 2,
                         "groupParent": 0
                     }, {
                         "ids": null,
                         "id": 19,
                         "description": "E-Mail Service - E-Mail Service",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 1,
                         "group": 7,
                         "groupParent": 0
                     }, {
                         "ids": null,
                         "id": 106,
                         "description": "E1 cable problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 20,
                         "groupParent": 9
                     }, {
                         "ids": null,
                         "id": 105,
                         "description": "E1 connector problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 20,
                         "groupParent": 9
                     }, {
                         "ids": null,
                         "id": 101,
                         "description": "E1 problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 20,
                         "groupParent": 9
                     }, {
                         "ids": null,
                         "id": 217,
                         "description": "Ethernet port problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 27,
                         "groupParent": 18
                     }, {
                         "ids": null,
                         "id": 183,
                         "description": "Ethernet port problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 25,
                         "groupParent": 16
                     }, {
                         "ids": null,
                         "id": 199,
                         "description": "Ethernet port problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 26,
                         "groupParent": 17
                     }, {
                         "ids": null,
                         "id": 218,
                         "description": "Fiber connector problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 27,
                         "groupParent": 18
                     }, {
                         "ids": null,
                         "id": 202,
                         "description": "Fiber connector problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 26,
                         "groupParent": 17
                     }, {
                         "ids": null,
                         "id": 110,
                         "description": "Fiber connector problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 20,
                         "groupParent": 9
                     }, {
                         "ids": null,
                         "id": 200,
                         "description": "Fiber cut",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 26,
                         "groupParent": 17
                     }, {
                         "ids": null,
                         "id": 135,
                         "description": "Fiber cut both side",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 21,
                         "groupParent": 10
                     }, {
                         "ids": null,
                         "id": 96,
                         "description": "Fiber cut both side",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 20,
                         "groupParent": 9
                     }, {
                         "ids": null,
                         "id": 100,
                         "description": "Fiber cut one side but ring can't switch(equipment problem)",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 20,
                         "groupParent": 9
                     }, {
                         "ids": null,
                         "id": 95,
                         "description": "Fiber cut one side linear",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 20,
                         "groupParent": 9
                     }, {
                         "ids": null,
                         "id": 136,
                         "description": "Fiber cut ring can't switch(equipment problem)",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 21,
                         "groupParent": 10
                     }, {
                         "ids": null,
                         "id": 120,
                         "description": "Fiber high loss",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 20,
                         "groupParent": 9
                     }, {
                         "ids": null,
                         "id": 201,
                         "description": "Fiber high loss",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 26,
                         "groupParent": 17
                     }, {
                         "ids": null,
                         "id": 134,
                         "description": "Fiber high loss and fiber cut",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 21,
                         "groupParent": 10
                     }, {
                         "ids": null,
                         "id": 133,
                         "description": "Fiber high loss both side",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 21,
                         "groupParent": 10
                     }, {
                         "ids": null,
                         "id": 97,
                         "description": "Fiber high loss both side",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 20,
                         "groupParent": 9
                     }, {
                         "ids": null,
                         "id": 98,
                         "description": "Fiber high loss one side and fiber cut other site",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 20,
                         "groupParent": 9
                     }, {
                         "ids": null,
                         "id": 99,
                         "description": "Fiber high loss one side but ring can't switch(equipment problem)",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 20,
                         "groupParent": 9
                     }, {
                         "ids": null,
                         "id": 45,
                         "description": "Fiber optic",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 2,
                         "group": 12,
                         "groupParent": 5
                     }, {
                         "ids": null,
                         "id": 111,
                         "description": "Fiber patch cord problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 20,
                         "groupParent": 9
                     }, {
                         "ids": null,
                         "id": 213,
                         "description": "Fiber patch cord problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 26,
                         "groupParent": 17
                     }, {
                         "ids": null,
                         "id": 228,
                         "description": "Fiber patch cord problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 27,
                         "groupParent": 18
                     }, {
                         "ids": null,
                         "id": 91,
                         "description": "Firewall - Fotigate",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 18,
                         "groupParent": 8
                     }, {
                         "ids": null,
                         "id": 192,
                         "description": "Grouding problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 25,
                         "groupParent": 16
                     }, {
                         "ids": null,
                         "id": 174,
                         "description": "Grouding system",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 24,
                         "groupParent": 15
                     }, {
                         "ids": null,
                         "id": 223,
                         "description": "Grounding problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 27,
                         "groupParent": 18
                     }, {
                         "ids": null,
                         "id": 207,
                         "description": "Grounding problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 26,
                         "groupParent": 17
                     }, {
                         "ids": null,
                         "id": 117,
                         "description": "Grounding problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 20,
                         "groupParent": 9
                     }, {
                         "ids": null,
                         "id": 216,
                         "description": "Hard reset",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 27,
                         "groupParent": 18
                     }, {
                         "ids": null,
                         "id": 121,
                         "description": "Hard reset",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 20,
                         "groupParent": 9
                     }, {
                         "ids": null,
                         "id": 197,
                         "description": "Hard reset",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 26,
                         "groupParent": 17
                     }, {
                         "ids": null,
                         "id": 181,
                         "description": "Hard reset",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 25,
                         "groupParent": 16
                     }, {
                         "ids": null,
                         "id": 158,
                         "description": "Hard reset AP",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 24,
                         "groupParent": 15
                     }, {
                         "ids": null,
                         "id": 159,
                         "description": "Hard reset SM",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 24,
                         "groupParent": 15
                     }, {
                         "ids": null,
                         "id": 125,
                         "description": "Hard reset card",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 21,
                         "groupParent": 10
                     }, {
                         "ids": null,
                         "id": 222,
                         "description": "Human error",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 27,
                         "groupParent": 18
                     }, {
                         "ids": null,
                         "id": 176,
                         "description": "Human error",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 24,
                         "groupParent": 15
                     }, {
                         "ids": null,
                         "id": 137,
                         "description": "Human error",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 21,
                         "groupParent": 10
                     }, {
                         "ids": null,
                         "id": 191,
                         "description": "Human error",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 25,
                         "groupParent": 16
                     }, {
                         "ids": null,
                         "id": 206,
                         "description": "Human error",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 26,
                         "groupParent": 17
                     }, {
                         "ids": null,
                         "id": 116,
                         "description": "Human error",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 20,
                         "groupParent": 9
                     }, {
                         "ids": null,
                         "id": 148,
                         "description": "Human error",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 22,
                         "groupParent": 11
                     }, {
                         "ids": null,
                         "id": 38,
                         "description": "IIG network",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 2,
                         "group": 10,
                         "groupParent": 3
                     }, {
                         "ids": null,
                         "id": 35,
                         "description": "IPCBB network",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 2,
                         "group": 10,
                         "groupParent": 3
                     }, {
                         "ids": null,
                         "id": 31,
                         "description": "IPRAN",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 2,
                         "group": 9,
                         "groupParent": 2
                     }, {
                         "ids": null,
                         "id": 36,
                         "description": "IPTN network",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 2,
                         "group": 10,
                         "groupParent": 3
                     }, {
                         "ids": null,
                         "id": 40,
                         "description": "ISP router",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 2,
                         "group": 10,
                         "groupParent": 3
                     }, {
                         "ids": null,
                         "id": 172,
                         "description": "Interference problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 24,
                         "groupParent": 15
                     }, {
                         "ids": null,
                         "id": 154,
                         "description": "Internet link problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 23,
                         "groupParent": 14
                     }, {
                         "ids": null,
                         "id": 210,
                         "description": "L2 Broadcast problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 26,
                         "groupParent": 17
                     }, {
                         "ids": null,
                         "id": 194,
                         "description": "L2 Broadcast problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 25,
                         "groupParent": 16
                     }, {
                         "ids": null,
                         "id": 178,
                         "description": "L2 Broadcast problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 24,
                         "groupParent": 15
                     }, {
                         "ids": null,
                         "id": 34,
                         "description": "L2 connect with IPRAN at BTS",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 2,
                         "group": 9,
                         "groupParent": 2
                     }, {
                         "ids": null,
                         "id": 80,
                         "description": "L2(last mile) - BDCOM",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 17,
                         "groupParent": 8
                     }, {
                         "ids": null,
                         "id": 257,
                         "description": "L2(last mile) - Cisco SG300",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 17,
                         "groupParent": 8
                     }, {
                         "ids": null,
                         "id": 78,
                         "description": "L2(last mile) - HUAWEI S3328",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 17,
                         "groupParent": 8
                     }, {
                         "ids": null,
                         "id": 79,
                         "description": "L2(last mile) - HUAWEI S3900",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 17,
                         "groupParent": 8
                     }, {
                         "ids": null,
                         "id": 256,
                         "description": "L2(last mile) - HUAWEI S5700",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 17,
                         "groupParent": 8
                     }, {
                         "ids": null,
                         "id": 81,
                         "description": "L2(last mile) - Reascom",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 17,
                         "groupParent": 8
                     }, {
                         "ids": null,
                         "id": 108,
                         "description": "LAN cable problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 20,
                         "groupParent": 9
                     }, {
                         "ids": null,
                         "id": 107,
                         "description": "LAN connector problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 20,
                         "groupParent": 9
                     }, {
                         "ids": null,
                         "id": 127,
                         "description": "LAN connector problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 21,
                         "groupParent": 10
                     }, {
                         "ids": null,
                         "id": 1,
                         "description": "Last mile network - link down",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 1,
                         "group": 1,
                         "groupParent": 0
                     }, {
                         "ids": null,
                         "id": 3,
                         "description": "Last mile network - link speed problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 1,
                         "group": 1,
                         "groupParent": 0
                     }, {
                         "ids": null,
                         "id": 2,
                         "description": "Last mile network - link unstable",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 1,
                         "group": 1,
                         "groupParent": 0
                     }, {
                         "ids": null,
                         "id": 261,
                         "description": "Lease line 3BB problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 19,
                         "groupParent": 8
                     }, {
                         "ids": null,
                         "id": 93,
                         "description": "Lease line CAT problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 19,
                         "groupParent": 8
                     }, {
                         "ids": null,
                         "id": 262,
                         "description": "Lease line Symphony problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 19,
                         "groupParent": 8
                     }, {
                         "ids": null,
                         "id": 92,
                         "description": "Lease line TOT problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 19,
                         "groupParent": 8
                     }, {
                         "ids": null,
                         "id": 260,
                         "description": "Lease line TRUE problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 19,
                         "groupParent": 8
                     }, {
                         "ids": null,
                         "id": 94,
                         "description": "Lease line UIH problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 19,
                         "groupParent": 8
                     }, {
                         "ids": null,
                         "id": 44,
                         "description": "MSC",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 2,
                         "group": 11,
                         "groupParent": 4
                     }, {
                         "ids": null,
                         "id": 47,
                         "description": "MSC",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 2,
                         "group": 12,
                         "groupParent": 5
                     }, {
                         "ids": null,
                         "id": 151,
                         "description": "Mail GW problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 23,
                         "groupParent": 14
                     }, {
                         "ids": null,
                         "id": 152,
                         "description": "Mail Hosting problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 23,
                         "groupParent": 14
                     }, {
                         "ids": null,
                         "id": 77,
                         "description": "Modem - COMET",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 16,
                         "groupParent": 8
                     }, {
                         "ids": null,
                         "id": 76,
                         "description": "Modem - Loop",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 16,
                         "groupParent": 8
                     }, {
                         "ids": null,
                         "id": 75,
                         "description": "Modem - Procend",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 16,
                         "groupParent": 8
                     }, {
                         "ids": null,
                         "id": 74,
                         "description": "Modem - RAD",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 16,
                         "groupParent": 8
                     }, {
                         "ids": null,
                         "id": 246,
                         "description": "Modem - Watson 5",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 16,
                         "groupParent": 8
                     }, {
                         "ids": null,
                         "id": 39,
                         "description": "NIX network",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 2,
                         "group": 10,
                         "groupParent": 3
                     }, {
                         "ids": null,
                         "id": 139,
                         "description": "Node reboot",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 21,
                         "groupParent": 10
                     }, {
                         "ids": null,
                         "id": 173,
                         "description": "Obstacle",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 24,
                         "groupParent": 15
                     }, {
                         "ids": null,
                         "id": 129,
                         "description": "Optical connect problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 21,
                         "groupParent": 10
                     }, {
                         "ids": null,
                         "id": 128,
                         "description": "Optical patch cord problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 21,
                         "groupParent": 10
                     }, {
                         "ids": null,
                         "id": 247,
                         "description": "POE Switch - TOUGH switch",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 17,
                         "groupParent": 8
                     }, {
                         "ids": null,
                         "id": 258,
                         "description": "POE switch - TOUGH switch Ubiquiti",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 17,
                         "groupParent": 8
                     }, {
                         "ids": null,
                         "id": 225,
                         "description": "Port half problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 27,
                         "groupParent": 18
                     }, {
                         "ids": null,
                         "id": 177,
                         "description": "Port half problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 24,
                         "groupParent": 15
                     }, {
                         "ids": null,
                         "id": 113,
                         "description": "Port half problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 20,
                         "groupParent": 9
                     }, {
                         "ids": null,
                         "id": 209,
                         "description": "Port half problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 26,
                         "groupParent": 17
                     }, {
                         "ids": null,
                         "id": 193,
                         "description": "Port half problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 25,
                         "groupParent": 16
                     }, {
                         "ids": null,
                         "id": 10,
                         "description": "Power outage - link down",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 1,
                         "group": 4,
                         "groupParent": 0
                     }, {
                         "ids": null,
                         "id": 12,
                         "description": "Power outage - link speed problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 1,
                         "group": 4,
                         "groupParent": 0
                     }, {
                         "ids": null,
                         "id": 11,
                         "description": "Power outage - link unstable",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 1,
                         "group": 4,
                         "groupParent": 0
                     }, {
                         "ids": null,
                         "id": 21,
                         "description": "Problem at BTS side(with air condition)",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 2,
                         "group": 8,
                         "groupParent": 1
                     }, {
                         "ids": null,
                         "id": 20,
                         "description": "Problem at BTS side(with out air condition)",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 2,
                         "group": 8,
                         "groupParent": 1
                     }, {
                         "ids": null,
                         "id": 26,
                         "description": "Problem at both side(with air condition and with UPS)",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 2,
                         "group": 8,
                         "groupParent": 1
                     }, {
                         "ids": null,
                         "id": 29,
                         "description": "Problem at both side(with air condition and with out UPS)",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 2,
                         "group": 8,
                         "groupParent": 1
                     }, {
                         "ids": null,
                         "id": 27,
                         "description": "Problem at both side(with out air condition and with UPS)",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 2,
                         "group": 8,
                         "groupParent": 1
                     }, {
                         "ids": null,
                         "id": 28,
                         "description": "Problem at both side(with out air condition and with out UPS)",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 2,
                         "group": 8,
                         "groupParent": 1
                     }, {
                         "ids": null,
                         "id": 22,
                         "description": "Problem at customer side(with air condition and with UPS)",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 2,
                         "group": 8,
                         "groupParent": 1
                     }, {
                         "ids": null,
                         "id": 24,
                         "description": "Problem at customer side(with air condition and with out UPS)",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 2,
                         "group": 8,
                         "groupParent": 1
                     }, {
                         "ids": null,
                         "id": 25,
                         "description": "Problem at customer side(with out air condition and with UPS)",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 2,
                         "group": 8,
                         "groupParent": 1
                     }, {
                         "ids": null,
                         "id": 23,
                         "description": "Problem at customer side(with out air condition and with out UPS)",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 2,
                         "group": 8,
                         "groupParent": 1
                     }, {
                         "ids": null,
                         "id": 145,
                         "description": "Rectifier module fail",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 22,
                         "groupParent": 11
                     }, {
                         "ids": null,
                         "id": 119,
                         "description": "Remote reset",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 20,
                         "groupParent": 9
                     }, {
                         "ids": null,
                         "id": 180,
                         "description": "Remote reset",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 25,
                         "groupParent": 16
                     }, {
                         "ids": null,
                         "id": 196,
                         "description": "Remote reset",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 26,
                         "groupParent": 17
                     }, {
                         "ids": null,
                         "id": 215,
                         "description": "Remote reset",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 27,
                         "groupParent": 18
                     }, {
                         "ids": null,
                         "id": 156,
                         "description": "Remote reset AP",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 24,
                         "groupParent": 15
                     }, {
                         "ids": null,
                         "id": 157,
                         "description": "Remote reset SM",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 24,
                         "groupParent": 15
                     }, {
                         "ids": null,
                         "id": 124,
                         "description": "Remote reset card",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 21,
                         "groupParent": 10
                     }, {
                         "ids": null,
                         "id": 164,
                         "description": "Replace AC POE adaptor",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 24,
                         "groupParent": 15
                     }, {
                         "ids": null,
                         "id": 185,
                         "description": "Replace AC adaptor for MODEM",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 25,
                         "groupParent": 16
                     }, {
                         "ids": null,
                         "id": 160,
                         "description": "Replace AP",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 24,
                         "groupParent": 15
                     }, {
                         "ids": null,
                         "id": 165,
                         "description": "Replace DC POE adaptor",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 24,
                         "groupParent": 15
                     }, {
                         "ids": null,
                         "id": 198,
                         "description": "Replace L2",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 26,
                         "groupParent": 17
                     }, {
                         "ids": null,
                         "id": 169,
                         "description": "Replace LAN Connector indoor",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 24,
                         "groupParent": 15
                     }, {
                         "ids": null,
                         "id": 170,
                         "description": "Replace LAN Connector outdoor",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 24,
                         "groupParent": 15
                     }, {
                         "ids": null,
                         "id": 211,
                         "description": "Replace LAN cable",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 26,
                         "groupParent": 17
                     }, {
                         "ids": null,
                         "id": 226,
                         "description": "Replace LAN cable",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 27,
                         "groupParent": 18
                     }, {
                         "ids": null,
                         "id": 186,
                         "description": "Replace LAN cable",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 25,
                         "groupParent": 16
                     }, {
                         "ids": null,
                         "id": 187,
                         "description": "Replace LAN connector",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 25,
                         "groupParent": 16
                     }, {
                         "ids": null,
                         "id": 227,
                         "description": "Replace LAN connector",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 27,
                         "groupParent": 18
                     }, {
                         "ids": null,
                         "id": 212,
                         "description": "Replace LAN connector",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 26,
                         "groupParent": 17
                     }, {
                         "ids": null,
                         "id": 182,
                         "description": "Replace Modem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 25,
                         "groupParent": 16
                     }, {
                         "ids": null,
                         "id": 162,
                         "description": "Replace POE",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 24,
                         "groupParent": 15
                     }, {
                         "ids": null,
                         "id": 163,
                         "description": "Replace Point to Multi point Antenna",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 24,
                         "groupParent": 15
                     }, {
                         "ids": null,
                         "id": 161,
                         "description": "Replace SM",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 24,
                         "groupParent": 15
                     }, {
                         "ids": null,
                         "id": 104,
                         "description": "Replace box",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 20,
                         "groupParent": 9
                     }, {
                         "ids": null,
                         "id": 126,
                         "description": "Replace card",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 21,
                         "groupParent": 10
                     }, {
                         "ids": null,
                         "id": 103,
                         "description": "Replace card",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 20,
                         "groupParent": 9
                     }, {
                         "ids": null,
                         "id": 167,
                         "description": "Replace indoor LAN cable",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 24,
                         "groupParent": 15
                     }, {
                         "ids": null,
                         "id": 168,
                         "description": "Replace outdoor LAN cable",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 24,
                         "groupParent": 15
                     }, {
                         "ids": null,
                         "id": 166,
                         "description": "Replace surge protector",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 24,
                         "groupParent": 15
                     }, {
                         "ids": null,
                         "id": 184,
                         "description": "Replace surge protector",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 25,
                         "groupParent": 16
                     }, {
                         "ids": null,
                         "id": 89,
                         "description": "Router - CISCO 1800",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 18,
                         "groupParent": 8
                     }, {
                         "ids": null,
                         "id": 88,
                         "description": "Router - CISCO 1921",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 18,
                         "groupParent": 8
                     }, {
                         "ids": null,
                         "id": 259,
                         "description": "Router - HUAWEI 3G AR207",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 18,
                         "groupParent": 8
                     }, {
                         "ids": null,
                         "id": 250,
                         "description": "Router - HUAWEI AR207",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 18,
                         "groupParent": 8
                     }, {
                         "ids": null,
                         "id": 90,
                         "description": "Router - Mikrotik",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 18,
                         "groupParent": 8
                     }, {
                         "ids": null,
                         "id": 140,
                         "description": "Routing problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 21,
                         "groupParent": 10
                     }, {
                         "ids": null,
                         "id": 30,
                         "description": "SDH Transmission",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 2,
                         "group": 9,
                         "groupParent": 2
                     }, {
                         "ids": null,
                         "id": 219,
                         "description": "SFP problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 27,
                         "groupParent": 18
                     }, {
                         "ids": null,
                         "id": 203,
                         "description": "SFP problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 26,
                         "groupParent": 17
                     }, {
                         "ids": null,
                         "id": 130,
                         "description": "SFP problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 21,
                         "groupParent": 10
                     }, {
                         "ids": null,
                         "id": 109,
                         "description": "SFP problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 20,
                         "groupParent": 9
                     }, {
                         "ids": null,
                         "id": 102,
                         "description": "STM-1 port problem",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 20,
                         "groupParent": 9
                     }, {
                         "ids": null,
                         "id": 255,
                         "description": "Switch - BDCOM",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 44,
                         "groupParent": 8
                     }, {
                         "ids": null,
                         "id": 253,
                         "description": "Switch - Cisco SG300",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 44,
                         "groupParent": 8
                     }, {
                         "ids": null,
                         "id": 251,
                         "description": "Switch - HUAWEI S3328",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 44,
                         "groupParent": 8
                     }, {
                         "ids": null,
                         "id": 252,
                         "description": "Switch - HUAWEI S5700",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 44,
                         "groupParent": 8
                     }, {
                         "ids": null,
                         "id": 254,
                         "description": "Switch - Raisecom",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 44,
                         "groupParent": 8
                     }, {
                         "ids": null,
                         "id": 146,
                         "description": "UPS fail",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 22,
                         "groupParent": 11
                     }, {
                         "ids": null,
                         "id": 249,
                         "description": "WIFI Point to Multi Point - RADWIN",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 15,
                         "groupParent": 8
                     }, {
                         "ids": null,
                         "id": 69,
                         "description": "WIFI Point to Multi Point - Ubiquity Rocket M5",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 15,
                         "groupParent": 8
                     }, {
                         "ids": null,
                         "id": 65,
                         "description": "WIFI Point to Point - Hairis",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 15,
                         "groupParent": 8
                     }, {
                         "ids": null,
                         "id": 64,
                         "description": "WIFI Point to Point - MIMOTECH",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 15,
                         "groupParent": 8
                     }, {
                         "ids": null,
                         "id": 248,
                         "description": "WIFI Point to Point - RADWIN",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 15,
                         "groupParent": 8
                     }, {
                         "ids": null,
                         "id": 62,
                         "description": "WIFI Point to Point - Ubiquity Power Bridge M5",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 15,
                         "groupParent": 8
                     }, {
                         "ids": null,
                         "id": 67,
                         "description": "WIFI Point to Point - Winlink 1000 access",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 15,
                         "groupParent": 8
                     }, {
                         "ids": null,
                         "id": 66,
                         "description": "WIFI Point to Point - Wittelcom",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 15,
                         "groupParent": 8
                     }, {
                         "ids": null,
                         "id": 48,
                         "description": "fail",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 2,
                         "group": 13,
                         "groupParent": 6
                     }, {
                         "ids": null,
                         "id": 123,
                         "description": "lightning",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 20,
                         "groupParent": 9
                     }, {
                         "ids": null,
                         "id": 141,
                         "description": "lightning",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 21,
                         "groupParent": 10
                     }, {
                         "ids": null,
                         "id": 150,
                         "description": "lightning",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 22,
                         "groupParent": 11
                     }, {
                         "ids": null,
                         "id": 229,
                         "description": "lightning",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 27,
                         "groupParent": 18
                     }, {
                         "ids": null,
                         "id": 195,
                         "description": "lightning",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 25,
                         "groupParent": 16
                     }, {
                         "ids": null,
                         "id": 214,
                         "description": "lightning",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 26,
                         "groupParent": 17
                     }, {
                         "ids": null,
                         "id": 179,
                         "description": "lightning",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 4,
                         "group": 24,
                         "groupParent": 15
                     }, {
                         "ids": null,
                         "id": 138,
                         "description": "power outage",
                         "status": "A",
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "rownum": null,
                         "priority": null,
                         "level": 3,
                         "group": 21,
                         "groupParent": 10
                     }],
                     "version": "1"
                 };
                 localStorage.setItem("problemCauseMultiData", JSON.stringify(response));
             } else {
                 $.ajax({ //using jsfiddle's echo service to simulate remote data loading
                     type: "POST",
                     timeout: 180000,
                     url: app.configService.serviceUrl + 'post-json.service?s=master-service&o=getProblemCauseMulti.json',
                     data: JSON.stringify({
                         "token": localStorage.getItem("token"),
                         "version": "2"
                     }),
                     async: true,
                     dataType: "json",
                     contentType: 'application/json',
                     success: function(response) {
                         //store response
                         localStorage.setItem("problemCauseMultiData", JSON.stringify(response));
                         ////console.log(JSON.stringify(response));
                         ////console.log("fetch Problem Cause Multi : Complete");
                     },
                     error: function(xhr, error) {
                         if (!app.ajaxHandlerService.error(xhr, error)) {
                             var cache = localStorage.getItem("problemCauseMultiData");

                             if (cache == null || cache == undefined) {
                                 ////console.log("Get Master Problem Cause Multi failed");
                                 ////console.log(xhr);
                                 ////console.log(error);
                                 navigator.notification.alert(xhr.status + error,
                                     function() {}, "Get Master Problem Cause Multi failed", 'OK');
                             }
                         }
                         return;
                     }
                 });
             }

         },
         loadProblemSolve: function() {
             var that = this;
             var ProblemSolves = null;
             if (app.configService.isMorkupData) {
                 var response = {
                     "problemSolves": [{
                         "id": "001",
                         "subproblemCauseId": "113",
                         "subProblemCauseDesc": "2M link problem",
                         "description": "Change 2M position",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "Y",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "003",
                         "subproblemCauseId": "113",
                         "subProblemCauseDesc": "2M link problem",
                         "description": "Change Connector",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "106",
                         "subproblemCauseId": "113",
                         "subProblemCauseDesc": "2M link problem",
                         "description": "Connector loose(Re-connect)",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "004",
                         "subproblemCauseId": "113",
                         "subProblemCauseDesc": "2M link problem",
                         "description": "Install new tie Cable",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "002",
                         "subproblemCauseId": "113",
                         "subProblemCauseDesc": "2M link problem",
                         "description": "Inter operator link fail",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "115",
                         "subproblemCauseId": "113",
                         "subProblemCauseDesc": "2M link problem",
                         "description": "Permanent",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "005",
                         "subproblemCauseId": "113",
                         "subProblemCauseDesc": "2M link problem",
                         "description": "Replace unit",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "Y",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "114",
                         "subproblemCauseId": "113",
                         "subProblemCauseDesc": "2M link problem",
                         "description": "Temporary",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "103",
                         "subproblemCauseId": "125",
                         "subProblemCauseDesc": "Control bus or data bus problem",
                         "description": "Change bus cable",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "102",
                         "subproblemCauseId": "125",
                         "subProblemCauseDesc": "Control bus or data bus problem",
                         "description": "Re connect bus cable",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "104",
                         "subproblemCauseId": "126",
                         "subProblemCauseDesc": "DWDM Hardware or equipment fail",
                         "description": "Replace unit",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "Y",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "105",
                         "subproblemCauseId": "126",
                         "subProblemCauseDesc": "DWDM Hardware or equipment fail",
                         "description": "Reset unit",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "Y",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "047",
                         "subproblemCauseId": "119",
                         "subProblemCauseDesc": "Facility problem",
                         "description": "Air condition system",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "046",
                         "subproblemCauseId": "119",
                         "subProblemCauseDesc": "Facility problem",
                         "description": "Ground system",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "048",
                         "subproblemCauseId": "119",
                         "subProblemCauseDesc": "Facility problem",
                         "description": "Rectifier or Power system",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "050",
                         "subproblemCauseId": "119",
                         "subProblemCauseDesc": "Facility problem",
                         "description": "Turn on AC breaker",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "049",
                         "subproblemCauseId": "119",
                         "subProblemCauseDesc": "Facility problem",
                         "description": "Turn on DC breaker",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "025",
                         "subproblemCauseId": "116",
                         "subProblemCauseDesc": "Fiber Cut",
                         "description": "Change fiber to core spare",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "Y",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "023",
                         "subproblemCauseId": "116",
                         "subProblemCauseDesc": "Fiber Cut",
                         "description": "Change optical patch cord",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "022",
                         "subproblemCauseId": "116",
                         "subProblemCauseDesc": "Fiber Cut",
                         "description": "Clean fiber connector",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "028",
                         "subproblemCauseId": "116",
                         "subProblemCauseDesc": "Fiber Cut",
                         "description": "Clear laser shutdown",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "029",
                         "subproblemCauseId": "116",
                         "subProblemCauseDesc": "Fiber Cut",
                         "description": "Clear reflection alarm",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "117",
                         "subproblemCauseId": "116",
                         "subProblemCauseDesc": "Fiber Cut",
                         "description": "Permanent",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "024",
                         "subproblemCauseId": "116",
                         "subProblemCauseDesc": "Fiber Cut",
                         "description": "Remove fix attenuator",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "018",
                         "subproblemCauseId": "116",
                         "subProblemCauseDesc": "Fiber Cut",
                         "description": "Repair outside cable/ Accident",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "020",
                         "subproblemCauseId": "116",
                         "subProblemCauseDesc": "Fiber Cut",
                         "description": "Repair outside cable/ Animal",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "021",
                         "subproblemCauseId": "116",
                         "subProblemCauseDesc": "Fiber Cut",
                         "description": "Repair outside cable/ Diaster",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "019",
                         "subproblemCauseId": "116",
                         "subProblemCauseDesc": "Fiber Cut",
                         "description": "Repair outside cable/ Human",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "116",
                         "subproblemCauseId": "116",
                         "subProblemCauseDesc": "Fiber Cut",
                         "description": "Temporary",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "027",
                         "subproblemCauseId": "116",
                         "subProblemCauseDesc": "Fiber Cut",
                         "description": "Turn on AC breaker",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "026",
                         "subproblemCauseId": "116",
                         "subProblemCauseDesc": "Fiber Cut",
                         "description": "Turn on DC breaker",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "015",
                         "subproblemCauseId": "115",
                         "subProblemCauseDesc": "Fiber high loss or over spec",
                         "description": "Add fix attenuator",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "013",
                         "subproblemCauseId": "115",
                         "subProblemCauseDesc": "Fiber high loss or over spec",
                         "description": "Change fiber to core spare",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "Y",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "012",
                         "subproblemCauseId": "115",
                         "subProblemCauseDesc": "Fiber high loss or over spec",
                         "description": "Change opitcal patch cord",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "011",
                         "subproblemCauseId": "115",
                         "subProblemCauseDesc": "Fiber high loss or over spec",
                         "description": "Clean fiber connector",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "119",
                         "subproblemCauseId": "115",
                         "subProblemCauseDesc": "Fiber high loss or over spec",
                         "description": "Permanent",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "014",
                         "subproblemCauseId": "115",
                         "subProblemCauseDesc": "Fiber high loss or over spec",
                         "description": "Remove fix attenuator",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "016",
                         "subproblemCauseId": "115",
                         "subProblemCauseDesc": "Fiber high loss or over spec",
                         "description": "Repair outside cable/ cable crack",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "017",
                         "subproblemCauseId": "115",
                         "subProblemCauseDesc": "Fiber high loss or over spec",
                         "description": "Repair outside cable/ high loss spice point",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "118",
                         "subproblemCauseId": "115",
                         "subProblemCauseDesc": "Fiber high loss or over spec",
                         "description": "Temporary",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "056",
                         "subproblemCauseId": "120",
                         "subProblemCauseDesc": "HDSL problem",
                         "description": "Change 2M Connector",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "108",
                         "subproblemCauseId": "120",
                         "subProblemCauseDesc": "HDSL problem",
                         "description": "Change 2M position",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "055",
                         "subproblemCauseId": "120",
                         "subProblemCauseDesc": "HDSL problem",
                         "description": "Change drop wire",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "107",
                         "subproblemCauseId": "120",
                         "subProblemCauseDesc": "HDSL problem",
                         "description": "Connector loose(Re-connect)",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "121",
                         "subproblemCauseId": "120",
                         "subProblemCauseDesc": "HDSL problem",
                         "description": "Permanent",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "051",
                         "subproblemCauseId": "120",
                         "subProblemCauseDesc": "HDSL problem",
                         "description": "Replace HDSL unit",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "Y",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "052",
                         "subproblemCauseId": "120",
                         "subProblemCauseDesc": "HDSL problem",
                         "description": "Reset HDSL unit",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "Y",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "120",
                         "subproblemCauseId": "120",
                         "subProblemCauseDesc": "HDSL problem",
                         "description": "Temporary",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "054",
                         "subproblemCauseId": "120",
                         "subProblemCauseDesc": "HDSL problem",
                         "description": "Turn on AC breaker",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "053",
                         "subproblemCauseId": "120",
                         "subProblemCauseDesc": "HDSL problem",
                         "description": "Turn on DC breaker",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "074",
                         "subproblemCauseId": "123",
                         "subProblemCauseDesc": "Huawei Loss communication",
                         "description": "Change 2M position",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "Y",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "085",
                         "subproblemCauseId": "123",
                         "subProblemCauseDesc": "Huawei Loss communication",
                         "description": "Change IP address",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "Y",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "077",
                         "subproblemCauseId": "123",
                         "subProblemCauseDesc": "Huawei Loss communication",
                         "description": "Change LAN Cable",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "086",
                         "subproblemCauseId": "123",
                         "subProblemCauseDesc": "Huawei Loss communication",
                         "description": "Change NSAP",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "Y",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "109",
                         "subproblemCauseId": "123",
                         "subProblemCauseDesc": "Huawei Loss communication",
                         "description": "Connector loose(Re-connect)",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "084",
                         "subproblemCauseId": "123",
                         "subProblemCauseDesc": "Huawei Loss communication",
                         "description": "Inter operator link fail",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "123",
                         "subproblemCauseId": "123",
                         "subProblemCauseDesc": "Huawei Loss communication",
                         "description": "Permanent",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "082",
                         "subproblemCauseId": "123",
                         "subProblemCauseDesc": "Huawei Loss communication",
                         "description": "Replace L2/L3 switch",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "081",
                         "subproblemCauseId": "123",
                         "subProblemCauseDesc": "Huawei Loss communication",
                         "description": "Replace controller unit",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "Y",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "083",
                         "subproblemCauseId": "123",
                         "subProblemCauseDesc": "Huawei Loss communication",
                         "description": "Replace hub",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "079",
                         "subproblemCauseId": "123",
                         "subProblemCauseDesc": "Huawei Loss communication",
                         "description": "Replace modem or transciever",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "087",
                         "subproblemCauseId": "123",
                         "subProblemCauseDesc": "Huawei Loss communication",
                         "description": "Replace router",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "080",
                         "subproblemCauseId": "123",
                         "subProblemCauseDesc": "Huawei Loss communication",
                         "description": "Reset controller unit",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "Y",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "078",
                         "subproblemCauseId": "123",
                         "subProblemCauseDesc": "Huawei Loss communication",
                         "description": "Reset modem or transciever",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "122",
                         "subproblemCauseId": "123",
                         "subProblemCauseDesc": "Huawei Loss communication",
                         "description": "Temporary",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "076",
                         "subproblemCauseId": "123",
                         "subProblemCauseDesc": "Huawei Loss communication",
                         "description": "Turn on AC breaker",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "075",
                         "subproblemCauseId": "123",
                         "subProblemCauseDesc": "Huawei Loss communication",
                         "description": "Turn on DC breaker",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "064",
                         "subproblemCauseId": "121",
                         "subProblemCauseDesc": "Microwave problem",
                         "description": "Change Transmission line cable",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "063",
                         "subproblemCauseId": "121",
                         "subProblemCauseDesc": "Microwave problem",
                         "description": "Change connector",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "110",
                         "subproblemCauseId": "121",
                         "subProblemCauseDesc": "Microwave problem",
                         "description": "Connector loose(Re-connect)",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "057",
                         "subproblemCauseId": "121",
                         "subProblemCauseDesc": "Microwave problem",
                         "description": "Re aliment antenna dish",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "062",
                         "subproblemCauseId": "121",
                         "subProblemCauseDesc": "Microwave problem",
                         "description": "Rectifier or Power system",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "060",
                         "subproblemCauseId": "121",
                         "subProblemCauseDesc": "Microwave problem",
                         "description": "Replace unit",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "Y",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "061",
                         "subproblemCauseId": "121",
                         "subProblemCauseDesc": "Microwave problem",
                         "description": "Reset unit",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "Y",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "059",
                         "subproblemCauseId": "121",
                         "subProblemCauseDesc": "Microwave problem",
                         "description": "Turn on AC breaker",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "058",
                         "subproblemCauseId": "121",
                         "subProblemCauseDesc": "Microwave problem",
                         "description": "Turn on DC breaker",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "030",
                         "subproblemCauseId": "117",
                         "subProblemCauseDesc": "NEC Association failed",
                         "description": "Change 2M position",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "Y",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "041",
                         "subproblemCauseId": "117",
                         "subProblemCauseDesc": "NEC Association failed",
                         "description": "Change IP address",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "Y",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "033",
                         "subproblemCauseId": "117",
                         "subProblemCauseDesc": "NEC Association failed",
                         "description": "Change LAN Cable",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "042",
                         "subproblemCauseId": "117",
                         "subProblemCauseDesc": "NEC Association failed",
                         "description": "Change NSAP",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "Y",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "111",
                         "subproblemCauseId": "117",
                         "subProblemCauseDesc": "NEC Association failed",
                         "description": "Connector loose(Re-connect)",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "040",
                         "subproblemCauseId": "117",
                         "subProblemCauseDesc": "NEC Association failed",
                         "description": "Inter operator link fail",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "125",
                         "subproblemCauseId": "117",
                         "subProblemCauseDesc": "NEC Association failed",
                         "description": "Permanent",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "038",
                         "subproblemCauseId": "117",
                         "subProblemCauseDesc": "NEC Association failed",
                         "description": "Replace L2/L3 switch",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "037",
                         "subproblemCauseId": "117",
                         "subProblemCauseDesc": "NEC Association failed",
                         "description": "Replace controller unit",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "Y",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "039",
                         "subproblemCauseId": "117",
                         "subProblemCauseDesc": "NEC Association failed",
                         "description": "Replace hub",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "035",
                         "subproblemCauseId": "117",
                         "subProblemCauseDesc": "NEC Association failed",
                         "description": "Replace modem or transciever",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "043",
                         "subproblemCauseId": "117",
                         "subProblemCauseDesc": "NEC Association failed",
                         "description": "Replace router",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "036",
                         "subproblemCauseId": "117",
                         "subProblemCauseDesc": "NEC Association failed",
                         "description": "Reset controller unit",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "Y",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "034",
                         "subproblemCauseId": "117",
                         "subProblemCauseDesc": "NEC Association failed",
                         "description": "Reset modem or transciever",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "124",
                         "subproblemCauseId": "117",
                         "subProblemCauseDesc": "NEC Association failed",
                         "description": "Temporary",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "032",
                         "subproblemCauseId": "117",
                         "subProblemCauseDesc": "NEC Association failed",
                         "description": "Turn on AC breaker",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "031",
                         "subproblemCauseId": "117",
                         "subProblemCauseDesc": "NEC Association failed",
                         "description": "Turn on DC breaker",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "071",
                         "subproblemCauseId": "122",
                         "subProblemCauseDesc": "Optical inteface unit degrade",
                         "description": "Add fix attenuator",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "069",
                         "subproblemCauseId": "122",
                         "subProblemCauseDesc": "Optical inteface unit degrade",
                         "description": "Change fiber to core spare ",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "068",
                         "subproblemCauseId": "122",
                         "subProblemCauseDesc": "Optical inteface unit degrade",
                         "description": "Change opitcal patch cord",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "067",
                         "subproblemCauseId": "122",
                         "subProblemCauseDesc": "Optical inteface unit degrade",
                         "description": "Clean fiber connector",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "070",
                         "subproblemCauseId": "122",
                         "subProblemCauseDesc": "Optical inteface unit degrade",
                         "description": "Remove fix attenuator",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "072",
                         "subproblemCauseId": "122",
                         "subProblemCauseDesc": "Optical inteface unit degrade",
                         "description": "Repair outside cable/ cable crack",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "073",
                         "subproblemCauseId": "122",
                         "subProblemCauseDesc": "Optical inteface unit degrade",
                         "description": "Repair outside cable/ high loss spice point",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "065",
                         "subproblemCauseId": "122",
                         "subProblemCauseDesc": "Optical inteface unit degrade",
                         "description": "Replace unit",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "Y",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "066",
                         "subproblemCauseId": "122",
                         "subProblemCauseDesc": "Optical inteface unit degrade",
                         "description": "Reset unit ",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "Y",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "044",
                         "subproblemCauseId": "118",
                         "subProblemCauseDesc": "SDH MUX hardware or equipment failed",
                         "description": "Replace unit",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "Y",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "045",
                         "subproblemCauseId": "118",
                         "subProblemCauseDesc": "SDH MUX hardware or equipment failed",
                         "description": "Reset unit",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "Y",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "008",
                         "subproblemCauseId": "114",
                         "subProblemCauseDesc": "STM-1/e link problem",
                         "description": "Change Connector",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "007",
                         "subproblemCauseId": "114",
                         "subProblemCauseDesc": "STM-1/e link problem",
                         "description": "Change STM-1/e position",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "Y",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "112",
                         "subproblemCauseId": "114",
                         "subProblemCauseDesc": "STM-1/e link problem",
                         "description": "Connector loose(Re-connect)",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "009",
                         "subproblemCauseId": "114",
                         "subProblemCauseDesc": "STM-1/e link problem",
                         "description": "Install new tie Cable",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "006",
                         "subproblemCauseId": "114",
                         "subProblemCauseDesc": "STM-1/e link problem",
                         "description": "Inter operator link fail",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "127",
                         "subproblemCauseId": "114",
                         "subProblemCauseDesc": "STM-1/e link problem",
                         "description": "Permanent",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "010",
                         "subproblemCauseId": "114",
                         "subProblemCauseDesc": "STM-1/e link problem",
                         "description": "Replace unit",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "Y",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "126",
                         "subproblemCauseId": "114",
                         "subProblemCauseDesc": "STM-1/e link problem",
                         "description": "Temporary",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "088",
                         "subproblemCauseId": "124",
                         "subProblemCauseDesc": "Siemens loss communication",
                         "description": "Change 2M position",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "Y",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "099",
                         "subproblemCauseId": "124",
                         "subProblemCauseDesc": "Siemens loss communication",
                         "description": "Change IP address",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "Y",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "091",
                         "subproblemCauseId": "124",
                         "subProblemCauseDesc": "Siemens loss communication",
                         "description": "Change LAN Cable",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "100",
                         "subproblemCauseId": "124",
                         "subProblemCauseDesc": "Siemens loss communication",
                         "description": "Change NSAP",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "Y",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "113",
                         "subproblemCauseId": "124",
                         "subProblemCauseDesc": "Siemens loss communication",
                         "description": "Connector loose(Re-connect)",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "098",
                         "subproblemCauseId": "124",
                         "subProblemCauseDesc": "Siemens loss communication",
                         "description": "Inter operator link fail",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "129",
                         "subproblemCauseId": "124",
                         "subProblemCauseDesc": "Siemens loss communication",
                         "description": "Permanent",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "096",
                         "subproblemCauseId": "124",
                         "subProblemCauseDesc": "Siemens loss communication",
                         "description": "Replace L2/L3 switch",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "095",
                         "subproblemCauseId": "124",
                         "subProblemCauseDesc": "Siemens loss communication",
                         "description": "Replace controller unit",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "Y",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "097",
                         "subproblemCauseId": "124",
                         "subProblemCauseDesc": "Siemens loss communication",
                         "description": "Replace hub",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "093",
                         "subproblemCauseId": "124",
                         "subProblemCauseDesc": "Siemens loss communication",
                         "description": "Replace modem or transciever",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "101",
                         "subproblemCauseId": "124",
                         "subProblemCauseDesc": "Siemens loss communication",
                         "description": "Replace router",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "094",
                         "subproblemCauseId": "124",
                         "subProblemCauseDesc": "Siemens loss communication",
                         "description": "Reset controller unit",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "Y",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "092",
                         "subproblemCauseId": "124",
                         "subProblemCauseDesc": "Siemens loss communication",
                         "description": "Reset modem or transciever",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "128",
                         "subproblemCauseId": "124",
                         "subProblemCauseDesc": "Siemens loss communication",
                         "description": "Temporary",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "090",
                         "subproblemCauseId": "124",
                         "subProblemCauseDesc": "Siemens loss communication",
                         "description": "Turn on AC breaker",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }, {
                         "id": "089",
                         "subproblemCauseId": "124",
                         "subProblemCauseDesc": "Siemens loss communication",
                         "description": "Turn on DC breaker",
                         "status": null,
                         "createDate": null,
                         "modifyDate": null,
                         "createUserId": null,
                         "modifyUserId": null,
                         "process": "N",
                         "equipRecord": "N",
                         "subproblemCause": null,
                         "priority": null,
                         "problemcauseid": "02",
                         "dupFlag": false
                     }],
                     "version": "1",
                     "problemCauseId": null
                 };
                 localStorage.setItem("problemSolveData", JSON.stringify(response));
             } else {
                 $.ajax({ //using jsfiddle's echo service to simulate remote data loading
                     url: app.configService.serviceUrl + 'post-json.service?s=master-service&o=getProblemSolve.json',
                     data: JSON.stringify({
                         "token": localStorage.getItem("token"),
                         "version": "2"
                     }),
                     async: true,
                     type: "POST",
                     timeout: 180000,
                     dataType: "json",
                     contentType: 'application/json',
                     success: function(response) {
                         //store response
                         localStorage.setItem("problemSolveData", JSON.stringify(response));
                         ////console.log(JSON.stringify(response));
                         ////console.log("fetch Problem Solve : Complete");
                     },
                     error: function(xhr, error) {
                         if (!app.ajaxHandlerService.error(xhr, error)) {
                             var cache = localStorage.getItem("problemSolveData");

                             if (cache == null || cache == undefined) {

                                 ////console.log("Get Master Problem Solve failed");
                                 ////console.log(xhr);
                                 ////console.log(error);
                                 navigator.notification.alert(xhr.status + error,
                                     function() {}, "Get Master Problem Solve failed", 'OK');

                             }
                         }
                         return;
                     }
                 });
             }

         },
         loadMyJB: function() {
             var that = this;
             var myJBs = null;
             console.log("loadjob");
             if (app.configService.isMorkupData) {
                 var response = {
                     "version": "1",
                     "userId": "1192",
                     "jobId": null,
                     "rejectReason": null,
                     "priority": "",
                     "statusId": "",
                     "userName": null,
                     "status": null,
                     "msg": null,
                     "jobs": [{
                         "jobId": "JB14-270183",
                         "title": "AACB-TEST Date ",
                         "assignBy": "1192",
                         "assignByName": "Boonsom Duangjun",
                         "assignTo": "1192",
                         "assignToName": "Boonsom Duangjun",
                         "initiateDate": 1405582920000,
                         "finishDate": 1405625400000,
                         "siteAccessDesc": "AACB(BSCCWT3,MSSSUK1H),41IB(BSCSCH5,MSSSUK1H)",
                         "priorityId": "4",
                         "priorityName": "Critical",
                         "statusId": "03",
                         "status": "Initiate",
                         "systemName": "GSM900(All)",
                         "siteAffect": "AACB(BSCCWT3,MSSSUK1H)",
                         "reportTypeId": null,
                         "report": null,
                         "oldReportDetail": null,
                         "trId": null,
                         "faultAlarmNumber": null,
                         "ttId": "TT14-585944",
                         "reportTypeDesc": null,
                         "waitingReport": null,
                         "latitude": null,
                         "longtitude": null,
                         "cntProblemCause": "0",
                         "cntProblemSolve": "0",
                         "reportType": "01",
                         "cntProcess": "0",
                         "cntProblemSolvePerTemp": "0",
                         "reasonOverdueId": null,
                         "reasonOverdueDesc": null,
                         "groupJob": "TT14-585944"
                     }, {
                         "jobId": "JB14-270185",
                         "title": "DATACOM_BPL-TEETetrewrf ",
                         "assignBy": "701",
                         "assignByName": "Arocha Cheeranoravanich",
                         "assignTo": "1192",
                         "assignToName": "Boonsom Duangjun",
                         "initiateDate": 1405782000000,
                         "finishDate": 1405798200000,
                         "siteAccessDesc": "DATACOM_BPL",
                         "priorityId": "4",
                         "priorityName": "Critical",
                         "statusId": "01",
                         "status": "Assign",
                         "systemName": "GSM900(All),3G900(All),3G2100(All)",
                         "siteAffect": "DATACOM_BPL",
                         "reportTypeId": null,
                         "report": null,
                         "oldReportDetail": null,
                         "trId": null,
                         "faultAlarmNumber": null,
                         "ttId": "TT14-585946",
                         "reportTypeDesc": null,
                         "waitingReport": null,
                         "latitude": null,
                         "longtitude": null,
                         "cntProblemCause": "0",
                         "cntProblemSolve": "0",
                         "reportType": "01",
                         "cntProcess": "0",
                         "cntProblemSolvePerTemp": "0",
                         "reasonOverdueId": null,
                         "reasonOverdueDesc": null,
                         "groupJob": "TT14-585946"
                     }, {
                         "jobId": "JB14-271604",
                         "title": "208WP-Test Alert ",
                         "assignBy": "2803",
                         "assignByName": "Apichart Siriratanaboonchai",
                         "assignTo": "1192",
                         "assignToName": "Boonsom Duangjun",
                         "initiateDate": 1417091160000,
                         "finishDate": 1417188360000,
                         "siteAccessDesc": "208WP(3RNCCWD3H,3MSSCWD1H)",
                         "priorityId": "4",
                         "priorityName": "Critical",
                         "statusId": "05",
                         "status": "Waiting for Report",
                         "systemName": "GSM900(All),3G900(All),3G2100(All),GSM1800",
                         "siteAffect": "208WP(3RNCCWD3H,3MSSCWD1H)",
                         "reportTypeId": "01",
                         "report": null,
                         "oldReportDetail": "On-Site Detail\nReport Last\n\n\n",
                         "trId": null,
                         "faultAlarmNumber": null,
                         "ttId": "TT14-587145",
                         "reportTypeDesc": "Solution Complete",
                         "waitingReport": "Y",
                         "latitude": null,
                         "longtitude": null,
                         "cntProblemCause": "0",
                         "cntProblemSolve": "0",
                         "reportType": "01",
                         "cntProcess": "0",
                         "cntProblemSolvePerTemp": "0",
                         "reasonOverdueId": "11",
                         "reasonOverdueDesc": "เข้าสถานที่ไม่ได้",
                         "groupJob": "TT14-587145"
                     }, {
                         "jobId": "JB14-271643",
                         "title": "ABBN-XXX ",
                         "assignBy": "7478",
                         "assignByName": "Hansa Saensing",
                         "assignTo": "1192",
                         "assignToName": "Boonsom Duangjun",
                         "initiateDate": 1417181100000,
                         "finishDate": 1417191900000,
                         "siteAccessDesc": "ABBN(BSCBPL1,MSCBPL1),11LF(BSCSUK1H,MSSSUK1H),16LF(BSCSUK1H,MSSSUK1H),208W(BSCONT3,MSCONT2)",
                         "priorityId": "4",
                         "priorityName": "Critical",
                         "statusId": "04",
                         "status": "On-Site",
                         "systemName": "GSM900(All),3G900(All)",
                         "siteAffect": "ABBN(BSCBPL1,MSCBPL1)",
                         "reportTypeId": "  ",
                         "report": null,
                         "oldReportDetail": "xxx",
                         "trId": null,
                         "faultAlarmNumber": null,
                         "ttId": "TT14-587164",
                         "reportTypeDesc": null,
                         "waitingReport": null,
                         "latitude": null,
                         "longtitude": null,
                         "cntProblemCause": "0",
                         "cntProblemSolve": "0",
                         "reportType": "01",
                         "cntProcess": "0",
                         "cntProblemSolvePerTemp": "0",
                         "reasonOverdueId": null,
                         "reasonOverdueDesc": null,
                         "groupJob": "TT14-587164"
                     }, {
                         "jobId": "JB15-000879",
                         "title": "100YP:TOT Host[PARTHOST100]-xx ",
                         "assignBy": "7039",
                         "assignByName": "Prasitkarn Piyaburaphacharoen",
                         "assignTo": "1192",
                         "assignToName": "Boonsom Duangjun",
                         "initiateDate": 1422267900000,
                         "finishDate": 1422278700000,
                         "siteAccessDesc": "39SF(BSCSUK1H,MSSSUK1H),3RNCCWD3H",
                         "priorityId": "4",
                         "priorityName": "Critical",
                         "statusId": "02",
                         "status": "Accept",
                         "systemName": "GSM900(All),3G900(All),3G2100(All),GSM1800",
                         "siteAffect": "100YP(3RNCTWA1H,3MSSTWA1H)",
                         "reportTypeId": null,
                         "report": null,
                         "oldReportDetail": null,
                         "trId": null,
                         "faultAlarmNumber": null,
                         "ttId": "TT15-000480",
                         "reportTypeDesc": null,
                         "waitingReport": null,
                         "latitude": null,
                         "longtitude": null,
                         "cntProblemCause": "0",
                         "cntProblemSolve": "0",
                         "reportType": "01",
                         "cntProcess": "0",
                         "cntProblemSolvePerTemp": "0",
                         "reasonOverdueId": null,
                         "reasonOverdueDesc": null,
                         "groupJob": "TT15-000480"
                     }, {
                         "jobId": "JB14-266371",
                         "title": "GPFW-GPFW(BSCSCH6) CELL P RXOTRX-432-0 & 1 | 1A-13 = RF loop test fault | KRC 131 1002/2 ",
                         "assignBy": "7156",
                         "assignByName": "Supreeda Navawongse",
                         "assignTo": "1192",
                         "assignToName": "Boonsom Duangjun",
                         "initiateDate": 1400993340000,
                         "finishDate": 1401029340000,
                         "siteAccessDesc": "GPFW(BSCSCH6,MSCSCH4)",
                         "priorityId": "3",
                         "priorityName": "Major",
                         "statusId": "03",
                         "status": "Initiate",
                         "systemName": "GSM900(All)",
                         "siteAffect": "GPFW(BSCSCH6,MSCSCH4)",
                         "reportTypeId": null,
                         "report": null,
                         "oldReportDetail": null,
                         "trId": null,
                         "faultAlarmNumber": null,
                         "ttId": "TT14-284566",
                         "reportTypeDesc": null,
                         "waitingReport": null,
                         "latitude": null,
                         "longtitude": null,
                         "cntProblemCause": "0",
                         "cntProblemSolve": "0",
                         "reportType": "01",
                         "cntProcess": "0",
                         "cntProblemSolvePerTemp": "0",
                         "reasonOverdueId": null,
                         "reasonOverdueDesc": null,
                         "groupJob": "TT14-284566"
                     }, {
                         "jobId": "JB14-267169",
                         "title": "KPNTP-Continuing HIGH TEMP (T>30) occurred for 45 minutes-1|-|2|-|",
                         "assignBy": "7735",
                         "assignByName": "Sanhapit Phatratipakorn",
                         "assignTo": "1192",
                         "assignToName": "Boonsom Duangjun",
                         "initiateDate": 1401014020000,
                         "finishDate": 1401049980000,
                         "siteAccessDesc": "KPNTP(3RNCBPL3H,3MSSBPL1H)",
                         "priorityId": "3",
                         "priorityName": "Major",
                         "statusId": "05",
                         "status": "Waiting for Report",
                         "systemName": "3G2100(All)",
                         "siteAffect": "KPNTP(3RNCBPL3H,3MSSBPL1H)",
                         "reportTypeId": null,
                         "report": null,
                         "oldReportDetail": null,
                         "trId": null,
                         "faultAlarmNumber": null,
                         "ttId": "TT14-285438",
                         "reportTypeDesc": null,
                         "waitingReport": "Y",
                         "latitude": null,
                         "longtitude": null,
                         "cntProblemCause": "0",
                         "cntProblemSolve": "0",
                         "reportType": "01",
                         "cntProcess": "0",
                         "cntProblemSolvePerTemp": "0",
                         "reasonOverdueId": null,
                         "reasonOverdueDesc": null,
                         "groupJob": "TT14-285438"
                     }, {
                         "jobId": "JB14-268285",
                         "title": "RCWH-RCWH3(BSCST23)_High TCH Drop_please check FOR again ",
                         "assignBy": "40",
                         "assignByName": "Porntep Panchapong",
                         "assignTo": "1192",
                         "assignToName": "Boonsom Duangjun",
                         "initiateDate": 1401071760000,
                         "finishDate": 1401330960000,
                         "siteAccessDesc": "RCWH(BSCST23,MSSTLC1E)",
                         "priorityId": "2",
                         "priorityName": "Minor",
                         "statusId": "02",
                         "status": "Accept",
                         "systemName": "GSM900(All)",
                         "siteAffect": "RCWH(BSCST23,MSSTLC1E)",
                         "reportTypeId": null,
                         "report": null,
                         "oldReportDetail": null,
                         "trId": null,
                         "faultAlarmNumber": null,
                         "ttId": "TT14-143329",
                         "reportTypeDesc": null,
                         "waitingReport": null,
                         "latitude": null,
                         "longtitude": null,
                         "cntProblemCause": "0",
                         "cntProblemSolve": "0",
                         "reportType": "01",
                         "cntProcess": "0",
                         "cntProblemSolvePerTemp": "0",
                         "reasonOverdueId": null,
                         "reasonOverdueDesc": null,
                         "groupJob": "TT14-143329"
                     }, {
                         "jobId": "JB14-270184",
                         "title": "8TLO-gfdgdfgfdgfdg ",
                         "assignBy": "1192",
                         "assignByName": "Boonsom Duangjun",
                         "assignTo": "1192",
                         "assignToName": "Boonsom Duangjun",
                         "initiateDate": 1405583520000,
                         "finishDate": 1405619520000,
                         "siteAccessDesc": "8TLO(BSCSCH2,MSSSMK1)",
                         "priorityId": "3",
                         "priorityName": "Major",
                         "statusId": "04",
                         "status": "On-Site",
                         "systemName": "GSM900(All)",
                         "siteAffect": "8TLO(BSCSCH2,MSSSMK1)",
                         "reportTypeId": null,
                         "report": null,
                         "oldReportDetail": null,
                         "trId": null,
                         "faultAlarmNumber": null,
                         "ttId": "TT14-585945",
                         "reportTypeDesc": null,
                         "waitingReport": null,
                         "latitude": null,
                         "longtitude": null,
                         "cntProblemCause": "0",
                         "cntProblemSolve": "0",
                         "reportType": "01",
                         "cntProcess": "0",
                         "cntProblemSolvePerTemp": "0",
                         "reasonOverdueId": null,
                         "reasonOverdueDesc": null,
                         "groupJob": "TT14-585945"
                     }, {
                         "jobId": "JB14-270684",
                         "title": "RT19-xxxxxxxx ",
                         "assignBy": "7478",
                         "assignByName": "Hansa Saensing",
                         "assignTo": "1192",
                         "assignToName": "Boonsom Duangjun",
                         "initiateDate": 1409217840000,
                         "finishDate": 1409228640000,
                         "siteAccessDesc": "RT19(BSCRST5H,MSCCWT2)",
                         "priorityId": "4",
                         "priorityName": "Critical",
                         "statusId": "01",
                         "status": "Assign",
                         "systemName": "GSM900(All),3G900(All),3G2100(All),GSM1800",
                         "siteAffect": "RT19(BSCRST5H,MSCCWT2), RT19(BSCRST6,MSSRST1E), RT19M(3RNCSUK1H,3MSSSUK1H)",
                         "reportTypeId": null,
                         "report": null,
                         "oldReportDetail": null,
                         "trId": null,
                         "faultAlarmNumber": null,
                         "ttId": "TT14-586224",
                         "reportTypeDesc": null,
                         "waitingReport": null,
                         "latitude": null,
                         "longtitude": null,
                         "cntProblemCause": "0",
                         "cntProblemSolve": "0",
                         "reportType": "01",
                         "cntProcess": "0",
                         "cntProblemSolvePerTemp": "0",
                         "reasonOverdueId": null,
                         "reasonOverdueDesc": null,
                         "groupJob": "TT14-586224"
                     }, {
                         "jobId": "JB14-260731",
                         "title": "BRRHP-Air Fail (T>28) occurred for 45 minutes-1|-|2|-|",
                         "assignBy": "2803",
                         "assignByName": "Apichart Siriratanaboonchai",
                         "assignTo": "1192",
                         "assignToName": "Boonsom Duangjun",
                         "initiateDate": 1400747648000,
                         "finishDate": 1401179640000,
                         "siteAccessDesc": "BRRHP(3RNCCWD3H,3MSSCWD1H)",
                         "priorityId": "2",
                         "priorityName": "Minor",
                         "statusId": "05",
                         "status": "Waiting for Report",
                         "systemName": "3G2100(All)",
                         "siteAffect": "BRRHP(3RNCCWD3H,3MSSCWD1H)",
                         "reportTypeId": null,
                         "report": null,
                         "oldReportDetail": null,
                         "trId": null,
                         "faultAlarmNumber": null,
                         "ttId": "TT14-278417",
                         "reportTypeDesc": null,
                         "waitingReport": "Y",
                         "latitude": null,
                         "longtitude": null,
                         "cntProblemCause": "0",
                         "cntProblemSolve": "0",
                         "reportType": "01",
                         "cntProcess": "0",
                         "cntProblemSolvePerTemp": "0",
                         "reasonOverdueId": null,
                         "reasonOverdueDesc": null,
                         "groupJob": "TT14-278417"
                     }, {
                         "jobId": "JB14-268976",
                         "title": "3MGWBPL1H-test ",
                         "assignBy": "1200",
                         "assignByName": "Totsaworn Tangsuwannakit",
                         "assignTo": "1192",
                         "assignToName": "Boonsom Duangjun",
                         "initiateDate": 1403081340000,
                         "finishDate": 1403340540000,
                         "siteAccessDesc": "3MGWBPL1H",
                         "priorityId": "2",
                         "priorityName": "Minor",
                         "statusId": "03",
                         "status": "Initiate",
                         "systemName": "GSM900(All),3G900(All),3G2100(All)",
                         "siteAffect": "3MGWBPL1H",
                         "reportTypeId": "  ",
                         "report": null,
                         "oldReportDetail": null,
                         "trId": null,
                         "faultAlarmNumber": null,
                         "ttId": "TT14-262887",
                         "reportTypeDesc": null,
                         "waitingReport": null,
                         "latitude": null,
                         "longtitude": null,
                         "cntProblemCause": "0",
                         "cntProblemSolve": "0",
                         "reportType": "01",
                         "cntProcess": "0",
                         "cntProblemSolvePerTemp": "0",
                         "reasonOverdueId": null,
                         "reasonOverdueDesc": null,
                         "groupJob": "TT14-262887"
                     }, {
                         "jobId": "JB14-268979",
                         "title": "3MGWBPL1H-test ",
                         "assignBy": "1200",
                         "assignByName": "Totsaworn Tangsuwannakit",
                         "assignTo": "1192",
                         "assignToName": "Boonsom Duangjun",
                         "initiateDate": 1403082480000,
                         "finishDate": 1403341680000,
                         "siteAccessDesc": "3MGWBPL1H",
                         "priorityId": "2",
                         "priorityName": "Minor",
                         "statusId": "02",
                         "status": "Accept",
                         "systemName": "GSM900(All),3G900(All),3G2100(All)",
                         "siteAffect": "3MGWBPL1H",
                         "reportTypeId": null,
                         "report": null,
                         "oldReportDetail": null,
                         "trId": null,
                         "faultAlarmNumber": null,
                         "ttId": "TT14-262887",
                         "reportTypeDesc": null,
                         "waitingReport": null,
                         "latitude": null,
                         "longtitude": null,
                         "cntProblemCause": "0",
                         "cntProblemSolve": "0",
                         "reportType": "01",
                         "cntProcess": "0",
                         "cntProblemSolvePerTemp": "0",
                         "reasonOverdueId": null,
                         "reasonOverdueDesc": null,
                         "groupJob": "TT14-262887"
                     }, {
                         "jobId": "JB14-267206",
                         "title": "LDO1A-Building off AC main for maintenance ",
                         "assignBy": "1192",
                         "assignByName": "Boonsom Duangjun",
                         "assignTo": "1192",
                         "assignToName": "Boonsom Duangjun",
                         "initiateDate": 1401015240000,
                         "finishDate": 1403607240000,
                         "siteAccessDesc": "LDO1A(3RNCCWD1H,3MSSCWD1H)",
                         "priorityId": "1",
                         "priorityName": "None",
                         "statusId": "04",
                         "status": "On-Site",
                         "systemName": "3G2100(All)",
                         "siteAffect": "LDO1A(3RNCCWD1H,3MSSCWD1H)",
                         "reportTypeId": null,
                         "report": null,
                         "oldReportDetail": null,
                         "trId": null,
                         "faultAlarmNumber": null,
                         "ttId": "TT14-285475",
                         "reportTypeDesc": null,
                         "waitingReport": null,
                         "latitude": null,
                         "longtitude": null,
                         "cntProblemCause": "0",
                         "cntProblemSolve": "0",
                         "reportType": "01",
                         "cntProcess": "0",
                         "cntProblemSolvePerTemp": "0",
                         "reasonOverdueId": null,
                         "reasonOverdueDesc": null,
                         "groupJob": "TT14-285475"
                     }, {
                         "jobId": "JB14-270723",
                         "title": "13LF|GSM 900|BSCSUK1H|Radio|-test ",
                         "assignBy": "7039",
                         "assignByName": "Prasitkarn Piyaburaphacharoen",
                         "assignTo": "1192",
                         "assignToName": "Boonsom Duangjun",
                         "initiateDate": 1409649420000,
                         "finishDate": 1409659740000,
                         "siteAccessDesc": "13LF(BSCSUK1H,MSSSUK1H),CFSR(WLAN_SCH1AA,WIFICWDC),391F(BSCSUK1H,MSSSUK1H)",
                         "priorityId": "4",
                         "priorityName": "Critical",
                         "statusId": "01",
                         "status": "Assign",
                         "systemName": "GSM900(All),3G900(All),3G2100(All)",
                         "siteAffect": "CFSR(BSCONT4,MSCONT1), CFSR(WLAN_SCH1AA,WIFICWDC), CFSRP(3RNCBPL3H,3MSSBPL1H)",
                         "reportTypeId": null,
                         "report": null,
                         "oldReportDetail": null,
                         "trId": null,
                         "faultAlarmNumber": null,
                         "ttId": "TT14-586344",
                         "reportTypeDesc": null,
                         "waitingReport": null,
                         "latitude": null,
                         "longtitude": null,
                         "cntProblemCause": "0",
                         "cntProblemSolve": "0",
                         "reportType": "01",
                         "cntProcess": "0",
                         "cntProblemSolvePerTemp": "0",
                         "reasonOverdueId": null,
                         "reasonOverdueDesc": null,
                         "groupJob": "TT14-586344"
                     }, {
                         "jobId": "JB14-261173",
                         "title": "MBK1-Prepare FOM  Link MBKC (FL.7) - MBKC (FL.14) & Cut Cable 48C Open SJ-NEW for cancel site MBK.1 ",
                         "assignBy": "6687",
                         "assignByName": "Montree Poonwasinmongkol",
                         "assignTo": "1192",
                         "assignToName": "Boonsom Duangjun",
                         "initiateDate": 1400774400000,
                         "finishDate": 1400796000000,
                         "siteAccessDesc": "MBK1(BSCSCH8,MSCSCH4)",
                         "priorityId": "1",
                         "priorityName": "None",
                         "statusId": "03",
                         "status": "Initiate",
                         "systemName": "GSM900(All),3G900(All),3G2100(All),GSM1800",
                         "siteAffect": "MBK1(BSCSCH8,MSCSCH4), MBKC(RNCSMK5E,MSSSMK3E), MLTR(BSCSCH4,MSCSCH), NK02(BSCSUK7,MSSSUK2E), R613(BSCSUK7,MSSSUK2E), 6",
                         "reportTypeId": null,
                         "report": null,
                         "oldReportDetail": null,
                         "trId": null,
                         "faultAlarmNumber": null,
                         "ttId": "TT14-278873",
                         "reportTypeDesc": null,
                         "waitingReport": null,
                         "latitude": null,
                         "longtitude": null,
                         "cntProblemCause": "0",
                         "cntProblemSolve": "0",
                         "reportType": "01",
                         "cntProcess": "0",
                         "cntProblemSolvePerTemp": "0",
                         "reasonOverdueId": null,
                         "reasonOverdueDesc": null,
                         "groupJob": "TT14-278873"
                     }, {
                         "jobId": "JB14-266295",
                         "title": "XYSC-XYSC_SHELF   ALARM    XYSC-AIR-FAIL / JN27-XYSC XYSC-AIR-FAIL HKA-1-1-2-5",
                         "assignBy": "6157",
                         "assignByName": "Krissana Sungtong",
                         "assignTo": "1192",
                         "assignToName": "Boonsom Duangjun",
                         "initiateDate": 1400990280000,
                         "finishDate": 1401249540000,
                         "siteAccessDesc": "XYSC",
                         "priorityId": "2",
                         "priorityName": "Minor",
                         "statusId": "05",
                         "status": "Waiting for Report",
                         "systemName": "GSM900(All),3G900(All),3G2100(All),GSM1800",
                         "siteAffect": "XYSC",
                         "reportTypeId": null,
                         "report": null,
                         "oldReportDetail": null,
                         "trId": null,
                         "faultAlarmNumber": null,
                         "ttId": "TT14-284488",
                         "reportTypeDesc": null,
                         "waitingReport": "Y",
                         "latitude": null,
                         "longtitude": null,
                         "cntProblemCause": "0",
                         "cntProblemSolve": "0",
                         "reportType": "01",
                         "cntProcess": "0",
                         "cntProblemSolvePerTemp": "0",
                         "reasonOverdueId": null,
                         "reasonOverdueDesc": null,
                         "groupJob": "TT14-284488"
                     }, {
                         "jobId": "JB14-268981",
                         "title": "3MGWBPL1H-test ",
                         "assignBy": "1200",
                         "assignByName": "Totsaworn Tangsuwannakit",
                         "assignTo": "1192",
                         "assignToName": "Boonsom Duangjun",
                         "initiateDate": 1403083260000,
                         "finishDate": 1403342460000,
                         "siteAccessDesc": "3MGWBPL1H",
                         "priorityId": "2",
                         "priorityName": "Minor",
                         "statusId": "02",
                         "status": "Accept",
                         "systemName": "GSM900(All),3G900(All),3G2100(All)",
                         "siteAffect": "3MGWBPL1H",
                         "reportTypeId": null,
                         "report": null,
                         "oldReportDetail": null,
                         "trId": null,
                         "faultAlarmNumber": null,
                         "ttId": "TT14-262887",
                         "reportTypeDesc": null,
                         "waitingReport": null,
                         "latitude": null,
                         "longtitude": null,
                         "cntProblemCause": "0",
                         "cntProblemSolve": "0",
                         "reportType": "01",
                         "cntProcess": "0",
                         "cntProblemSolvePerTemp": "0",
                         "reasonOverdueId": null,
                         "reasonOverdueDesc": null,
                         "groupJob": "TT14-262887"
                     }, {
                         "jobId": "JB14-271603",
                         "title": "208WP-Test Alert ",
                         "assignBy": "406",
                         "assignByName": "Weerasak Phangsent",
                         "assignTo": "1192",
                         "assignToName": "Boonsom Duangjun",
                         "initiateDate": 1417090260000,
                         "finishDate": 1417187460000,
                         "siteAccessDesc": "208WP(3RNCCWD3H,3MSSCWD1H)",
                         "priorityId": "4",
                         "priorityName": "Critical",
                         "statusId": "01",
                         "status": "Assign",
                         "systemName": "GSM900(All),3G900(All),3G2100(All),GSM1800",
                         "siteAffect": "208WP(3RNCCWD3H,3MSSCWD1H)",
                         "reportTypeId": null,
                         "report": null,
                         "oldReportDetail": null,
                         "trId": null,
                         "faultAlarmNumber": null,
                         "ttId": "TT14-587144",
                         "reportTypeDesc": null,
                         "waitingReport": null,
                         "latitude": null,
                         "longtitude": null,
                         "cntProblemCause": "0",
                         "cntProblemSolve": "0",
                         "reportType": "01",
                         "cntProcess": "0",
                         "cntProblemSolvePerTemp": "0",
                         "reasonOverdueId": null,
                         "reasonOverdueDesc": null,
                         "groupJob": "TT14-587144"
                     }, {
                         "jobId": "JB14-266425",
                         "title": "SASK-Air Fail (T>28) occurred for 45 minutes-1|CE|2|-|",
                         "assignBy": "5395",
                         "assignByName": "Prawit Aramthong",
                         "assignTo": "1192",
                         "assignToName": "Boonsom Duangjun",
                         "initiateDate": 1400996020000,
                         "finishDate": 1401341580000,
                         "siteAccessDesc": "SASK(BSCSCH2,MSSSMK1)",
                         "priorityId": "2",
                         "priorityName": "Minor",
                         "statusId": "05",
                         "status": "Waiting for Report",
                         "systemName": "GSM900(All)",
                         "siteAffect": "SASK(BSCSCH2,MSSSMK1)",
                         "reportTypeId": null,
                         "report": null,
                         "oldReportDetail": null,
                         "trId": null,
                         "faultAlarmNumber": null,
                         "ttId": "TT14-284625",
                         "reportTypeDesc": null,
                         "waitingReport": "Y",
                         "latitude": null,
                         "longtitude": null,
                         "cntProblemCause": "0",
                         "cntProblemSolve": "0",
                         "reportType": "01",
                         "cntProcess": "0",
                         "cntProblemSolvePerTemp": "0",
                         "reasonOverdueId": null,
                         "reasonOverdueDesc": null,
                         "groupJob": "TT14-284625"
                     }, {
                         "jobId": "JB14-252527",
                         "title": "CBWT-For  prepare core fiber SBN  Link  Project 10G switch SUK.1- CBWT ",
                         "assignBy": "71",
                         "assignByName": "Suwat Bualuangarm",
                         "assignTo": "1192",
                         "assignToName": "Boonsom Duangjun",
                         "initiateDate": 1400549400000,
                         "finishDate": 1403262000000,
                         "siteAccessDesc": "CBWT(BSCSUK7,MSSSUK2E)",
                         "priorityId": "1",
                         "priorityName": "None",
                         "statusId": "03",
                         "status": "Initiate",
                         "systemName": "GSM900(All),3G900(All),3G2100(All),GSM1800",
                         "siteAffect": "CBWT(BSCSUK6,MSSSUK1H), CBWT(BSCSUK7,MSSSUK2E), CBWT(RNCSMK3E,MSSSMK3E)",
                         "reportTypeId": null,
                         "report": null,
                         "oldReportDetail": null,
                         "trId": null,
                         "faultAlarmNumber": null,
                         "ttId": "TT14-269766",
                         "reportTypeDesc": null,
                         "waitingReport": null,
                         "latitude": null,
                         "longtitude": null,
                         "cntProblemCause": "0",
                         "cntProblemSolve": "0",
                         "reportType": "01",
                         "cntProcess": "0",
                         "cntProblemSolvePerTemp": "0",
                         "reasonOverdueId": null,
                         "reasonOverdueDesc": null,
                         "groupJob": "TT14-269766"
                     }, {
                         "jobId": "JB14-268982",
                         "title": "3MGWBPL1H-test ",
                         "assignBy": "1200",
                         "assignByName": "Totsaworn Tangsuwannakit",
                         "assignTo": "1192",
                         "assignToName": "Boonsom Duangjun",
                         "initiateDate": 1403083320000,
                         "finishDate": 1403342520000,
                         "siteAccessDesc": "3MGWBPL1H",
                         "priorityId": "2",
                         "priorityName": "Minor",
                         "statusId": "02",
                         "status": "Accept",
                         "systemName": "GSM900(All),3G900(All),3G2100(All)",
                         "siteAffect": "3MGWBPL1H",
                         "reportTypeId": null,
                         "report": null,
                         "oldReportDetail": null,
                         "trId": null,
                         "faultAlarmNumber": null,
                         "ttId": "TT14-262887",
                         "reportTypeDesc": null,
                         "waitingReport": null,
                         "latitude": null,
                         "longtitude": null,
                         "cntProblemCause": "0",
                         "cntProblemSolve": "0",
                         "reportType": "01",
                         "cntProcess": "0",
                         "cntProblemSolvePerTemp": "0",
                         "reasonOverdueId": null,
                         "reasonOverdueDesc": null,
                         "groupJob": "TT14-262887"
                     }, {
                         "jobId": "JB14-269053",
                         "title": "3G2100-test ",
                         "assignBy": "4919",
                         "assignByName": "Akeburut Akaracharanya",
                         "assignTo": "1192",
                         "assignToName": "Boonsom Duangjun",
                         "initiateDate": 1403237280000,
                         "finishDate": 1403496480000,
                         "siteAccessDesc": "3G2100",
                         "priorityId": "2",
                         "priorityName": "Minor",
                         "statusId": "02",
                         "status": "Accept",
                         "systemName": "3G2100(All)",
                         "siteAffect": "3G2100",
                         "reportTypeId": null,
                         "report": null,
                         "oldReportDetail": null,
                         "trId": null,
                         "faultAlarmNumber": null,
                         "ttId": "TT14-585498",
                         "reportTypeDesc": null,
                         "waitingReport": null,
                         "latitude": null,
                         "longtitude": null,
                         "cntProblemCause": "0",
                         "cntProblemSolve": "0",
                         "reportType": "01",
                         "cntProcess": "0",
                         "cntProblemSolvePerTemp": "0",
                         "reasonOverdueId": null,
                         "reasonOverdueDesc": null,
                         "groupJob": "TT14-585498"
                     }, {
                         "jobId": "JB13-472190",
                         "title": "BOIB-BTS(Outsource)",
                         "assignBy": "1088",
                         "assignByName": "Chatuphoom Phonwises",
                         "assignTo": "1192",
                         "assignToName": "Boonsom Duangjun",
                         "initiateDate": 1388021400000,
                         "finishDate": 1391164200000,
                         "siteAccessDesc": "BOIB(RNCSMK4E,MSSSMK3E)",
                         "priorityId": "1",
                         "priorityName": "None",
                         "statusId": "02",
                         "status": "Accept",
                         "systemName": "GSM900(All),3G900(All),3G2100(All),GSM1800",
                         "siteAffect": "BOIB(RNCSMK4E,MSSSMK3E)",
                         "reportTypeId": null,
                         "report": null,
                         "oldReportDetail": null,
                         "trId": null,
                         "faultAlarmNumber": null,
                         "ttId": "TT13-580893",
                         "reportTypeDesc": null,
                         "waitingReport": null,
                         "latitude": null,
                         "longtitude": null,
                         "cntProblemCause": "0",
                         "cntProblemSolve": "0",
                         "reportType": "01",
                         "cntProcess": "0",
                         "cntProblemSolvePerTemp": "0",
                         "reasonOverdueId": null,
                         "reasonOverdueDesc": null,
                         "groupJob": "TT13-580893"
                     }, {
                         "jobId": "JB14-256313",
                         "title": "SWRC-IP_RAN ASR901 alarm device unreachable  can't remote ",
                         "assignBy": "71",
                         "assignByName": "Suwat Bualuangarm",
                         "assignTo": "1192",
                         "assignToName": "Boonsom Duangjun",
                         "initiateDate": 1400601240000,
                         "finishDate": 1400842440000,
                         "siteAccessDesc": "SWRC(BSCST22,MSCST22)",
                         "priorityId": "1",
                         "priorityName": "None",
                         "statusId": "02",
                         "status": "Accept",
                         "systemName": "GSM900(All),3G900(All)",
                         "siteAffect": "SWRC(BSCST22,MSCST22)",
                         "reportTypeId": null,
                         "report": null,
                         "oldReportDetail": null,
                         "trId": null,
                         "faultAlarmNumber": null,
                         "ttId": "TT14-273705",
                         "reportTypeDesc": null,
                         "waitingReport": null,
                         "latitude": null,
                         "longtitude": null,
                         "cntProblemCause": "0",
                         "cntProblemSolve": "0",
                         "reportType": "01",
                         "cntProcess": "0",
                         "cntProblemSolvePerTemp": "0",
                         "reasonOverdueId": null,
                         "reasonOverdueDesc": null,
                         "groupJob": "TT14-273705"
                     }, {
                         "jobId": "JB14-253371",
                         "title": "MBK1-For Check Connection site MBK1",
                         "assignBy": "5029",
                         "assignByName": "Eknarin Kitopas",
                         "assignTo": "1192",
                         "assignToName": "Boonsom Duangjun",
                         "initiateDate": 1400549400000,
                         "finishDate": 1401447600000,
                         "siteAccessDesc": "MBK1(BSCSCH8,MSCSCH4)",
                         "priorityId": "1",
                         "priorityName": "None",
                         "statusId": "02",
                         "status": "Accept",
                         "systemName": "GSM900(All),3G900(All),3G2100(All),GSM1800",
                         "siteAffect": "MBK1(BSCSCH8,MSCSCH4), MBK1(BSCSUK7,MSSSUK2E), MBK1(RNCSMK5E,MSSSMK3E)",
                         "reportTypeId": null,
                         "report": null,
                         "oldReportDetail": null,
                         "trId": null,
                         "faultAlarmNumber": null,
                         "ttId": "TT14-270619",
                         "reportTypeDesc": null,
                         "waitingReport": null,
                         "latitude": null,
                         "longtitude": null,
                         "cntProblemCause": "0",
                         "cntProblemSolve": "0",
                         "reportType": "01",
                         "cntProcess": "0",
                         "cntProblemSolvePerTemp": "0",
                         "reasonOverdueId": null,
                         "reasonOverdueDesc": null,
                         "groupJob": "TT14-270619"
                     }, {
                         "jobId": "JB14-220752",
                         "title": "SCT2-Check Status IPIN Tellabs-Check Status IPIN Tellabs ",
                         "assignBy": "5968",
                         "assignByName": "Thanong Preedasak",
                         "assignTo": "1192",
                         "assignToName": "Boonsom Duangjun",
                         "initiateDate": 1399518420000,
                         "finishDate": 1402110420000,
                         "siteAccessDesc": "SCT2(BSCSCH5,MSSSUK1H)",
                         "priorityId": "1",
                         "priorityName": "None",
                         "statusId": "02",
                         "status": "Accept",
                         "systemName": "GSM900(All),3G900(All),3G2100(All)",
                         "siteAffect": "SCT2(BSCSCH5,MSSSUK1H), SCT2M(3RNCSUK3H,3MSSSUK1H), SCT2P(3RNCSUK3H,3MSSSUK1H), SCT2P(BSCSCH5,MSSSUK1H), SCT2T(3RNCBPL2H,3MSSBPL1H)",
                         "reportTypeId": null,
                         "report": null,
                         "oldReportDetail": null,
                         "trId": null,
                         "faultAlarmNumber": null,
                         "ttId": "TT14-236314",
                         "reportTypeDesc": null,
                         "waitingReport": null,
                         "latitude": null,
                         "longtitude": null,
                         "cntProblemCause": "0",
                         "cntProblemSolve": "0",
                         "reportType": "01",
                         "cntProcess": "0",
                         "cntProblemSolvePerTemp": "0",
                         "reasonOverdueId": null,
                         "reasonOverdueDesc": null,
                         "groupJob": "TT14-236314"
                     }, {
                         "jobId": "JB14-269194",
                         "title": "3BILCWD01B-Install HP patch and create AWR task for db. ",
                         "assignBy": "5500",
                         "assignByName": "Wiphada Inkiew",
                         "assignTo": "1192",
                         "assignToName": "Boonsom Duangjun",
                         "initiateDate": 1403622000000,
                         "finishDate": 1404082800000,
                         "siteAccessDesc": "3BILCWD01B",
                         "priorityId": "1",
                         "priorityName": "None",
                         "statusId": "02",
                         "status": "Accept",
                         "systemName": "3G2100(All)",
                         "siteAffect": "3BILCWD01B",
                         "reportTypeId": null,
                         "report": null,
                         "oldReportDetail": null,
                         "trId": null,
                         "faultAlarmNumber": null,
                         "ttId": "TT14-585653",
                         "reportTypeDesc": null,
                         "waitingReport": null,
                         "latitude": null,
                         "longtitude": null,
                         "cntProblemCause": "0",
                         "cntProblemSolve": "0",
                         "reportType": "01",
                         "cntProcess": "0",
                         "cntProblemSolvePerTemp": "0",
                         "reasonOverdueId": null,
                         "reasonOverdueDesc": null,
                         "groupJob": "TT14-585653"
                     }],
                     "jobIds": null,
                     "type": null
                 };
                 localStorage.setItem("jbData", JSON.stringify(response));
                 var acceptCount = 0,
                     assignCount = 0;
                 var cache = localStorage.getItem("jbData");
                 var assignCount, acceptCount;
                 app.masterService.viewModel.setCount("0", "0");
                 if (cache != null && cache != undefined) {
                     ////console.log("loadjob:complete");

                     var dataSourceAccept = new kendo.data.DataSource({
                         data: JSON.parse(localStorage.getItem("jbData")),
                         filter: {
                             field: "statusId",
                             operator: "eq",
                             value: "01"
                         },
                         aggregate: {
                             field: "status",
                             aggregate: "count"
                         },
                         schema: {
                             data: "jobs",
                             model: {
                                 id: "jobid"
                             }
                         }
                     });
                     dataSourceAccept.fetch(function() {
                         var results = dataSourceAccept.aggregates().status;
                         //var tabstrip = $("#mytabstrip").data("kendoMobileTabStrip");
                         if (results != null && results != undefined) {
                             assignCount = results.count;
                             //console.log("show badge" + assignCount + acceptCount);
                             //app.masterService.viewModel.setCount(assignCount, acceptCount);
                         }
                     });

                     var dataSourceAssign = new kendo.data.DataSource({
                         data: JSON.parse(localStorage.getItem("jbData")),
                         filter: {
                             field: "statusId",
                             operator: "neq",
                             value: "01"
                         },
                         aggregate: {
                             field: "status",
                             aggregate: "count"
                         },
                         schema: {
                             data: "jobs",
                             model: {
                                 id: "jobid"
                             }
                         }
                     });
                     dataSourceAssign.fetch(function() {
                         var results = dataSourceAssign.aggregates().status;
                         var tabstrip = $("#mytabstrip").data("kendoMobileTabStrip");
                         if (results != null && results != undefined) {
                             acceptCount = results.count;
                             //console.log("show badge" + assignCount + acceptCount);
                             //app.masterService.viewModel.setCount(assignCount, acceptCount);
                         }
                     });


                     //console.debug("show badge" + assignCount + acceptCount);
                     setTimeout(function() {
                         console.log("show badge" + assignCount + acceptCount);
                         app.masterService.viewModel.setCount(assignCount, acceptCount);

                         app.masterService.viewModel.loadMyTeam();

                     }, 1000);


                 }

             } else {
                 $.ajax({ //using jsfiddle's echo service to simulate remote data loading
                     type: "POST",
                     timeout: 180000,
                     url: app.configService.serviceUrl + 'post-json.service?s=transaction-service&o=getJob.json',
                     data: JSON.stringify({
                         "token": localStorage.getItem("token"),
                         "userId": JSON.parse(localStorage.getItem("profileData")).userId,
                         "priority": "",
                         "statusId": "",
                         "version": "2"
                     }),
                     async: true,
                     dataType: "json",
                     contentType: 'application/json',
                     success: function(response) {
                         //store response
                         localStorage.setItem("jbData", JSON.stringify(response));
                         //that.hideLoading();
                         ////console.log("fetch My Job : Complete");
                         ////console.log("My Job Data :" + JSON.stringify(response));
                     },
                     error: function(xhr, error) {
                         //that.hideLoading();
                         if (!app.ajaxHandlerService.error(xhr, error)) {
                             var cache = localStorage.getItem("jbData");

                             if (cache == null || cache == undefined) {
                                 ////console.log("Get My Job failed");
                                 ////console.log(xhr);
                                 ////console.log(error);
                                 navigator.notification.alert(xhr.status + error,
                                     function() {}, "Get My Job failed", 'OK');
                             }
                         }
                         return;
                     },
                     complete: function() {

                         var acceptCount = 0,
                             assignCount = 0;
                         var cache = localStorage.getItem("jbData");
                         var assignCount, acceptCount;
                         app.masterService.viewModel.setCount("0", "0");
                         if (cache != null && cache != undefined) {
                             ////console.log("loadjob:complete");

                             var dataSourceAccept = new kendo.data.DataSource({
                                 data: JSON.parse(localStorage.getItem("jbData")),
                                 filter: {
                                     field: "statusId",
                                     operator: "eq",
                                     value: "01"
                                 },
                                 aggregate: {
                                     field: "status",
                                     aggregate: "count"
                                 },
                                 schema: {
                                     data: "jobs",
                                     model: {
                                         id: "jobid"
                                     }
                                 }
                             });
                             dataSourceAccept.fetch(function() {
                                 var results = dataSourceAccept.aggregates().status;
                                 //var tabstrip = $("#mytabstrip").data("kendoMobileTabStrip");
                                 if (results != null && results != undefined) {
                                     assignCount = results.count;
                                     //console.log("show badge" + assignCount + acceptCount);
                                     //app.masterService.viewModel.setCount(assignCount, acceptCount);
                                 }
                             });

                             var dataSourceAssign = new kendo.data.DataSource({
                                 data: JSON.parse(localStorage.getItem("jbData")),
                                 filter: {
                                     field: "statusId",
                                     operator: "neq",
                                     value: "01"
                                 },
                                 aggregate: {
                                     field: "status",
                                     aggregate: "count"
                                 },
                                 schema: {
                                     data: "jobs",
                                     model: {
                                         id: "jobid"
                                     }
                                 }
                             });
                             dataSourceAssign.fetch(function() {
                                 var results = dataSourceAssign.aggregates().status;
                                 var tabstrip = $("#mytabstrip").data("kendoMobileTabStrip");
                                 if (results != null && results != undefined) {
                                     acceptCount = results.count;
                                     //console.log("show badge" + assignCount + acceptCount);
                                     //app.masterService.viewModel.setCount(assignCount, acceptCount);
                                 }
                             });


                             //console.debug("show badge" + assignCount + acceptCount);
                             setTimeout(function() {
                                 console.log("show badge" + assignCount + acceptCount);
                                 app.masterService.viewModel.setCount(assignCount, acceptCount);

                                 app.masterService.viewModel.loadMyTeam();

                             }, 1000);


                         }

                     }
                 });
             }

         },
         loadMyJBProblemCause: function() {
             var that = this;
             //var myJBs = null;
             ////console.log("loadJobpc");
             if (app.configService.isMorkupData) {
                 var response = {"jobProblems":[
                  {"jobId": "",
                   "problemCauseMainId": "",
                   "problemCauseDesc": "",
                   "problemCauseSubId": "",
                   "problemCauseSubDesc": "",
                   "seqId":null,
                   "levelCause":null,
                   "problemCauseId":null
                   }
                 ],"version":"1","userId":"701","priority":"1","jobId":null};
                 localStorage.setItem("jbCauseData", JSON.stringify(response));
             } else {
                 $.ajax({ //using jsfiddle's echo service to simulate remote data loading
                     type: "POST",
                     timeout: 180000,
                     url: app.configService.serviceUrl + 'post-json.service?s=transaction-service&o=getJobProblemCause.json',
                     data: JSON.stringify({
                         "token": localStorage.getItem("token"),
                         "userId": JSON.parse(localStorage.getItem("profileData")).userId,
                         "priority": "",
                         "statusId": "",
                         "version": "2"
                     }),
                     async: true,
                     dataType: "json",
                     contentType: 'application/json',
                     success: function(response) {
                         //store response
                         ////console.log("loadJobpc:complete");
                         localStorage.setItem("jbCauseData", JSON.stringify(response));
                         //that.hideLoading();
                         ////console.log("fetch My Problem Cause : Complete");
                         ////console.log("My Problem Cause Data :" + JSON.stringify(response));
                     },
                     error: function(xhr, error) {
                         //that.hideLoading();
                         if (!app.ajaxHandlerService.error(xhr, error)) {
                             var cache = localStorage.getItem("jbCauseData");

                             if (cache == null || cache == undefined) {
                                 ////console.log("Get My Problem Cause failed");
                                 ////console.log(xhr);
                                 ////console.log(error);
                                 navigator.notification.alert(xhr.status + error,
                                     function() {}, "Get My Problem Cause failed", 'OK');
                             }
                         }
                         return;
                     },
                     complete: function() {}
                 });
             }

         },
         loadMyJBProblemCauseM: function() {
             var that = this;
             if (app.configService.isMorkupData) {
                 var response = {"jobProblems":[
                  {"jobId": "",
                   "problemCauseMainId": "",
                   "problemCauseDesc": "",
                   "problemCauseSubId": "",
                   "problemCauseSubDesc": "",
                   "seqId":null,
                   "levelCause":null,
                   "problemCauseId":null
                   }
                 ],"version":"1","userId":"701","priority":"1","jobId":null};
                 localStorage.setItem("jbCauseMData", JSON.stringify(response));
             } else {
                 $.ajax({ //using jsfiddle's echo service to simulate remote data loading
                     type: "POST",
                     timeout: 180000,
                     url: app.configService.serviceUrl + 'post-json.service?s=transaction-service&o=getJobProblemCauseM.json',
                     data: JSON.stringify({
                         "token": localStorage.getItem("token"),
                         "userId": JSON.parse(localStorage.getItem("profileData")).userId,
                         "priority": "",
                         "statusId": "",
                         "version": "2"
                     }),
                     async: true,
                     dataType: "json",
                     contentType: 'application/json',
                     success: function(response) {
                         //store response
                         ////console.log("loadJobpcm:complete");
                         localStorage.setItem("jbCauseMData", JSON.stringify(response));
                         //that.hideLoading();
                         ////console.log("fetch My Problem Cause Multi : Complete");
                         ////console.log("My Problem Cause Multi :" + JSON.stringify(response));
                     },
                     error: function(xhr, error) {
                         //that.hideLoading();
                         if (!app.ajaxHandlerService.error(xhr, error)) {
                             var cache = localStorage.getItem("jbCauseMData");

                             if (cache == null || cache == undefined) {
                                 ////console.log("Get My Problem Cause Multi failed");
                                 ////console.log(xhr);
                                 ////console.log(error);
                                 navigator.notification.alert(xhr.status + error,
                                     function() {}, "Get My Problem Cause Multi failed", 'OK');
                             }
                         }
                         return;
                     },
                     complete: function() {


                     }
                 });
             }

         },
         loadMyJBProblemSolve: function() {
             var that = this;
             if (app.configService.isMorkupData) {
                 var response = {};
                 localStorage.setItem("jbSolveData", JSON.stringify(response));
             } else {
                 $.ajax({ //using jsfiddle's echo service to simulate remote data loading
                     type: "POST",
                     timeout: 180000,
                     url: app.configService.serviceUrl + 'post-json.service?s=transaction-service&o=getJobProblemSolve.json',
                     data: JSON.stringify({
                         "token": localStorage.getItem("token"),
                         "userId": JSON.parse(localStorage.getItem("profileData")).userId,
                         "priority": "",
                         "statusId": "",
                         "version": "2"
                     }),
                     async: true,
                     dataType: "json",
                     contentType: 'application/json',
                     success: function(response) {
                         //store response
                         ////console.log("loadJobps:complete");
                         localStorage.setItem("jbSolveData", JSON.stringify(response));
                         //that.hideLoading();
                         ////console.log("fetch My Problem Solve : Complete");
                         ////console.log("My Problem Solve Data :" + JSON.stringify(response));
                     },
                     error: function(xhr, error) {
                         //that.hideLoading();
                         if (!app.ajaxHandlerService.error(xhr, error)) {
                             var cache = localStorage.getItem("jbSolveData");

                             if (cache == null || cache == undefined) {
                                 ////console.log("Get My Problem Solve failed");
                                 ////console.log(xhr);
                                 ////console.log(error);
                                 navigator.notification.alert(xhr.status + error,
                                     function() {}, "Get My Problem Solve failed", 'OK');
                             }
                         }
                         return;
                     },
                     complete: function() {



                     }
                 });
             }

         },
         loadReasonOverdue: function() {
             if (app.configService.isMorkupData) {
                 var response = {};
                 localStorage.setItem("reasonOverDueData", JSON.stringify(response));
             } else {
                 $.ajax({ //using jsfiddle's echo service to simulate remote data loading
                     type: "POST",
                     timeout: 180000,
                     url: app.configService.serviceUrl + 'post-json.service?s=master-service&o=getReasonOverDue.json',
                     data: JSON.stringify({
                         "token": localStorage.getItem("token"),
                         "version": "2"
                     }),

                     dataType: "json",
                     contentType: 'application/json',
                     success: function(response) {
                         localStorage.setItem("reasonOverDueData", JSON.stringify(response));
                         //that.hideLoading();
                         ////console.log("fetch Reason Over Due Data : Complete");
                         ////console.log("Reason Over Due Data :" + JSON.stringify(response));
                     },
                     error: function(xhr, error) {

                         if (!app.ajaxHandlerService.error(xhr, error)) {
                             var cache = localStorage.getItem("reasonOverDueData");

                             if (cache == null || cache == undefined) {
                                 ////console.log("Get Reason Over Due failed");
                                 ////console.log(xhr);
                                 ////console.log(error);
                                 navigator.notification.alert(xhr.status + error,
                                     function() {}, "Get Reason Over Due failed", 'OK');
                             }

                         }
                         return;
                     },
                     complete: function() {}
                 });
             }

         },
         setCount: function(assignCount, acceptCount) {
             var tabstrip = $(".mytabstrip").data("kendoMobileTabStrip");
             if (tabstrip != null || tabstrip != undefined) {
                 tabstrip.badge('.tAssign', assignCount);
                 tabstrip.badge('.tAccept', acceptCount);
             } else {

                 tabstrip = app.application.view().element.find(".mytabstrip").data("kendoMobileTabStrip");
                 tabstrip.badge('.tAssign', assignCount);
                 tabstrip.badge('.tAccept', acceptCount);
                 //console.log("tabstrip not found");

             }
         },
         showLoading: function() {
             //if (this._isLoading) {
             app.application.showLoading();
             //}
         },
         hideLoading: function() {
             app.application.hideLoading();
         },
         loadMyTeam: function() {
             var userRole = app.masterService.viewModel.get("userRole");
             if (userRole != "01") {
                 ////console.log("goto myteam");
                 app.application.navigate(
                     '#tabstrip-team'
                 );
             } else {
                 app.application.navigate(
                     '#tabstrip-my'
                 );
             }
             setTimeout(function() {
                 app.masterService.viewModel.hideLoading();
             }, 1000);
         },
     });

     app.masterService = {
         init: function(e) {
             ////console.log("master init start");



             ////console.log("master init end");
         },
         show: function(e) {

             ////console.log("master show start");

             app.masterService.viewModel.showLoading();
             //app.masterService.viewModel.setCount("0", "0");
             sleep(1000);
             //setTimeout(function(){
             app.masterService.viewModel.loadProfile();
             //app.masterService.viewModel.loadRegion();
             //app.masterService.viewModel.loadZone();
             //app.masterService.viewModel.loadLocation();
             //app.masterService.viewModel.loadTeam();
             //app.masterService.viewModel.loadMember();

             app.masterService.viewModel.loadPriority();
             app.masterService.viewModel.loadStatus();
             app.masterService.viewModel.loadReportType();
             app.masterService.viewModel.loadProblemCause();
             app.masterService.viewModel.loadProblemCauseMulti();
             app.masterService.viewModel.loadProblemSolve();
             app.masterService.viewModel.loadReasonOverdue();

             app.masterService.viewModel.loadMyJBProblemCause();
             app.masterService.viewModel.loadMyJBProblemCauseM();
             app.masterService.viewModel.loadMyJBProblemSolve();
             app.masterService.viewModel.loadMyJB();



             //},1000);
             //app.masterService.hide();
             //loadMyTeam
             //app.masterService.viewModel.hideLoading();

             ////console.log("master Show end");
         },
         afterShow: function(e) {
             ////console.log("master afterShow start");
             //setTimeout(function() {

             //}, 0);
             //setTimeout(function() {

             //app.masterService.viewModel.hideLoading();
             //}, 10000);

             ////console.log("master afterShow end");
         },
         hide: function(e) {
             ////console.log("master hide start");

             //app.masterService.viewModel.hideLoading();

             ////console.log("master hide end");
         },
         viewModel: new MasterViewModel()
     };
 })(window);