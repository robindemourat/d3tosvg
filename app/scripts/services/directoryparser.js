'use strict';

/**
 * @ngdoc service
 * @name visEngineApp.DirectoryParser
 * @description
 * # DirectoryParser
 * Factory in the visEngineApp.
 */
angular.module('visEngineApp')
  .factory('DirectoryParser', function ($q, $http) {


    var colors = d3.scale.category20b();
    var format = d3.time.format;

    var fetchSource = function(obj){

          //console.log(obj);
          return $q(function(resolve, reject){
            if(obj.type === 'google spreadsheet'){
              Tabletop.init( {
                        key: obj.url,
                       callback: function(d, Tabletop){
                        console.log('got data', d);
                        if(d){
                          if(obj.tab){
                            d = Tabletop.sheets(obj.tab).all();
                            console.log(d);
                          }

                          obj.data = d;
                          var headers = [];
                          for(var i in obj.data[0]){
                            headers.push(i);
                          }
                          obj.headers = headers;


                          resolve(obj);
                        }else reject(obj);
                       },
                       simpleSheet: (obj.tab !== undefined)
              });
            }else if(obj.type === 'csv'){
              d3.csv(obj.url, function(d){
                obj.data = d;
                console.info('got ', obj.url);
                resolve(obj);
              });

            }
            console.info('fetching ', obj.url);

          });
    };

    var prepareVis = function(directory){
      console.log('prepare vis');

      directory.visualisations.forEach(function(visualisation){
        var data;

        var colorCount = 0;

        visualisation.objectsValues = [];

        directory.dataSources.some(function(source){
          if(source.name === visualisation.data_source){
            if(source.data){
              data = source.data;
              return false;
            }else{
              return false;
            }
            return true;
          }
        });
        if(!data){
          return;
        }

        if(visualisation.data_type == 'time'){
          //parse dates
          format = d3.time.format(visualisation.timeformat);
          data.forEach(function(d){
            try{
              d.date = format.parse(d[visualisation.timedata]);
            }catch(e){
              d.date = d[visualisation.timedata];
            }
            if(d.date)
              d.xVal = d.date;
          });
        }

        if(visualisation.objects){
          var nested = d3.nest()
                        .key(function(d) {
                            return d[visualisation.objects];
                        })
                        .entries(data);



          nested.forEach(function(object){
            if(object.key.length == 0)
              object.key = 'None';

            if(visualisation.showObjects){
                var shown;
                visualisation.showObjects.forEach(function(show){
                  if(show === object.key){
                    shown = true;
                  }
                });

                if(shown){
                  object.shown = true;
                }else object.shown = false;
            }else object.shown = true;


            var nestX = d3.nest()
                        .key(function(d) {
                            return d.xVal;
                        })
                        .entries(object.values);

            nestX.forEach(function(x){
              x.yVal = x.values.length;
              delete x.values;
            });


            object.values = nestX.sort(function(a, b){
              a = new Date(a.key);
              b = new Date(b.key);
              if(a > b){
                return 1;
              }else if(a < b){
                return -1;
              }
              else return 0;
            });

            object.color = colors(colorCount);
            colorCount++;
          });

          //normalise time
          if(visualisation.timespan){
            nested.forEach(function(obj){

              for(var i = obj.values.length - 1 ; i >= 1 ; i--){
                var d = new Date(obj.values[i].key).getYear();
                var oD = new Date(obj.values[i-1].key).getYear();
                if(d == oD){
                  obj.values[i-1].yVal += obj.values[i].yVal;
                  obj.values.splice(i, 1);
                  oD = new Date(obj.values[i-1].key);
                  //oD.setDate(1).setMonth(1);
                  oD.setMonth(1);
                  obj.values[i-1].key = oD.toString();
                }
              }
              /*var o = obj.values.map(function(d, i){

                //console.log(obj.key, new Date(d.key), d.key, new Date(d.key).getYear());
              });*/
            });
          }



          visualisation.data = nested;

        }

      });
    }
    var process = function(directory, callback){

      var toDownload = [];

      directory.dataSources.forEach(function(source){
        toDownload.push(fetchSource(source));
      })

      $q.all(toDownload).then(function(results) {
            directory.dataSources = results;
            prepareVis(directory);
           return callback(directory);
        }, function(e){
          return callback(undefined, e);
        });

      return callback(directory);
    }

    // Public API here
    return {
      process: process
    };
  });
