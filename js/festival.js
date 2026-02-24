const festivalDates = {
  2025: "2025-08-27",
  2026: "2026-09-15",
  2027: "2027-09-04",
  2028: "2028-08-23"
};

function updateFestival() {
  const today = new Date();
  const year = today.getFullYear();

  let festivalDate = new Date(festivalDates[year]);
  if (today > festivalDate) {
    festivalDate = new Date(festivalDates[year + 1]);
  }

  document.getElementById("festivalDateText").innerText =
    "Festival Begins: " + festivalDate.toDateString();

  updateCountdown(festivalDate);

  const startedYear = 2005;
  let completedYears = year - startedYear;

  if (today < new Date(festivalDates[year])) {
    completedYears -= 1;
  }

  document.getElementById("celebrationYear").innerText =
    completedYears + " Years Completed";
}

function updateCountdown(targetDate) {
  const countdown = document.getElementById("countdown");

  setInterval(() => {
    const now = new Date();
    const diff = targetDate - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    countdown.innerText =
      `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }, 1000);
}

updateFestival();
