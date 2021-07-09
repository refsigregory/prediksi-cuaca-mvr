const getDay = (dt) => { // 0 => today, 1=> tomorrow .....
  const midnight = new Date().setUTCHours(0, 0, 0, 0).valueOf() / 1000 + 1;
  return ((dt - midnight) / 86400) | 0;
};

export const groupByDay = (list) => {
  const last = list.slice(-1)[0];
  const size = last && getDay(last.dt)+1;
  const groups = new Array(size);
  list.forEach((item)=>{
    const day = getDay(item.dt);
    groups[day] = groups[day] || [];
    groups[day].push(item); 
  });
  return groups;
};

export const daySummary = (list=[]) => { 
  let temp_min = 999;
  let temp_max = -999;
  const weather = list.length && list[list.length / 2 | 0].weather[0];
  list.forEach((item) => {
    temp_min = Math.min(item.main.temp_min, temp_min);
    temp_max = Math.max(item.main.temp_max, temp_max);
  });
  const main = { temp_min: temp_min, temp_max: temp_max };
  return { main: main, weather: weather };
};


export const dayName = (d) => {
  const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  switch (d) {
    case 0:
      return "Today";
    case 1:
      return "Tomorrow";
    default:
      {
        const n = new Date().getDay();
        return weekDays[(n + d) % 7];
      }
  }
};
