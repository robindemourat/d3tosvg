'use strict';

/**
 * @ngdoc directive
 * @name visEngineApp.directive:visLinechart
 * @description
 * # visLinechart
 */
angular.module('visEngineApp')
  .directive('visLinechart', function () {
    return {
      restrict: 'C',
      scope : {
        data : '=visData',
        type : '=visDataType'
      },
      link: function postLink(scope, element, attrs) {
        var el = angular.element(element),
            svg = d3.select(el[0]),
            width, height,
            visMargin = {
              top : 0,
              right : 0,
              bottom : 20,
              left : 50
            },
            colors = d3.scale.category20b();

        svg.append("g")
              .attr("class", "x axis");

        svg.append("g")
              .attr("class", "y axis");

        var update = function(data, type){

          data = data.filter(function(d){
            return d.shown;
          })

          width = el.width();
          height = el.height();

          var x = d3.time.scale()
                  .range([visMargin.left, width - visMargin.left]);

          var y = d3.scale.linear()
              .range([height - visMargin.bottom, visMargin.top]);

          var xAxis = d3.svg.axis()
              .scale(x)
              .orient("bottom");

          var yAxis = d3.svg.axis()
              .scale(y)
              .orient("left");

          var line = d3.svg.line()
              .x(function(d) { return x(new Date(d.key).getTime()); })
              .y(function(d) { return y(d.yVal); })
              .interpolate('basis');


          var xExtent = [Infinity, -Infinity],
              yExtent = [Infinity, -Infinity];

          data.forEach(function(obj){
            var xE = d3.extent(obj.values, function(d) { return new Date(d.key).getTime(); });
            var yE = d3.extent(obj.values, function(d) { return d.yVal; });
            if(xE[0] < xExtent[0]){
              xExtent[0] = xE[0];
            }
            if(xE[1] > xExtent[1]){
              xExtent[1] = xE[1];
            }
            if(yE[0] < yExtent[0]){
              yExtent[0] = yE[0];
            }
            if(yE[1] > yExtent[1]){
             yExtent[1] = yE[1];
            }


          })

          x.domain(xExtent);
          y.domain(yExtent);

         svg.select('.x.axis')
              .attr("transform", "translate("+ 0 + "," + (height - visMargin.bottom )+ ")")
              .call(xAxis);


          svg.select('.y.axis').selectAll('.text').remove();

          svg.select('.y.axis')
              .attr('transform', 'translate('+visMargin.left+','+visMargin.top+')')
              .call(yAxis)
            .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .text("Compte");



          var lines = svg.selectAll('.group').data(data, function(d){
            return d.key;
          });


          var enterL = lines.enter().append('g').attr('class', 'group').attr('id', function(d){
            return d.key;
          });

          enterL.each(function(d, i){
            var dat = d;
            var l = d3.select(this).append('path')
              .datum(d.values)
              .attr("class", "line")
              .style('stroke', function(d){
                return dat.color;
              })
                .attr("d", line);
            l.on('click', function(){
              dat.shown = false;
              setTimeout(function(){
                scope.$apply();
              })
            });
            l
                .append('title');

          });


          lines.select('path')
            .datum(function(d){
              return d.values;
            })
              .attr('d', line)

          lines
              .select('title')
              .text(function(d){
                return d.key;
              });

          var exitL = lines.exit().remove();
        }


        scope.$watch('data', function(){
          if(scope.data && scope.type){
            update(scope.data, scope.type);
          }
        }, true);


        scope.$watch('type', function(){
          if(scope.data && scope.type){
            update(scope.data, scope.type);
          }
        });

      }
    };
  });


