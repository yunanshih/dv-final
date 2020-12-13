  const county_list = ['臺北市', '新北市', '桃園市', '臺中市', '臺南市', '高雄市',
  '苗栗縣', '彰化縣', '南投縣', '雲林縣', '嘉義縣', '屏東縣', '宜蘭縣', '花蓮縣', '臺東縣', '澎湖縣', '金門縣', '連江縣',
  '基隆市', '新竹市', '嘉義市'];

  county_list.forEach((county, index) => {
    var option = document.createElement("option");
    option.text = county;
    option.value = index;
    var select_county = document.getElementById("county");
    select_county.appendChild(option);
  })

  const titleText = '';
  const xAxisLabelText = '發生數量';
  
  const svg = d3.select('svg');
  
  const width = +svg.attr('width');
  const height = +svg.attr('height');
  
  const render = data => {
    const xValue = d => d.count;
    const yValue = d => d.road;
    const margin = { top: 20, right: 20, bottom: 50, left: 180 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, xValue)])
      .range([0, innerWidth]);
    
    const yScale = d3.scaleBand()
      .domain(data.map(yValue))
      .range([0, innerHeight])
      .padding(0.1);
    
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // const xAxisTickformat = number =>
    //   d3.format('.3s')(number)
    //     .replace('G', 'B');
    
    const xAxis = d3.axisBottom(xScale)
    //   .tickFormat(xAxisTickformat)
      .tickSize(-innerHeight);
    
    g.append('g')
      .call(d3.axisLeft(yScale))
      .selectAll('.domain, .tick line')
      .remove();
    
    const xAxisG = g.append('g').call(xAxis)
      .attr('transform', `translate(0,${innerHeight})`);
    
    xAxisG.select('.domain').remove();
    
    xAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', 30)
        .attr('x', innerWidth / 2)
        .attr('fill', 'black')
        .text(xAxisLabelText);
    
    g.selectAll('rect').data(data)
      .enter().append('rect')
        .attr('y', d => yScale(yValue(d)))
        .attr('width', d => xScale(xValue(d)))
        .attr('height', yScale.bandwidth());
    
    g.append('text')
        .attr('class', 'title')
        .attr('y', -10)
        .text(titleText);
  };
  
  d3.csv('./A2/' + county_list[0] + '_A2.csv').then(data => {
    console.log(data)
    data.forEach(d => {
        console.log(d.road)
      d.count = +d.count;
    });
    render(data);
  });

  const changeSelection = () => {
    selected = document.getElementById("county").value;
    svg.selectAll("*").remove();
    d3.csv('./A2/' + county_list[selected] + '_A2.csv').then(data => {
        console.log(data)
        data.forEach(d => {
            console.log(d.road)
          d.count = +d.count;
        });
        render(data);
      });
}