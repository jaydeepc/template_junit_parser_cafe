         $(document).ready(function() {

//                $("#toggle-view").hide();
//                $("#card-view").show();
                front_face_red_pat = "../img/red_pat.jpg";
                front_face_orange_pat = "../img/orange_pat.jpg";
                front_face_green_pat = "../img/green_pat.jpg";
                front_face_yellow_pat = "../img/yellow_pat.jpg";

                $.getJSON('../data/result.json', function(jd) {
                    for (i = 0; i < jd.results.length; i++) {
                        if (jd.results[i].result == "FAILED"){
                            $('#container').append(
                                '<div id="f1_container" style="float:left;border:10px solid white;">' +
                                    '<div id="f1_card" class="shadow">' +
                                        '<div class="front face" style="background-image: url(' + front_face_red_pat + ');">' +
                                            '<div id="inside">' +
                                                '<h2>Test Name</h2>' +
                                                '<p>'+ jd.results[i].test_method_name+'</p>' +
                                                '<br>' +
                                                '<br>' +
                                                '<h2>Class</h2>' +
                                                '<p>' + jd.results[i].test_class_name +'</p>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="back face" style="background-image: url(' + front_face_red_pat + ');">' +
                                            '<div class="trace"><h2>Console Trace</h2><hr width="100%"><pre>' +jd.results[i].failure_trace + '</pre><hr width="100%"></div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>');
                        }
                        else if(jd.results[i].result == "ERROR"){
                            $('#container_error').append(
                                '<div id="f1_container" style="float:left;border:10px solid white;">' +
                                    '<div id="f1_card" class="shadow">' +
                                        '<div class="front face" style="background-image: url(' + front_face_orange_pat + ');">' +
                                            '<div id="inside">' +
                                                '<h2>Test Name</h2>' +
                                                '<p>'+ jd.results[i].test_method_name+'</p>' +
                                                '<br>' +
                                                '<br>' +
                                                '<h2>Class</h2>' +
                                                '<p>' + jd.results[i].test_class_name +'</p>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="back face" style="background-image: url(' + front_face_orange_pat + ');">' +
                                            '<div class="trace"><h2>Console Trace</h2><hr width="100%"><pre>' +jd.results[i].error_trace + '</pre><hr width="100%"></div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>');

                        }
                        else if(jd.results[i].result == "PASSED"){
                            $('#container_pass').append(
                                '<div id="f1_container" style="float:left;border:10px solid white;">' +
                                    '<div id="f1_card" class="shadow">' +
                                        '<div class="front face" style="background-image: url(' + front_face_green_pat + ');">' +
                                            '<div id="inside">' +
                                                '<h2>Test Name</h2>' +
                                                '<p>'+ jd.results[i].test_method_name+'</p>' +
                                                '<br>' +
                                                '<br>' +
                                                '<h2>Class</h2>' +
                                                '<p>' + jd.results[i].test_class_name +'</p>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="back face" style="background-image: url(' + front_face_green_pat + ');">' +
                                            '<div class="trace" align="center"><h2>Nothing here!</h2><hr width="100%"><center><pre>Its all GREEN</pre><hr width="100%"></div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>');

                        }

                        else if(jd.results[i].result == "SKIPPED"){
                            $('#container_skip').append(
                                '<div id="f1_container" style="float:left;border:10px solid white;">' +
                                    '<div id="f1_card" class="shadow">' +
                                        '<div class="front face" style="background-image: url(' + front_face_yellow_pat + ');">' +
                                            '<div id="inside">' +
                                                '<h2>Test Name</h2>' +
                                                '<p>'+ jd.results[i].test_method_name+'</p>' +
                                                '<br>' +
                                                '<br>' +
                                                '<h2>Class</h2>' +
                                                '<p>' + jd.results[i].test_class_name +'</p>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="back face" style="background-image: url(' + front_face_yellow_pat + ');">' +
                                            '<div class="trace"><h2>Reason for skipping the test</h2><hr width="100%"><center><pre>' +jd.results[i].skipped_msg + '</pre><hr width="100%"></div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>');

                        }


                    }

                });

                $("#switch button").click(function(){
                    $("#card-view").hide();
                    $("#toggle-view").show();

                });

                $.getJSON('../data/result.json', function(jd) {
                    for (i = 0; i < jd.results.length; i++) {
                        if (jd.results[i].result == "FAILED"){
                            $(".pure-table").append(
                                '<tr><td><p>' + jd.results[i].test_method_name + '</p></td><td><p>' + jd.results[i].test_class_name + '</p></td><td><p>Info</p></td></tr>' +
                                '<tr><td colspan="3"><pre><p style="display: none">' + jd.results[i].failure_trace + '</p></pre>' +
                                '</td></tr>'


                            );
                        }
                    }
                });

                $(function() {
                    $("td[colspan=3]").find("p").hide();
                    $("table").click(function(event) {
                        event.stopPropagation();
                        var $target = $(event.target);
                        if ( $target.closest("td").attr("colspan") > 1 ) {
                            $target.slideUp();
                        } else {
                            $target.closest("tr").next().find("p").slideToggle();
                        }
                    });
                });




         });

