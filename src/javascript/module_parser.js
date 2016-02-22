         $(document).ready(function() {

                $.getJSON('../data/result.json', function(jd) {
                    var module = {};
                    var modules = {};
                    var my_array = [];

                    for (i = 0; i < jd.results.length; i++) {
                        value = jd.results[i].test_class_name;
                        var count = (module[value] || 0) + 1;
//                        details['total'] = count;
                        module[value] = count;
                    }

                    for (key in module) {
                        var details = {};
                        pass_count_key = "pass_count";
                        var pass_count = 0;
                        fail_count_key = "fail_count";
                        var fail_count = 0;
                        for (i=0; i < jd.results.length; i++){
                            if(jd.results[i].test_class_name == key){
                                if (jd.results[i].result == 'PASSED'){
                                    pass_count = pass_count + 1;
                                }
                                else if (jd.results[i].result == 'FAILED'){
                                    fail_count = fail_count + 1;
                                }

                            }
                        }
                        details['total'] = module[key];
                        details[pass_count_key] = pass_count;
                        details[fail_count_key] = fail_count;
                        modules[key] = details;
                    }

                    for (key in modules){
                             $(".module-table").append(
                            '<tr><td>' + key+ '</td><td>' + modules[key]['total'] + '</td><td>' + modules[key]['pass_count'] + '</td><td>' + modules[key]['fail_count'] + '</td></tr>'

                        );
                        var data_for_graph = {};
                        data_for_graph['category'] = key;
                        data_for_graph['column-1'] = modules[key]['pass_count'];
                        data_for_graph['column-2'] = modules[key]['fail_count'];


                        my_array.push(data_for_graph);
                    }

                    createBar(my_array);
                    for (key in modules){
                            var confidence_color;
                            var pass_percent;
                            var ready_to_release = "";
                            pass_percent = Math.round((modules[key]['pass_count'])*100/modules[key]['total']);
                            if (pass_percent == 100){
                                confidence_color = "#7EC416";
                                ready_to_release = "most-popular";
                            }
                            else if (pass_percent >= 80 && pass_percent < 100){
                                confidence_color = "orange";
                            }
                            else {
                                confidence_color = "#E32D2D";
                            }

                             $("#pricing-table").append(
                            '<div class="plan" id="'+ ready_to_release +'"><h3>' + key + '<span>' + pass_percent + '%</span></h3>' +
                            '<div class="confidence" style="color: white; background-color: ' + confidence_color + '">' + 'Confidence' + '</div>' +
                            '<ul>' +
                                '<li><b>' + modules[key]['total'] + '</b> - Total Number of Tests</li>' +
                                '<li><b>' + modules[key]['pass_count'] + '</b> - Tests Passed</li>' +
                                '<li><b>' + modules[key]['fail_count'] + '</b> - Tests Failed</li>' +
                                '</ul></div>'

                        );
                    }
                });



                function createBar(data_array){
                        AmCharts.makeChart("chartdiv",
                            {
                                "type": "serial",
                                "categoryField": "category",
                                "startDuration": 1,
                                "categoryAxis": {
                                    "gridPosition": "start"
                                },
                                "trendLines": [],
                                "graphs": [
                                    {
                                        "balloonText": "[[title]] in [[category]]:[[value]]",
                                        "fillAlphas": 1,
                                        "id": "AmGraph-1",
                                        "title": "Tests Passed",
                                        "type": "column",
                                        "valueField": "column-1",
                                        "fillColors": "#7EC416"
                                    },
                                    {
                                        "balloonText": "[[title]] in [[category]]:[[value]]",
                                        "fillAlphas": 1,
                                        "id": "AmGraph-2",
                                        "title": "Tests Failed",
                                        "type": "column",
                                        "valueField": "column-2",
                                        "fillColors": "#E32D2D"
                                    }
                                ],
                                "guides": [],
                                "valueAxes": [
                                    {
                                        "id": "ValueAxis-1",
                                        "stackType": "regular",
                                        "title": "Axis title"
                                    }
                                ],
                                "allLabels": [],
                                "balloon": {},
                                "legend": {
                                    "enabled": true,
                                    "useGraphSettings": true
                                },
                                "titles": [
                                    {
                                        "id": "Title-1",
                                        "size": 15,
                                        "text": ""
                                    }
                                ],
                                "dataProvider": data_array
                            }
                        );
			}

         });

