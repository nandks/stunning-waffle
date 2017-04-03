$(document).ready(function() {
    $('.drug-page').hide();
    $('#mydiv').hide();
    $('.description').hide();
    $('.login-page').show();
    $('#mydiv2').hide();
    $('#mydiv1').hide();
    $('.message a').click(function(e) {
        e.preventDefault();
        console.log('nandini');
        $('form').animate({
            height: "toggle",
            opacity: "toggle"
        }, "slow");
    });
   
     $('#map').click(function(e) {
        window.open("./static/res/js/21.html");
     } );  

    $('#login').click(function(e) {
        e.preventDefault();
        var email = $('#email').val();
        var pass = $('#pass').val();
        var req = { "email": email, "pass": pass };
        $.get('/checkregistered', req, function(data) {
            console.log(data);
            if (data == 'true') {
                console.log("login success");
                $('.login-page').addClass('not_vis');
                $('.login-page').hide();
                $('.drug-page').show();

            } else {
                console.log("login fail");
            }
        })

        // some colour variables
        var tcBlack = "#130C0E";

        // rest of vars
        var w = 960,
            h = 800,
            maxNodeSize = 50,
            x_browser = 20,
            y_browser = 25,
            root;

        var vis;
        var force = d3.layout.force();

        vis = d3.select("#design").append("svg").attr("width", w).attr("height", h);

        d3.json("res/js/marvel.json", function(json) {

            root = json;
            root.fixed = true;
            root.x = w / 2;
            root.y = h / 4;


            // Build the path
            var defs = vis.insert("svg:defs")
                .data(["end"]);


            defs.enter().append("svg:path")
                .attr("d", "M0,-5L10,0L0,5");

            update();
        });
        /**
         *   
         */
        function update() {
            var nodes = flatten(root),
                links = d3.layout.tree().links(nodes);

            // Restart the force layout.
            force.nodes(nodes)
                .links(links)
                .gravity(0.05)
                .charge(-1500)
                .linkDistance(100)
                .friction(0.5)
                .linkStrength(function(l, i) {
                    return 1;
                })
                .size([w, h])
                .on("tick", tick)
                .start();

            var path = vis.selectAll("path.link")
                .data(links, function(d) {
                    return d.target.id;
                });

            path.enter().insert("svg:path")
                .attr("class", "link")
                // .attr("marker-end", "url(#end)")
                .style("stroke", "#eee");


            // Exit any old paths.
            path.exit().remove();



            // Update the nodes…
            var node = vis.selectAll("g.node")
                .data(nodes, function(d) {
                    return d.id;
                });


            // Enter any new nodes.
            var nodeEnter = node.enter().append("svg:g")
                .attr("class", "node")
                .attr("transform", function(d) {
                    return "translate(" + d.x + "," + d.y + ")";
                })
                .on("click", click)
                .call(force.drag);

            // Append a circle
            nodeEnter.append("svg:circle")
                .attr("r", function(d) {
                    return Math.sqrt(d.size) / 10 || 4.5;
                })
                .style("fill", "#eee");


            // Append images
            var images = nodeEnter.append("svg:image")
                .attr("xlink:href", function(d) {
                    return d.img;
                })
                .attr("x", function(d) {
                    return -25;
                })
                .attr("y", function(d) {
                    return -25;
                })
                .attr("height", 50)
                .attr("width", 50);

            // make the image grow a little on mouse over and add the text details on click
            var setEvents = images
                // Append hero text
                .on('click', function(d) {
                    window.open(d.link);
                })

            .on('mouseenter', function() {
                    // select element in current context
                    d3.select(this)
                        .transition()
                        .attr("x", function(d) {
                            return -60;
                        })
                        .attr("y", function(d) {
                            return -60;
                        })
                        .attr("height", 100)
                        .attr("width", 100);
                })
                // set back
                .on('mouseleave', function() {
                    d3.select(this)
                        .transition()
                        .attr("x", function(d) {
                            return -25;
                        })
                        .attr("y", function(d) {
                            return -25;
                        })
                        .attr("height", 50)
                        .attr("width", 50);
                });

            // Append hero name on roll over next to the node as well
            nodeEnter.append("text")
                .attr("class", "nodetext")
                .attr("x", x_browser)
                .attr("y", y_browser + 15)
                .attr("fill", tcBlack)
                .text(function(d) {
                    return d.hero;
                });


            // Exit any old nodes.
            node.exit().remove();


            // Re-select for update.
            path = vis.selectAll("path.link");
            node = vis.selectAll("g.node");

            function tick() {


                path.attr("d", function(d) {

                    var dx = d.target.x - d.source.x,
                        dy = d.target.y - d.source.y,
                        dr = Math.sqrt(dx * dx + dy * dy);
                    return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
                });
                node.attr("transform", nodeTransform);
            }
        }
        
        function nodeTransform(d) {
            d.x = Math.max(maxNodeSize, Math.min(w - (d.imgwidth / 2 || 16), d.x));
            d.y = Math.max(maxNodeSize, Math.min(h - (d.imgheight / 2 || 16), d.y));
            return "translate(" + d.x + "," + d.y + ")";
        }
        
        function click(d) {
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            }

            update();
        }
        /**
         * Returns a list of all nodes under the root.
         */
        function flatten(root) {
            var nodes = [];
            var i = 0;

            function recurse(node) {
                if (node.children)
                    node.children.forEach(recurse);
                if (!node.id)
                    node.id = ++i;
                nodes.push(node);
            }

            recurse(root);
            return nodes;
        }

    });


    $('#register').click(function(e) {
        e.preventDefault();
        var name = $('#user_reg').val();
        var pass = $('#pass_reg').val();
        var email = $('#email_reg').val();
        var req = { "email": email, "password": pass, "name": name };
        $.post('/register', req, function(data) {
            console.log(data);
        })
    });



    $('#druggg').click(function(e) {
        e.preventDefault();
        var drug = $('#drugname').val();
        var req = { "drug": drug };
        $.get('/scraping', req, function(data) {
            console.log(data);
        })

    });

    var format1 = 0;
    var format2 = 0;
    var format3 = 0;
    $('#drugbutton').click(function(e) {
        e.preventDefault();
        $('#design').hide();
        //  $('#mydiv').show();
        var format = $('#myList').val();
        var req = { "format": format };
        $.get('/formatting', req, function(data) {
            if (format == '1') {
                $('#mydiv').show();
                $('#mydiv2').hide();
                $('#mydiv1').hide();
                $('.description').show();
                if (format1 == 0) {
                    format1 = 1;
                    var dataset = data;
                    //Set width and height as fixed variables
                    var w = 520;
                    var h = 500;
                    var padding = 25;

                    //Scale function for axes and radius
                    var yScale = d3.scale.linear()
                        .domain(d3.extent(dataset, function(d) {
                            return d.Potassium;
                        }))
                        .range([w + padding, padding]);

                    var xScale = d3.scale.ordinal()
                        .domain(dataset.map(function(d) {
                            return d.name;
                        }))
                        .rangeRoundBands([padding, h + padding], .5);

                    //To format axis as a percent
                    var formatPercent = d3.format("1");

                    //Create y axis
                    var yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(5).tickFormat(formatPercent);

                    //Define key function
                    var key = function(d) {
                        return d.name
                    };

                    //Define tooltip for hover-over info windows
                    var div = d3.select("#mydiv").append("div")
                        .attr("class", "tooltip")
                        .style("opacity", 0);

                    //Create svg element
                    var svg = d3.select("#mydiv").append("svg")
                        .attr("width", w).attr("height", h)
                        .attr("id", "chart")
                        .attr("viewBox", "0 0" + w + " " + h)
                        .attr("preserveAspectRatio", "xMinYMin");

                    //Resizing function to maintain aspect ratio (uses jquery)
                    var aspect = w / h;
                    var chart = $("#mydiv");
                    $(window).on("resize", function() {
                        var targetWidth = $("body").width();

                        if (targetWidth < w) {
                            chart.attr("width", targetWidth);
                            chart.attr("height", targetWidth / aspect);
                        } else {
                            chart.attr("width", w);
                            chart.attr("height", w / aspect);
                        }

                    });


                    //Initialize state of chart according to drop down menu
                    var state = d3.selectAll("option");

                    //Create barchart
                    svg.selectAll("rect")
                        .data(dataset, key)
                        .enter()
                        .append("rect")
                        .attr("class", function(d) {
                            return d.Potassium < 0 ? "negative" : "positive";
                        })
                        .attr({
                            x: function(d) {
                                return xScale(d.name);
                            },
                            y: function(d) {
                                return yScale(Math.max(0, d.Potassium));
                            },
                            width: xScale.rangeBand(),
                            height: function(d) {
                                return Math.abs(yScale(d.Potassium) - yScale(0));
                            }
                        })
                        .on('mouseover', function(d) {
                            d3.select(this)
                                .style("opacity", 0.2)
                                .style("stroke", "black")

                            var info = div
                                .style("opacity", 1)
                                .style("left", (d3.event.pageX + 10) + "px")
                                .style("top", (d3.event.pageY - 30) + "px")
                                .text(d.name);

                            if (state[0][0].selected) {
                                info.append("p")
                                    .text(formatPercent(d.Potassium));

                            } else if (state[0][1].selected) {
                                info.append("p")
                                    .text(formatPercent(d.user_drug));
                            } else if (state[0][2].selected) {
                                info.append("p")
                                    .text(formatPercent(d.metformin));
                            } else if (state[0][3].selected) {
                                info.append("p")
                                    .text(formatPercent(d.glucophage));
                            } else if (state[0][4].selected) {
                                info.append("p")
                                    .text(formatPercent(d.lantus));
                            } else if (state[0][5].selected) {
                                info.append("p")
                                    .text(formatPercent(d.avandia));
                            }


                        })
                        .on('mouseout', function(d) {
                            d3.select(this)
                                .style({ 'stroke-opacity': 0.5, 'stroke': '#a8a8a8' })
                                .style("opacity", 1);

                            div
                                .style("opacity", 0);
                        });

                    //Add y-axis
                    svg.append("g")
                        .attr("class", "y axis")
                        .attr("transform", "translate(40,0)")
                        .call(yAxis);

                    //Sort data when sort is checked
                    d3.selectAll(".checkbox").
                    on("change", function() {
                        var x0 = xScale.domain(dataset.sort(sortChoice())
                                .map(function(d) {
                                    return d.name
                                }))
                            .copy();

                        var transition = svg.transition().duration(750);
                        var delay = function(d, i) {
                            return i * 10;
                        };

                        transition.selectAll("rect")
                            .delay(delay)
                            .attr("x", function(d) {
                                return x0(d.name);
                            });

                    })

                    //Function to sort data when sort box is checked
                    function sortChoice() {
                        var state = d3.selectAll("option");
                        var sort = d3.selectAll(".checkbox");

                        if (sort[0][0].checked && state[0][0].selected) {
                            var out = function(a, b) {
                                return b.Potassium - a.Potassium;
                            }
                            return out;
                        } else if (sort[0][0].checked && state[0][1].selected) {
                            var out = function(a, b) {
                                return b.user_drug - a.user_drug;
                            }
                            return out;
                        } else if (sort[0][0].checked && state[0][2].selected) {
                            var out = function(a, b) {
                                return b.metformin - a.metformin;
                            }
                            return out;
                        } else if (sort[0][0].checked && state[0][3].selected) {
                            var out = function(a, b) {
                                return b.glucophage - a.glucophage;
                            }
                            return out;
                        } else if (sort[0][0].checked && state[0][4].selected) {
                            var out = function(a, b) {
                                return b.lantus - a.lantus;
                            }
                            return out;
                        } else if (sort[0][0].checked && state[0][5].selected) {
                            var out = function(a, b) {
                                return b.avandia - a.avandia;
                            }
                            return out;
                        } else {
                            var out = function(a, b) {
                                return d3.ascending(a.name, b.name);
                            }
                            return out;
                        }
                    };

                    //Change data to correct values on input change
                    d3.selectAll("select").
                    on("change", function() {

                        var value = this.value;

                        if (value == "user") {
                            var x_value = function(d) {
                                return d.user_drug;
                            };
                            var color = function(d) {
                                return d.user_drug < 0 ? "negative" : "positive";
                            };
                            var y_value = function(d) {
                                return yScale(Math.max(0, d.user_drug));
                            };
                            var height_value = function(d) {
                                return Math.abs(yScale(d.user_drug) - yScale(0));
                            };
                        } else if (value == "potassium") {
                            var x_value = function(d) {
                                return d.Potassium;
                            };
                            var color = function(d) {
                                return d.Potassium < 0 ? "negative" : "positive";
                            };
                            var y_value = function(d) {
                                return yScale(Math.max(0, d.Potassium));
                            };
                            var height_value = function(d) {
                                return Math.abs(yScale(d.Potassium) - yScale(0));
                            };
                        } else if (value == "metformin") {
                            var x_value = function(d) {
                                return d.metformin;
                            };
                            var color = function(d) {
                                return d.metformin < 0 ? "negative" : "positive";
                            };
                            var y_value = function(d) {
                                return yScale(Math.max(0, d.metformin));
                            };
                            var height_value = function(d) {
                                return Math.abs(yScale(d.metformin) - yScale(0));
                            };
                        } else if (value == "glucophage") {
                            var x_value = function(d) {
                                return d.glucophage;
                            };
                            var color = function(d) {
                                return d.glucophage < 0 ? "negative" : "positive";
                            };
                            var y_value = function(d) {
                                return yScale(Math.max(0, d.glucophage));
                            };
                            var height_value = function(d) {
                                return Math.abs(yScale(d.glucophage) - yScale(0));
                            };
                        } else if (value == "lantus") {
                            var x_value = function(d) {
                                return d.lantus;
                            };
                            var color = function(d) {
                                return d.lantus < 0 ? "negative" : "positive";
                            };
                            var y_value = function(d) {
                                return yScale(Math.max(0, d.lantus));
                            };
                            var height_value = function(d) {
                                return Math.abs(yScale(d.lantus) - yScale(0));
                            };
                        } else if (value == "avandia") {
                            var x_value = function(d) {
                                return d.avandia;
                            };
                            var color = function(d) {
                                return d.avandia < 0 ? "negative" : "positive";
                            };
                            var y_value = function(d) {
                                return yScale(Math.max(0, d.avandia));
                            };
                            var height_value = function(d) {
                                return Math.abs(yScale(d.avandia) - yScale(0));
                            };
                        }
                        //Update y scale
                        yScale.domain(d3.extent(dataset, x_value));

                        //Update with correct data
                        var rect = svg.selectAll("rect").data(dataset, key);
                        rect.exit().remove();

                        //Transition chart to new data
                        rect
                            .transition()
                            .duration(2000)
                            .ease("linear")
                            .each("start", function() {
                                d3.select(this)
                                    .attr("width", "0.2")
                                    .attr("class", color)
                            })
                            .attr({
                                x: function(d) {
                                    return xScale(d.name);
                                },
                                y: y_value,
                                width: xScale.rangeBand(),
                                height: height_value

                            });

                        //Update y-axis
                        svg.select(".y.axis")
                            .transition()
                            .duration(1000)
                            .ease("linear")
                            .call(yAxis);
                    });
                }
            }
            if (format == '2') {
                console.log("format 2");
                $('#mydiv1').show();
                $('#mydiv').hide();
                $('.description').hide();
                $('#mydiv2').hide();

                if (format2 == 0) {
                    console.log("format 2");
                    format2 = 1;
                    var flare = data;
                    var margin = { top: 20, right: 120, bottom: 20, left: 120 },
                        width = 960 - margin.right - margin.left,
                        height = 800 - margin.top - margin.bottom;

                    var i = 0,
                        duration = 750,
                        root;

                    var tree = d3.layout.tree()
                        .size([height, width]);

                    var diagonal = d3.svg.diagonal()
                        .projection(function(d) {
                            return [d.y, d.x];
                        });

                    var svg = d3.select("#mydiv1").append("svg")
                        .attr("width", width + margin.right + margin.left)
                        .attr("height", height + margin.top + margin.bottom)
                        .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



                    root = flare;
                    root.x0 = height / 2;
                    root.y0 = 0;

                    function collapse(d) {
                        if (d.children) {
                            d._children = d.children;
                            d._children.forEach(collapse);
                            d.children = null;
                        }
                    }

                    root.children.forEach(collapse);
                    update(root);


                    d3.select(self.frameElement).style("height", "800px");

                    function update(source) {

                        // Compute the new tree layout.
                        var nodes = tree.nodes(root).reverse(),
                            links = tree.links(nodes);

                        // Normalize for fixed-depth.
                        nodes.forEach(function(d) { d.y = d.depth * 180; });

                        // Update the nodes…
                        var node = svg.selectAll("g.node")
                            .data(nodes, function(d) {
                                return d.id || (d.id = ++i);
                            });

                        // Enter any new nodes at the parent's previous position.
                        var nodeEnter = node.enter().append("g")
                            .attr("class", "node")
                            .attr("transform", function(d) {
                                return "translate(" + source.y0 + "," + source.x0 + ")";
                            })
                            .on("click", click);

                        nodeEnter.append("circle")
                            .attr("r", 1e-6)
                            .style("fill", function(d) {
                                return d._children ? "lightsteelblue" : "#fff";
                            });

                        nodeEnter.append("text").style('fill', 'black')
                            .attr("x", function(d) {
                                return d.children || d._children ? -10 : 10;
                            })
                            .attr("dy", ".45em")
                            .attr("text-anchor", function(d) {
                                return d.children || d._children ? "end" : "start";
                            })
                            .text(function(d) {
                                return d.name;
                            })
                            .style("fill-opacity", 1e-6);

                        // Transition nodes to their new position.
                        var nodeUpdate = node.transition()
                            .duration(duration)
                            .attr("transform", function(d) {
                                return "translate(" + d.y + "," + d.x + ")";
                            });

                        nodeUpdate.select("circle")
                            .attr("r", 4.5)
                            .style("fill", function(d) {
                                return d._children ? "orange" : "#fff";
                            });

                        nodeUpdate.select("text")
                            .style("fill-opacity", 1);

                        // Transition exiting nodes to the parent's new position.
                        var nodeExit = node.exit().transition()
                            .duration(duration)
                            .attr("transform", function(d) {
                                return "translate(" + source.y + "," + source.x + ")";
                            })
                            .remove();

                        nodeExit.select("circle")
                            .attr("r", 1e-6);

                        nodeExit.select("text")
                            .style("fill-opacity", 1e-6);

                        // Update the links…
                        var link = svg.selectAll("path.link")
                            .data(links, function(d) {
                                return d.target.id;
                            });

                        // Enter any new links at the parent's previous position.
                        link.enter().insert("path", "g")
                            .attr("class", "link")
                            .attr("d", function(d) {
                                var o = { x: source.x0, y: source.y0 };
                                return diagonal({ source: o, target: o });
                            });

                        // Transition links to their new position.
                        link.transition()
                            .duration(duration)
                            .attr("d", diagonal);

                        // Transition exiting nodes to the parent's new position.
                        link.exit().transition()
                            .duration(duration)
                            .attr("d", function(d) {
                                var o = { x: source.x, y: source.y };
                                return diagonal({ source: o, target: o });
                            })
                            .remove();

                        // Stash the old positions for transition.
                        nodes.forEach(function(d) {
                            d.x0 = d.x;
                            d.y0 = d.y;
                        });
                    }

                    // Toggle children on click.
                    function click(d) {
                        if (d.children) {
                            d._children = d.children;
                            d.children = null;
                        } else {
                            d.children = d._children;
                            d._children = null;
                        }
                        update(d);
                    }

                }
            }
            if (format == '3') {
                $('#mydiv2').show();
                $('#mydiv').hide();
                $('.description').hide();

                $('#mydiv1').hide();
                if (format3 == 0) {
                    format3 = 1;
                    var freqData = data;
                    dashboard('#mydiv2', freqData);

                    function dashboard(id, fData) {
                        var barColor = 'steelblue';

                        function segColor(c) {
                            return { Blood_pressure: "#807dba", Kidney_disorder: "#e08214", thyroid_disorder: "#41ab5d", Infertility: "#000000", PCOS: "#880088" }[c];
                        }

                        // compute total for each state.
                        fData.forEach(function(d) { d.total = d.freq.Blood_pressure + d.freq.Kidney_disorder + d.freq.thyroid_disorder + d.freq.Infertility + d.freq.PCOS; });

                        // function to handle histogram.
                        function histoGram(fD) {
                            var hG = {},
                                hGDim = { t: 60, r: 0, b: 30, l: 0 };
                            hGDim.w = 500 - hGDim.l - hGDim.r,
                                hGDim.h = 300 - hGDim.t - hGDim.b;

                            //create svg for histogram.
                            var hGsvg = d3.select(id).append("svg")
                                .attr("width", hGDim.w + hGDim.l + hGDim.r)
                                .attr("height", hGDim.h + hGDim.t + hGDim.b).append("g")
                                .attr("transform", "translate(" + hGDim.l + "," + hGDim.t + ")");

                            // create function for x-axis mapping.
                            var x = d3.scale.ordinal().rangeRoundBands([0, hGDim.w], 0.1)
                                .domain(fD.map(function(d) {
                                    return d[0];
                                }));

                            // Add x-axis to the histogram svg.
                            hGsvg.append("g").attr("class", "x axis")
                                .attr("transform", "translate(0," + hGDim.h + ")")
                                .call(d3.svg.axis().scale(x).orient("bottom"));

                            // Create function for y-axis map.
                            var y = d3.scale.linear().range([hGDim.h, 0])
                                .domain([0, d3.max(fD, function(d) {
                                    return d[1];
                                })]);

                            // Create bars for histogram to contain rectangles and freq labels.
                            var bars = hGsvg.selectAll(".bar").data(fD).enter()
                                .append("g").attr("class", "bar");

                            //create the rectangles.
                            bars.append("rect")
                                .attr("x", function(d) {
                                    return x(d[0]);
                                })
                                .attr("y", function(d) {
                                    return y(d[1]);
                                })
                                .attr("width", x.rangeBand())
                                .attr("height", function(d) {
                                    return hGDim.h - y(d[1]);
                                })
                                .attr('fill', barColor)
                                .on("mouseover", mouseover) // mouseover is defined beBlood_pressure.
                                .on("mouseout", mouseout); // mouseout is defined beBlood_pressure.

                            //Create the frequency labels above the rectangles.
                            bars.append("text").text(function(d) {
                                    return d3.format(",")(d[1])
                                })
                                .attr("x", function(d) {
                                    return x(d[0]) + x.rangeBand() / 2;
                                })
                                .attr("y", function(d) {
                                    return y(d[1]) - 5;
                                })
                                .attr("text-anchor", "middle");

                            function mouseover(d) { // utility function to be called on mouseover.
                                // filter for selected state.
                                var st = fData.filter(function(s) {
                                        return s.State == d[0];
                                    })[0],
                                    nD = d3.keys(st.freq).map(function(s) {
                                        return { type: s, freq: st.freq[s] };
                                    });

                                // call update functions of pie-chart and legend.    
                                pC.update(nD);
                                leg.update(nD);
                            }

                            function mouseout(d) { // utility function to be called on mouseout.
                                // reset the pie-chart and legend.    
                                pC.update(tF);
                                leg.update(tF);
                            }

                            // create function to update the bars. This will be used by pie-chart.
                            hG.update = function(nD, color) {
                                // update the domain of the y-axis map to reflect change in frequencie
                                y.domain([0, d3.max(nD, function(d) {
                                    return d[1];
                                })]);

                                // Attach the new data to the bars.
                                var bars = hGsvg.selectAll(".bar").data(nD);

                                // transition the height and color of rectangles.
                                bars.select("rect").transition().duration(500)
                                    .attr("y", function(d) {
                                        return y(d[1]);
                                    })
                                    .attr("height", function(d) {
                                        return hGDim.h - y(d[1]);
                                    })
                                    .attr("fill", color);

                                // transition the frequency labels location and change value.
                                bars.select("text").transition().duration(500)
                                    .text(function(d) {
                                        return d3.format(",")(d[1])
                                    })
                                    .attr("y", function(d) {
                                        return y(d[1]) - 5;
                                    });
                            }
                            return hG;
                        }

                        // function to handle pieChart.
                        function pieChart(pD) {
                            var pC = {},
                                pieDim = { w: 250, h: 250 };
                            pieDim.r = Math.min(pieDim.w, pieDim.h) / 2;

                            // create svg for pie chart.
                            var piesvg = d3.select(id).append("svg")
                                .attr("width", pieDim.w).attr("height", pieDim.h).append("g")
                                .attr("transform", "translate(" + pieDim.w / 2 + "," + pieDim.h / 2 + ")");

                            // create function to draw the arcs of the pie slices.
                            var arc = d3.svg.arc().outerRadius(pieDim.r - 10).innerRadius(0);

                            // create a function to compute the pie slice angles.
                            var pie = d3.layout.pie().sort(null).value(function(d) {
                                return d.freq;
                            });

                            // Draw the pie slices.
                            piesvg.selectAll("path").data(pie(pD)).enter().append("path").attr("d", arc)
                                .each(function(d) { this._current = d; })
                                .style("fill", function(d) {
                                    return segColor(d.data.type);
                                })
                                .on("mouseover", mouseover).on("mouseout", mouseout);

                            // create function to update pie-chart. This will be used by histogram.
                            pC.update = function(nD) {
                                    piesvg.selectAll("path").data(pie(nD)).transition().duration(500)
                                        .attrTween("d", arcTween);
                                }
                                // Utility function to be called on mouseover a pie slice.
                            function mouseover(d) {
                                // call the update function of histogram with new data.
                                hG.update(fData.map(function(v) {
                                    return [v.State, v.freq[d.data.type]];
                                }), segColor(d.data.type));
                            }
                            //Utility function to be called on mouseout a pie slice.
                            function mouseout(d) {
                                // call the update function of histogram with all data.
                                hG.update(fData.map(function(v) {
                                    return [v.State, v.total];
                                }), barColor);
                            }
                            // Animating the pie-slice requiring a custom function which specifies
                            // how the intermediate paths should be drawn.
                            function arcTween(a) {
                                var i = d3.interpolate(this._current, a);
                                this._current = i(0);
                                return function(t) {
                                    return arc(i(t));
                                };
                            }
                            return pC;
                        }

                        // function to handle legend.
                        function legend(lD) {
                            var leg = {};

                            // create table for legend.
                            var legend = d3.select(id).append("table").attr('class', 'legend');

                            // create one row per segment.
                            var tr = legend.append("tbody").selectAll("tr").data(lD).enter().append("tr");

                            // create the first column for each segment.
                            tr.append("td").append("svg").attr("width", '16').attr("height", '16').append("rect")
                                .attr("width", '16').attr("height", '16')
                                .attr("fill", function(d) {
                                    return segColor(d.type);
                                });

                            // create the second column for each segment.
                            tr.append("td").text(function(d) {
                                return d.type;
                            });

                            // create the third column for each segment.
                            tr.append("td").attr("class", 'legendFreq')
                                .text(function(d) {
                                    return d3.format(",")(d.freq);
                                });

                            // create the fourth column for each segment.
                            tr.append("td").attr("class", 'legendPerc')
                                .text(function(d) {
                                    return getLegend(d, lD);
                                });

                            // Utility function to be used to update the legend.
                            leg.update = function(nD) {
                                // update the data attached to the row elements.
                                var l = legend.select("tbody").selectAll("tr").data(nD);

                                // update the frequencies.
                                l.select(".legendFreq").text(function(d) {
                                    return d3.format(",")(d.freq);
                                });

                                // update the percentage column.
                                l.select(".legendPerc").text(function(d) {
                                    return getLegend(d, nD);
                                });
                            }

                            function getLegend(d, aD) { // Utility function to compute percentage.
                                return d3.format("%")(d.freq / d3.sum(aD.map(function(v) {
                                    return v.freq;
                                })));
                            }

                            return leg;
                        }

                        // calculate total frequency by segment for all state.
                        var tF = ['Blood_pressure', 'Kidney_disorder', 'thyroid_disorder', 'Infertility', 'PCOS'].map(function(d) {
                            return {
                                type: d,
                                freq: d3.sum(fData.map(function(t) {
                                    return t.freq[d];
                                }))
                            };
                        });

                        // calculate total frequency by state for all segment.
                        var sF = fData.map(function(d) {
                            return [d.State, d.total];
                        });

                        var hG = histoGram(sF), // create the histogram.
                            pC = pieChart(tF), // create the pie-chart.
                            leg = legend(tF); // create the legend.
                    }

                }
            }
            if (format == '4') {

            }
        })
    });
});
