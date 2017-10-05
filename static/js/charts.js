function trend_plot(data){
//    Initializing X axis and Data array
    var x = ["x"]
    var dataV = ["AdRequest"]
    //Pushing the data from the API into corresponding Array
    data.forEach(function(obj){
        x.push(obj.date);
        dataV.push(obj.adrequest);
    }); 
//    Creating SVG Charts using C3.js
  c3.generate({
       bindto: d3.select('.chartContainer'),//Where to render the chart
    data: {
        x: 'x',
        columns: [
            x,
            dataV
        ]
    },
    axis: {
        x: {
            type: 'timeseries',//Type of chart
            tick: {
                format: '%Y-%m-%d'//Format of the Date
            }
        }
    }
});
  }