export const degToCompass = (num) => {
  const val = Math.round(num / 22.5);
  const arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  return arr[(val % 16)];
};


export const showImage = (str) => {

  const arr = ['../images/icons/icon-1.svg', '../images/icons/icon-2.svg', "../images/icons/icon-3.svg", "../images/icons/icon-4.svg", "../images/icons/icon-5.svg", "../images/icons/icon-6.svg", "../images/icons/icon-7.svg", '../images/icons/icon-8.svg', "../images/icons/icon-8.svg", "../images/icons/icon-10.svg", "../images/icons/icon-11.svg", "../images/icons/icon-12.svg", "../images/icons/icon-13.svg", "../images/icons/icon-14.svg"];
  switch (str) {
    case "Thunderstorm":
      return arr[10];
    case "Drizzle":
      return arr[8];
    case "Rain":
      return arr[10];
    case "Snow":
      return arr[13];
    case "Smoke":
      return arr[7];
    case "Mist":
      return arr[6];
    case "Haze":
      return arr[6];
    case "Dust":
      return arr[7];
    case "Fog":
      return arr[7];
    case "Dust":
      return arr[7];
    case "Ash":
      return arr[7];
    case "Squall":
      return arr[9];
    case "Tornado":
      return 13;
    case "Clear":
      return arr[1];
    case "Clouds":
      return arr[4];
    default:
      return arr[0];
  }
};