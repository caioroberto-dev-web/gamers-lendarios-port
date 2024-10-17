import moment from "moment";

function dateFormated(date, format = 'YYYY-MM-DD HH:mm:ss') {
  return moment(date, format).format("DD/MM/YYYY");
}

export default dateFormated;
