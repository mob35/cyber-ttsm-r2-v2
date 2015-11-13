(function(global) {
    app = global.app = global.app || {};
    var _getRegionListTTSME = {
        "regions": [{
            "regionId": "BKK",
            "regionNameTh": "กรุงเทพมหานคร",
            "regionNameEn": "Bangkok",
            "zones": [{
                "zoneId": "AB",
                "zoneDesc": "MNM-AREA2 (Bangkok-ONT)"
            }, {
                "zoneId": "AD",
                "zoneDesc": "Zone ADC"
            }, {
                "zoneId": "AP",
                "zoneDesc": "Application"
            }, {
                "zoneId": "B1",
                "zoneDesc": "MNM-AREA1 (Bangkok-ST2)"
            }, {
                "zoneId": "B10",
                "zoneDesc": "MNM-SUK"
            }, {
                "zoneId": "B2",
                "zoneDesc": "MNM-AREA2 (Bangkok-ONT)"
            }, {
                "zoneId": "B3",
                "zoneDesc": "MNM-AREA3 (Bangkok-TLC)"
            }, {
                "zoneId": "B4",
                "zoneDesc": "MNM-AREA4 (Bangkok-CWT)"
            }, {
                "zoneId": "B5",
                "zoneDesc": "MFE-RST (Bangkok)"
            }, {
                "zoneId": "B6",
                "zoneDesc": "Value Added"
            }, {
                "zoneId": "B7",
                "zoneDesc": "MC-Other (Bangkok)"
            }, {
                "zoneId": "B8",
                "zoneDesc": "OC-Other (Bangkok)"
            }, {
                "zoneId": "B9",
                "zoneDesc": "Switching"
            }, {
                "zoneId": "BB",
                "zoneDesc": "Branch Outlet"
            }, {
                "zoneId": "BC",
                "zoneDesc": "Client"
            }, {
                "zoneId": "BI",
                "zoneDesc": "ITO"
            }, {
                "zoneId": "BJ",
                "zoneDesc": "IT Security"
            }, {
                "zoneId": "BKK-PLAN",
                "zoneDesc": "BKK-Planning"
            }, {
                "zoneId": "BM",
                "zoneDesc": "Mobile Satellite"
            }, {
                "zoneId": "BP",
                "zoneDesc": "Project"
            }, {
                "zoneId": "BS",
                "zoneDesc": "Store"
            }, {
                "zoneId": "DR",
                "zoneDesc": "Drive Test"
            }, {
                "zoneId": "ICT",
                "zoneDesc": "ICT"
            }, {
                "zoneId": "IT",
                "zoneDesc": "IT Supervision"
            }, {
                "zoneId": "OTH",
                "zoneDesc": "Other"
            }, {
                "zoneId": "PHP23D",
                "zoneDesc": "PHP23D"
            }, {
                "zoneId": "STO1",
                "zoneDesc": "CDN_STO"
            }, {
                "zoneId": "TLS1",
                "zoneDesc": "ZONE_TLS1"
            }, {
                "zoneId": "TTC",
                "zoneDesc": "Technical Training Center"
            }, {
                "zoneId": "VAS",
                "zoneDesc": "VAS"
            }, {
                "zoneId": "X1",
                "zoneDesc": "TTS Administrator"
            }, {
                "zoneId": "X2",
                "zoneDesc": "Handset"
            }]
        }, {
            "regionId": "CR",
            "regionNameTh": "ภาคกลาง",
            "regionNameEn": "Central",
            "zones": [{
                "zoneId": "C1",
                "zoneDesc": "MC1_NPT (Central)"
            }, {
                "zoneId": "C2",
                "zoneDesc": "MC2_KRI (Central)"
            }, {
                "zoneId": "C3",
                "zoneDesc": "MC3_PKN (Central)"
            }, {
                "zoneId": "C4",
                "zoneDesc": "MC4_AYA (Central)"
            }, {
                "zoneId": "C5",
                "zoneDesc": "MC5_LRI (Central)"
            }, {
                "zoneId": "C6",
                "zoneDesc": "MC6_NPT2 (Central)"
            }]
        }, {
            "regionId": "ER",
            "regionNameTh": "ภาคตะวันออก",
            "regionNameEn": "East",
            "zones": [{
                "zoneId": "E1",
                "zoneDesc": "Zone1_Chonburi (East)"
            }, {
                "zoneId": "E2",
                "zoneDesc": "Zone2_Prachinburi (East)"
            }, {
                "zoneId": "E3",
                "zoneDesc": "Zone3_Chantaburi (East)"
            }, {
                "zoneId": "E4",
                "zoneDesc": "OC-Other (East)"
            }, {
                "zoneId": "E5",
                "zoneDesc": "Zone4_Rayong (East)"
            }, {
                "zoneId": "ES",
                "zoneDesc": "Zone_store"
            }]
        }, {
            "regionId": "NER",
            "regionNameTh": "ภาคตะวันออกเฉียงเหนือ",
            "regionNameEn": "NorthEast",
            "zones": [{
                "zoneId": "Z1",
                "zoneDesc": "MC1_KKN (North East)"
            }, {
                "zoneId": "Z10",
                "zoneDesc": "Zone_Store"
            }, {
                "zoneId": "Z2",
                "zoneDesc": "MC2_UBN (North East)"
            }, {
                "zoneId": "Z3",
                "zoneDesc": "MC3_UDN (North East)"
            }, {
                "zoneId": "Z4",
                "zoneDesc": "MC4_NMA (North East)"
            }, {
                "zoneId": "Z5",
                "zoneDesc": "MC-Other (North East)"
            }, {
                "zoneId": "Z6",
                "zoneDesc": "Drive Test (North East)"
            }, {
                "zoneId": "Z7",
                "zoneDesc": "MC7_SRN(North East)"
            }, {
                "zoneId": "Z8",
                "zoneDesc": "MC5_RET (North East)"
            }, {
                "zoneId": "Z9",
                "zoneDesc": "MC6_SNK (North East)"
            }, {
                "zoneId": "ZS",
                "zoneDesc": "Store"
            }]
        }, {
            "regionId": "NR",
            "regionNameTh": "ภาคเหนือ",
            "regionNameEn": "North",
            "zones": [{
                "zoneId": "N1",
                "zoneDesc": "MC1_CMI (North)"
            }, {
                "zoneId": "N2",
                "zoneDesc": "MC2_PLK (North)"
            }, {
                "zoneId": "N3",
                "zoneDesc": "MC3_NSN (North)"
            }, {
                "zoneId": "N4",
                "zoneDesc": "MC5_CRI (North)"
            }, {
                "zoneId": "N5",
                "zoneDesc": "MC4_LPG (North)"
            }, {
                "zoneId": "N6",
                "zoneDesc": "MC6_TAK (North)"
            }, {
                "zoneId": "N7",
                "zoneDesc": "MC1_CMI (North)"
            }]
        }, {
            "regionId": "SR",
            "regionNameTh": "ภาคใต้",
            "regionNameEn": "South",
            "zones": [{
                "zoneId": "S1",
                "zoneDesc": "MC1_SNI(South)"
            }, {
                "zoneId": "S2",
                "zoneDesc": "MC2_HYI(South)"
            }, {
                "zoneId": "S3",
                "zoneDesc": "MC3_NRT(South)"
            }, {
                "zoneId": "S4",
                "zoneDesc": "MC4_PKT(South)"
            }, {
                "zoneId": "S5",
                "zoneDesc": "MC5_TRG(South)"
            }, {
                "zoneId": "S6",
                "zoneDesc": "MC6_CPN(South)"
            }, {
                "zoneId": "S7",
                "zoneDesc": "MC7_YLA(South)"
            }, {
                "zoneId": "SS",
                "zoneDesc": "Store_SR"
            }]
        }],
        "version": "1",
        "userId": "7478"
    };
    //Region selec index
    var indexRegion = 0;
    // 
    var _getJobStatusTTSME = {
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
    var _getPriorityTTSME = {
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

    powerSearchViewModel = kendo.data.ObservableObject.extend({
        lastupdateaccept: null,
        jobid: "",
        sitecode: "",
        assignDateFrom: "",
        assignDateTo: "",
        finishDateFrom: "",
        finishDateTo: "",
        title: "",
        siteNameThai: "",
        assignTo: "",
        assignBy: "",
        titletxt: 'Power Search',
        titletxtJobListMap: 'Job List',
        paramsSearch: "P",
        isNotfound: false,
        isDirectFromMap: false,





        setTmp: function() {
            // alert("Region");
            // ddlregion

            if (kendo.ui.DropDownList) {
                $("#ddlregion").kendoDropDownList({
                    change: function(e) {
                        if (e.sender.selectedIndex != 0) {
                            indexRegion = e.sender.selectedIndex;
                            // ddlzone
                            if (kendo.ui.DropDownList) {
                                $("#ddlzone").kendoDropDownList({
                                    dataTextField: "zoneDesc",
                                    dataValueField: "zoneId",
                                    optionLabel: "---Select---",
                                    dataSource: new kendo.data.DataSource({
                                        transport: {
                                            read: function(operation) {
                                                if (app.configService.isMorkupData) {
                                                    var response = _getRegionListTTSME.regions[indexRegion - 1];
                                                    operation.success(response);
                                                } else {
                                                    var response = _getRegionListTTSME.regions[indexRegion - 1];
                                                    operation.success(response);
                                                }
                                            }
                                        },
                                        schema: {
                                            data: "zones"
                                        }
                                    })
                                });
                            }
                        } else {
                            if (kendo.ui.DropDownList) {
                                $("#ddlzone").kendoDropDownList();
                                var dropdownlist = $("#ddlzone").data("kendoDropDownList");
                                dropdownlist.select(0);
                                dropdownlist.destroy();



                            }
                        }
                    },

                    dataTextField: "regionNameEn",
                    dataValueField: "regionId",
                    optionLabel: "---Select---",
                    dataSource: new kendo.data.DataSource({
                        transport: {
                            read: function(operation) {
                                if (app.configService.isMorkupData) {
                                    var response = _getRegionListTTSME;
                                    operation.success(response);
                                } else {
                                    $.ajax({ //using jsfiddle's echo service to simulate remote data loading
                                        beforeSend: app.loginService.viewModel.checkOnline,
                                        type: "POST",
                                        timeout: 180000,
                                        url: app.configService.serviceUrl + 'post-json.service?s=master-service&o=getRegionListTTSME.json',
                                        data: JSON.stringify({
                                            "token": localStorage.getItem("token"),
                                            "userId": JSON.parse(localStorage.getItem("profileData")).userId,
                                            "version": "2"
                                        }),
                                        dataType: "json",
                                        contentType: 'application/json',
                                        success: function(response) {
                                            _getRegionListTTSME = response;
                                            operation.success(response);
                                        },
                                        error: function(xhr, error) {
                                            if (!app.ajaxHandlerService.error(xhr, error)) {
                                                navigator.notification.alert(xhr.status + ' ' + error,
                                                    function() {}, "get regions", 'OK');
                                            }
                                            return;
                                        },
                                        complete: function() {
                                            var regionId = JSON.parse(localStorage.getItem("profileData")).profiles[0].regionId;
                                            if (regionId) {
                                                var dropdownlist = $("#ddlregion").data("kendoDropDownList")
                                                    //dropdownlist.value(regionId);
                                                dropdownlist.select(function(dataItem) {
                                                    return dataItem.regionId === regionId;
                                                });
                                                var idx = dropdownlist.select();
                                                $("#ddlzone").kendoDropDownList({
                                                    dataTextField: "zoneDesc",
                                                    dataValueField: "zoneId",
                                                    optionLabel: "---Select---",
                                                    dataSource: new kendo.data.DataSource({
                                                        transport: {
                                                            read: function(operation) {
                                                                if (app.configService.isMorkupData) {
                                                                    var response = _getRegionListTTSME.regions[idx - 1];
                                                                    operation.success(response);
                                                                } else {
                                                                    var response = _getRegionListTTSME.regions[idx - 1];
                                                                    operation.success(response);
                                                                }
                                                            }
                                                        },
                                                        schema: {
                                                            data: "zones"
                                                        }
                                                    })
                                                });
                                            }
                                        }
                                    });
                                }
                            }
                        },
                        schema: {
                            data: "regions"
                        }
                    })
                });
            }
            // ddlstatus
            if (kendo.ui.DropDownList) {
                $("#ddlstatus").kendoDropDownList({
                    dataTextField: "status",
                    dataValueField: "jbStatusId",
                    optionLabel: "---Select---",
                    dataSource: new kendo.data.DataSource({
                        transport: {
                            read: function(operation) {
                                if (app.configService.isMorkupData) {
                                    var response = _getJobStatusTTSME;
                                    operation.success(response);
                                } else {
                                    $.ajax({ //using jsfiddle's echo service to simulate remote data loading
                                        beforeSend: app.loginService.viewModel.checkOnline,
                                        type: "POST",
                                        timeout: 180000,
                                        url: app.configService.serviceUrl + 'post-json.service?s=master-service&o=getJobStatus.json',
                                        data: JSON.stringify({
                                            "token": localStorage.getItem("token"),
                                            "userId": JSON.parse(localStorage.getItem("profileData")).userId,
                                            "version": "2"
                                        }),
                                        dataType: "json",
                                        contentType: 'application/json',
                                        success: function(response) {
                                            _getJobStatusTTSME = response;
                                            //store response
                                            //localStorage.setItem("regionData", JSON.stringify(response));
                                            //pass the pass response to the DataSource
                                            //navigator.notification.alert(JSON.stringify(response),
                                            //                        function () { }, "Get Team failed", 'OK');
                                            operation.success(response);
                                            ////console.log("Multi :" + JSON.stringify(response));
                                            ////console.log("fetch Multiple job type : Complete");
                                        },
                                        error: function(xhr, error) {
                                            if (!app.ajaxHandlerService.error(xhr, error)) {
                                                ////console.log("fetch Multiple job type");
                                                ////console.log(xhr);
                                                ////console.log(error);
                                                navigator.notification.alert(xhr.status + ' ' + error,
                                                    function() {}, "get jobStatus", 'OK');
                                            }
                                            return;
                                        }
                                    });
                                }
                            }
                        },
                        schema: {
                            data: "jobStatus"
                        }
                    })
                });
            }
            // ddlpiority
            if (kendo.ui.DropDownList) {
                $("#ddlpiority").kendoDropDownList({
                    dataTextField: "name",
                    dataValueField: "id",
                    optionLabel: "---Select---",
                    dataSource: new kendo.data.DataSource({
                        transport: {
                            read: function(operation) {
                                // alert("init");
                                if (app.configService.isMorkupData) {
                                    var response = _getPriorityTTSME;
                                    operation.success(response);
                                } else {
                                    $.ajax({ //using jsfiddle's echo service to simulate remote data loading
                                        beforeSend: app.loginService.viewModel.checkOnline,
                                        type: "POST",
                                        timeout: 180000,
                                        url: app.configService.serviceUrl + 'post-json.service?s=master-service&o=getPriority.json',
                                        data: JSON.stringify({
                                            "token": localStorage.getItem("token"),
                                            "userId": JSON.parse(localStorage.getItem("profileData")).userId,
                                            "version": "2"
                                        }),
                                        dataType: "json",
                                        contentType: 'application/json',
                                        success: function(response) {
                                            _getPriorityTTSME = response;
                                            //store response
                                            //localStorage.setItem("regionData", JSON.stringify(response));
                                            //pass the pass response to the DataSource
                                            //navigator.notification.alert(JSON.stringify(response),
                                            //                        function () { }, "Get Team failed", 'OK');
                                            operation.success(response);
                                            ////console.log("Multi :" + JSON.stringify(response));
                                            ////console.log("fetch Multiple job type : Complete");
                                        },
                                        error: function(xhr, error) {
                                            if (!app.ajaxHandlerService.error(xhr, error)) {
                                                ////console.log("fetch Multiple job type");
                                                ////console.log(xhr);
                                                ////console.log(error);
                                                navigator.notification.alert(xhr.status + ' ' + error,
                                                    function() {}, "get priorityList", 'OK');
                                            }
                                            return;
                                        }
                                    });
                                }
                            }
                        },
                        schema: {
                            data: "priorityList"
                        }
                    })
                });
            }
        },

        faback: function() {
            location.reload();
        },
        showResult: function() {
            var that = this,
                JBs,
                Photo;
            app.application.showLoading();
            var jobid = that.get("jobid");
            var ddlregion = ($("#ddlregion").data("kendoDropDownList") ? $("#ddlregion").data("kendoDropDownList").value() : "");
            var ddlzone = ($("#ddlzone").data("kendoDropDownList") ? $("#ddlzone").data("kendoDropDownList").value() : "");
            var sitecode = that.get("sitecode");
            var assignDateFrom = that.get("assignDateFrom");
            var assignDateTo = that.get("assignDateTo");
            var finishDateFrom = that.get("finishDateFrom");
            var finishDateTo = that.get("finishDateTo");
            var ddlstatus = ($("#ddlstatus").data("kendoDropDownList") ? $("#ddlstatus").data("kendoDropDownList").value() : "");
            var ddlpiority = ($("#ddlpiority").data("kendoDropDownList") ? $("#ddlpiority").data("kendoDropDownList").value() : "");
            var title = that.get("title");
            var siteNameThai = that.get("siteNameThai");
            var assignTo = that.get("assignTo");
            var assignBy = that.get("assignBy");
            var paramsSearch = that.get("paramsSearch");
            var isValid = false;
            if ((jobid && jobid.length >= 1) || (sitecode && sitecode.length >= 1)) {
                isValid = true;
            } else {
                if (ddlzone && ddlzone) {
                    isValid = true;
                } else {
                    // that.set("ddlzone");
                    app.application.hideLoading();
                    alert("โปรดเลือก Field Zone");
                }
            }
            //var networkState = navigator.connection.type;
            if (isValid) {
                var isOffline = app.loginService.viewModel.get("isOffline");

                if (!isOffline) {
                    JBs = new kendo.data.DataSource({
                        transport: {
                            read: function(operation) {

                                if (app.configService.isMorkupData) {
                                    var response = {
                                        "version": "1",
                                        "userId": "7478",
                                        "jobId": "",
                                        "region": "",
                                        "zone": "",
                                        "siteCode": "",
                                        "assignDateFrom": "20131009",
                                        "assignDateTo": "20140110",
                                        "finishDateFrom": "20131011",
                                        "finishDateTo": "20140112",
                                        "status": "",
                                        "priority": "",
                                        "title": "",
                                        "siteNameTh": "",
                                        "assignTo": "",
                                        "assignBy": "",
                                        "page": "",
                                        "jobs": [{
                                            "jobId": "JB14-268795",
                                            "title": "RWH2-REPEATER FAIL > 15 mins-1|-|2|-|",
                                            "assignBy": "2572",
                                            "assignByName": "Panithan Paladsingh",
                                            "assignTo": "7478",
                                            "assignToName": "Hansa Saensing",
                                            "initiateDate": 1401077966000,
                                            "finishDate": 1401088740000,
                                            "siteAccessDesc": "RWH2(BSCST23,MSSTLC1E)",
                                            "priorityId": "4",
                                            "priorityName": "Critical",
                                            "statusId": "04",
                                            "status": "On-Site",
                                            "systemName": "GSM900(All)",
                                            "siteAffect": "RWH2(BSCST23,MSSTLC1E)",
                                            "reportTypeId": null,
                                            "report": null,
                                            "oldReportDetail": null,
                                            "trId": null,
                                            "faultAlarmNumber": null,
                                            "ttId": "TT14-287115",
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
                                            "groupJob": "TT14-287115",
                                            "siteNameTh": "โรงพยาบาลราชวิถี2",
                                            "siteNameEn": "RATWITHI HOSPITAL2"
                                        }, {
                                            "jobId": "JB14-271316",
                                            "title": "12AL_LF-test mobile ",
                                            "assignBy": "7478",
                                            "assignByName": "Hansa Saensing",
                                            "assignTo": "7478",
                                            "assignToName": "Hansa Saensing",
                                            "initiateDate": 1414550280000,
                                            "finishDate": 1414561080000,
                                            "siteAccessDesc": "12AL_LF",
                                            "priorityId": "4",
                                            "priorityName": "Critical",
                                            "statusId": "05",
                                            "status": "Waiting for Report",
                                            "systemName": "GSM900(All),3G900(All),3G2100(All),GSM1800",
                                            "siteAffect": "12AL_LF",
                                            "reportTypeId": "01",
                                            "report": null,
                                            "oldReportDetail": "Test\n",
                                            "trId": null,
                                            "faultAlarmNumber": null,
                                            "ttId": "TT14-586854",
                                            "reportTypeDesc": "Solution Complete",
                                            "waitingReport": "Y",
                                            "latitude": null,
                                            "longtitude": null,
                                            "cntProblemCause": "2",
                                            "cntProblemSolve": "0",
                                            "reportType": "02",
                                            "cntProcess": "0",
                                            "cntProblemSolvePerTemp": "0",
                                            "reasonOverdueId": "11",
                                            "reasonOverdueDesc": "เข้าสถานที่ไม่ได้",
                                            "groupJob": "TT14-586854",
                                            "siteNameTh": "วัน-ทู-ออล พนาสินเพลส (+O2K Thailand+A Multimediaใช้ Last mile เส้นเดียวกัน)",
                                            "siteNameEn": "วัน-ทู-ออล พนาสินเพลส (+O2K Thailand+A Multimediaใช้ Last mile เส้นเดียวกัน)"
                                        }, {
                                            "jobId": "JB14-271314",
                                            "title": "12AL_LF-test SMS",
                                            "assignBy": "7478",
                                            "assignByName": "Hansa Saensing",
                                            "assignTo": "7478",
                                            "assignToName": "Hansa Saensing",
                                            "initiateDate": 1414550040000,
                                            "finishDate": 1414561200000,
                                            "siteAccessDesc": "12AL_LF,12TM_LF",
                                            "priorityId": "4",
                                            "priorityName": "Critical",
                                            "statusId": "02",
                                            "status": "Accept",
                                            "systemName": "GSM900(All),3G900(All),3G2100(All),GSM1800",
                                            "siteAffect": "12AL_LF",
                                            "reportTypeId": "01",
                                            "report": null,
                                            "oldReportDetail": "Test",
                                            "trId": null,
                                            "faultAlarmNumber": null,
                                            "ttId": "TT14-586854",
                                            "reportTypeDesc": "Solution Complete",
                                            "waitingReport": null,
                                            "latitude": "13.782762",
                                            "longtitude": "100.546392",
                                            "cntProblemCause": "1",
                                            "cntProblemSolve": "0",
                                            "reportType": "02",
                                            "cntProcess": "0",
                                            "cntProblemSolvePerTemp": "0",
                                            "reasonOverdueId": "22",
                                            "reasonOverdueDesc": "เจ้าของอาคารและการไฟฟ้าดับไฟ",
                                            "groupJob": "TT14-586854",
                                            "siteNameTh": "วัน-ทู-ออล พนาสินเพลส (+O2K Thailand+A Multimediaใช้ Last mile เส้นเดียวกัน)",
                                            "siteNameEn": "วัน-ทู-ออล พนาสินเพลส (+O2K Thailand+A Multimediaใช้ Last mile เส้นเดียวกัน)"
                                        }, {
                                            "jobId": "JB14-271314",
                                            "title": "12AL_LF-test SMS",
                                            "assignBy": "7478",
                                            "assignByName": "Hansa Saensing",
                                            "assignTo": "7478",
                                            "assignToName": "Hansa Saensing",
                                            "initiateDate": 1414550040000,
                                            "finishDate": 1414561200000,
                                            "siteAccessDesc": "12AL_LF,12TM_LF",
                                            "priorityId": "4",
                                            "priorityName": "Critical",
                                            "statusId": "02",
                                            "status": "Accept",
                                            "systemName": "GSM900(All),3G900(All),3G2100(All),GSM1800",
                                            "siteAffect": "12AL_LF",
                                            "reportTypeId": "01",
                                            "report": null,
                                            "oldReportDetail": "Test",
                                            "trId": null,
                                            "faultAlarmNumber": null,
                                            "ttId": "TT14-586854",
                                            "reportTypeDesc": "Solution Complete",
                                            "waitingReport": null,
                                            "latitude": "13.782762",
                                            "longtitude": "100.546392",
                                            "cntProblemCause": "1",
                                            "cntProblemSolve": "0",
                                            "reportType": "02",
                                            "cntProcess": "0",
                                            "cntProblemSolvePerTemp": "0",
                                            "reasonOverdueId": "22",
                                            "reasonOverdueDesc": "เจ้าของอาคารและการไฟฟ้าดับไฟ",
                                            "groupJob": "TT14-586854",
                                            "siteNameTh": "1-To-All ถนอมมิตรปาร์ค",
                                            "siteNameEn": "1-To-All ถนอมมิตรปาร์ค"
                                        }, {
                                            "jobId": "JB14-271339",
                                            "title": "3BMPCWD04B-test SMS",
                                            "assignBy": "7478",
                                            "assignByName": "Hansa Saensing",
                                            "assignTo": "7478",
                                            "assignToName": "Hansa Saensing",
                                            "initiateDate": 1414552500000,
                                            "finishDate": 1414576680000,
                                            "siteAccessDesc": "3BMPCWD04B,3G2100,3I200CWD01B,3INVCWD01B,3IPVCWD01B,3MDBCWD01B",
                                            "priorityId": "4",
                                            "priorityName": "Critical",
                                            "statusId": "03",
                                            "status": "Initiate",
                                            "systemName": "GSM900(All),3G900(All),3G2100(All),GSM1800",
                                            "siteAffect": "3BMPCWD04B",
                                            "reportTypeId": null,
                                            "report": null,
                                            "oldReportDetail": null,
                                            "trId": null,
                                            "faultAlarmNumber": null,
                                            "ttId": "TT14-586726",
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
                                            "groupJob": "TT14-586726",
                                            "siteNameTh": "3MDBCWD01B แจ้งวัฒนะดาต้าเซ็นเตอร์",
                                            "siteNameEn": "3MDBCWD01B CWT Data Center"
                                        }, {
                                            "jobId": "JB14-271678",
                                            "title": "2IPTNJ08CWDC_2EQ02C6-TST-PD-Gen_20141113-2006",
                                            "assignBy": "9094",
                                            "assignByName": "Praweena Sangprakan",
                                            "assignTo": "7478",
                                            "assignToName": "Hansa Saensing",
                                            "initiateDate": 1415926800000,
                                            "finishDate": 1450004400000,
                                            "siteAccessDesc": "2IPTNJ08CWDC_2EQ02C6",
                                            "priorityId": "1",
                                            "priorityName": "None",
                                            "statusId": "01",
                                            "status": "Assign",
                                            "systemName": "GSM900(All),3G900(All)",
                                            "siteAffect": "2IPTNJ08CWDC_2EQ02C6",
                                            "reportTypeId": null,
                                            "report": null,
                                            "oldReportDetail": null,
                                            "trId": null,
                                            "faultAlarmNumber": null,
                                            "ttId": "TT14-587212",
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
                                            "groupJob": "TT14-587212",
                                            "siteNameTh": "IPTNJ#08_CWDC_FL2_PE01 (แจ้งวัฒนะดาต้าเซ็นเตอร์_ชั่น2_ห้อง5_IPTNJ)",
                                            "siteNameEn": "IPTNJ#08_CWDC_FL2_PE01 (CWDC_FL2_Room5_IPTNJ)"
                                        }]
                                    };
                                    operation.success(response);
                                    that.set("lastupdateaccept", format_time_date(new Date()));
                                    // app.myService.viewModel.hideLoading();
                                } else {
                                    $.ajax({ //using jsfiddle's echo service to simulate remote data loading
                                        beforeSend: app.loginService.viewModel.checkOnline,
                                        type: "POST",
                                        timeout: 180000,
                                        url: app.configService.serviceUrl + 'post-json.service?s=transaction-service&o=getPowerSearchTTSME.json',
                                        data: JSON.stringify({
                                            "token": localStorage.getItem("token"),
                                            "userId": JSON.parse(localStorage.getItem("profileData")).userId,
                                            "version": "2",
                                            "assignBy": assignBy,
                                            //
                                            "assignDateFrom": assignDateFrom,
                                            "assignDateTo": assignDateTo,
                                            "assignTo": assignTo,
                                            //
                                            "finishDateFrom": finishDateFrom,
                                            "finishDateTo": finishDateTo,
                                            "jobId": jobid,
                                            "page": paramsSearch,
                                            "priority": ddlpiority,
                                            "region": ddlregion,
                                            "siteCode": sitecode,
                                            "siteNameTh": siteNameThai,
                                            "status": ddlstatus,
                                            "title": title,
                                            "zone": ddlzone
                                        }),
                                        dataType: "json",
                                        contentType: 'application/json',
                                        success: function(response) {
                                            //store response
                                            if (response && response.jobs && response.jobs.length >= 1) {
                                                that.set("isNotfound", false);
                                            } else {
                                                that.set("isNotfound", true);
                                            }
                                            operation.success(response);

                                        },
                                        error: function(xhr, error) {
                                            that.hideLoading();
                                            that.set("isNotfound", true);
                                            if (!app.ajaxHandlerService.error(xhr, error)) {
                                                cache = localStorage.getItem("jbData");

                                                if (cache != null && cache != undefined) {
                                                    operation.success(JSON.parse(cache));
                                                } else {
                                                    ////console.log("Get My Job failed");
                                                    ////console.log(xhr);
                                                    ////console.log(error);
                                                    navigator.notification.alert(xhr.status + error,
                                                        function() {}, "Get Power Search TTSME failed", 'OK');
                                                    return;
                                                }
                                            }
                                        },
                                        complete: function() {
                                            // that.countAccept();         
                                            //app.application.hideLoading();                               
                                            that.set("lastupdateaccept", format_time_date(new Date()));

                                            that.set("paramsSearch", "P");
                                        }
                                    });
                                }

                            }
                        },
                        schema: {
                            data: "jobs"
                        },
                        model: {
                            id: "jobId"
                        }
                    });
                } else {
                    JBs = new kendo.data.DataSource({
                        data: JSON.parse(localStorage.getItem("jbData")),

                        schema: {
                            data: "jobs"
                        },
                        model: {
                            id: "jobId"
                        }

                    });

                }

                app.jobService.viewModel.set("jobDataSource", JBs);

                if ($("#lvPowerSearchList").data("kendoMobileListView") == undefined || $("#lvPowerSearchList").data("kendoMobileListView") == null) {
                    $("#lvPowerSearchList").kendoMobileListView({
                        dataSource: JBs,
                        //style: "inset",
                        template: $("#psearch-template").html(),
                        // pullToRefresh: true,
                        // endlessScroll: true
                    });

                } else {
                    $("#lvPowerSearchList").data("kendoMobileListView").setDataSource(JBs);

                }

                app.application.navigate(
                    '#powerService'

                );
            }

            // $('.c_div_searchResult').hide();
        },
        filterAllocateEvent: function() {
            var that = app.powerSearchService.viewModel;
            //that.showLoading();
            var allocateFilter = that.get("allocateFilter");
            //console.log(assignFilter);

            var lvPowerSearchList = $("#lvPowerSearchList").data("kendoMobileListView");
            // ////console.log("Assign Filter : " + index);
            // that.showLoading();
            var filterJob = {
                logic: "or",
                filters: [{
                    field: "jobId",
                    operator: "contains",
                    value: allocateFilter
                }, {
                    field: "title",
                    operator: "contains",
                    value: allocateFilter
                }, {
                    field: "assignByName",
                    operator: "contains",
                    value: allocateFilter
                }, {
                    field: "siteAccessDesc",
                    operator: "contains",
                    value: allocateFilter
                }]
            };

            lvPowerSearchList.dataSource.filter(filterJob);
            //jigkoh comment for not re-read datasource
            //lvPowerSearchList.dataSource.read();
            lvPowerSearchList.refresh();
            app.application.view().scroller.reset();
        },
        onSearch: function() {
            var that = this
            that.set("isSearch", !that.get("isSearch"));
            that.set("searchtxt", "");

        },
        openActSheetPowerService: function() {
            $("#sortActionSheetPowerService").data("kendoMobileActionSheet").open();
        },
        onPowerServiceSortby: function(fieldName) {
            console.debug(fieldName);
            var switchInstance = $("#switchPowerService").data("kendoMobileSwitch");
            console.log(switchInstance.check());
            var lvPowerSearchList = $("#lvPowerSearchList").data("kendoMobileListView");

            lvPowerSearchList
                .dataSource.sort({
                    field: fieldName,
                    dir: switchInstance.check() ? "asc" : "desc"
                });
            //jigkoh comment for not re-read datasource
            //lvReallocate.dataSource.read();
            lvPowerSearchList.refresh();
            app.application.view().scroller.reset();
            $("#sortActionSheetPowerService").data("kendoMobileActionSheet").close();

        },
        backToMap: function() {
            //alert("backToMap");
            app.mapService.viewModel.set("mapFromMode", "A");
            //app.mapService.viewModel.set("latitude", e.dataItem.latitude);
            //app.mapService.viewModel.set("longitude", e.dataItem.longitude);
            app.application.navigate(
                '#tabstrip-map'
            );
        },
    });
    app.powerSearchService = {
        viewModel: new powerSearchViewModel(),
        init: function() {
            // alert("init");

            app.powerSearchService.viewModel.setTmp();

            ////console.log('loading Login');
        },

        // show: function() {
        //     // alert("show");
        //     //app.powerSearchService.viewModel.checkBypass();
        //     //navigator.splashscreen.hide();
        // },
        show: function() {

            ////console.log("myteam show start");
            // app.myService.viewModel.showLoading();

            var isOffline = app.loginService.viewModel.get("isOffline");
            if (!isOffline) {
                sleep(1000);
                //setTimeout(function () {
                //app.myService.viewModel.loadMy();
                //}
                //, 1000);
            } else {
                if (app.loginService.viewModel.get("isOffline") != true) {
                    navigator.notification.alert("offline",
                        function() {
                            app.myService.viewModel.hideLoading();
                        }, "Internet Connection", 'OK');
                }
            }


            $('#jobid').val('');
            $("#ddlregion").data("kendoDropDownList").select(0);

            var ddlZone = $("#ddlzone").data("kendoDropDownList");
            if (ddlZone) {
                $("#ddlzone").data("kendoDropDownList").select(0)
            }
            $('#sitecode').val('');
            $('#assignDateFrom').val('');
            $('#assignDateTo').val('');
            $('#finishDateFrom').val('');
            $('#finishDateTo').val('');
            $("#ddlstatus").data("kendoDropDownList").select(0);
            $("#ddlpiority").data("kendoDropDownList").select(0);
            $('#title').val('');
            $('#siteNameThai').val('');
            $('#assignTo').val('');
            $('#assignBy').val('');
            //app.myService.viewModel.hideLoading(////console.logle.debug("myteam hide hide");


            app.powerSearchService.viewModel.setTmp();


        },
        hide: function() {
            // alert("hide");

            //navigator.splashscreen.hide();
        },
    };
})(window);
