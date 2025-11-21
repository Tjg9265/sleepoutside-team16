export default class Alerts {
  async loadAlerts() {
    try {
      const response = await fetch("json/alerts.json");
      if (!response.ok) throw new Error("Failed to load alerts JSON");

      const alerts = await response.json();
      this.displayAlerts(alerts);
    } catch (err) {
      console.error("Error loading alerts:", err);
    }
  }

  displayAlerts(alertArray) {
    if (!alertArray || alertArray.length === 0) return;

    const section = document.createElement("section");
    section.classList.add("alert-list");

    alertArray.forEach((alertObj) => {
      const p = document.createElement("p");
      p.textContent = alertObj.message;
      p.style.backgroundColor = alertObj.background;
      p.style.color = alertObj.color;
      section.appendChild(p);
    });

    document.querySelector("main").prepend(section);
  }
}

// DO NOT USE "alert" — reserved word
const alerts = new Alerts();
alerts.loadAlerts();
