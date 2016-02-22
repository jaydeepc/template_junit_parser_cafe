         $(document).ready(function() {

               $.getJSON('../data/result.json', function(jd) {
                    $('#stage .pricing-table .price .green').append('<p><span>%</span>' + Math.round((jd.tests - jd.errors - jd.failures - jd.skips)*100/jd.tests) + '</p>')
                    $('#stage .pricing-table .price .orange').append('<p><span>%</span>' + Math.round((jd.errors)*100/jd.tests) + '</p>')
                    $('#stage .pricing-table .price .red').append('<p><span>%</span>' + Math.round((jd.failures)*100/jd.tests) + '</p>')
                    $('#stage .pricing-table .price .yellow').append('<p><span>%</span>' + Math.round((jd.skips)*100/jd.tests) + '</p>')
               });

                $.getJSON('../data/result.json', function(jd) {createPie((jd.tests - jd.errors - jd.failures - jd.skips), jd.failures, jd.errors, jd.skips)});

                function createPie(passCount, failCount, errorCount, skipCount){
                        AmCharts.makeChart("chartdiv",
                            {
                                "type": "pie",
                                "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
                                "depth3D": 5,
                                "innerRadius": "57%",
                                "labelRadius": 22,
                                "radius": 160,
                                "startAngle": 61.2,
                                "colors": [
                                    "#72C641",
                                    "#F77536",
                                    "#F5151C",
                                    "#F3CB0B"
                                ],
                                "hoverAlpha": 0.66,
                                "marginBottom": 20,
                                "maxLabelWidth": 1,
                                "outlineThickness": 0,
                                "titleField": "category",
                                "valueField": "column-1",
                                "autoDisplay": true,
                                "backgroundAlpha": 1,
                                "processCount": 1001,
                                "theme": "default",
                                "allLabels": [],
                                "balloon": {
                                    "animationDuration": 1.76,
                                    "borderThickness": 0.5,
                                    "disableMouseEvents": false,
                                    "fadeOutDuration": 0.68,
                                    "fontSize": 18,
                                    "pointerWidth": 25,
                                    "shadowAlpha": 1
                                },
                                "titles": [],
                                "dataProvider": [
                                    {
                                        "category": "Passed",
                                        "column-1": passCount
                                    },
                                    {
                                        "category": "Errors",
                                        "column-1": errorCount
                                    },
                                    {
                                        "category": "Failures",
                                        "column-1": failCount
                                    },
                                    {
                                        "category": "Skips",
                                        "column-1": skipCount
                                    }
                                ]
                            }
                        );
                }
				
         });

