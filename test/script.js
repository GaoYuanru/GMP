    // 读取filtered_data_2015.csv表中的数据
    Plotly.d3.csv('data/filtered_data_2015.csv', function(data2015) {
        // 读取filtered_data_2019.csv表中的数据
        Plotly.d3.csv('data/filtered_data_2019.csv', function(data2019) {
          // 提取所需的列数据
          var columns = ['Index of Multiple Deprivation (IMD) Score', 'Income Score (rate)', 'Employment Score (rate)'];
          var lsoaCodes = ['LSOA1', 'LSOA2', 'LSOA3']; // 这里的LSOA1、LSOA2、LSOA3应替换为实际的LSOA CODE
      
          var data = [];
          for (var i = 0; i < lsoaCodes.length; i++) {
            var lsoaCode = lsoaCodes[i];
            var dataA = data2015.filter(function(row) { return row['LSOA CODE'] === lsoaCode; })[0];
            var dataB = data2019.filter(function(row) { return row['LSOA CODE'] === lsoaCode; })[0];
      
            var trace = {
              type: 'scatterpolar',
              r: Object.values(dataA).concat(Object.values(dataB)),
              theta: columns.concat(columns),
              fill: 'toself',
              name: 'Group ' + lsoaCode
            };
            data.push(trace);
          }
      
          var layout = {
            polar: {
              radialaxis: {
                visible: true,
                range: [0, 50]
              }
            }
          };
      
          Plotly.newPlot('myDiv', data, layout);
        });
      });