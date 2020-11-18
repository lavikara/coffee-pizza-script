export default {
  formatDate: (date) => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let currentYear = new Date().getFullYear();
    let dateObj = new Date(date);
    let month = monthNames[dateObj.getMonth()];
    let day = String(dateObj.getDate()).padStart(2, "0");
    let year = dateObj.getFullYear();
    let formatedDate = `${month} ${day}`;
    let formatedDateYr = `${month} ${day}, ${year}`;
    if (currentYear !== year) {
      return formatedDateYr;
    } else {
      return formatedDate;
    }
  },
};
