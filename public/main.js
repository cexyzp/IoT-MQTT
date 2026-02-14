import { fetchData, initCharts, initSchedule } from "./func.js";

const deviceList = ["lampu", "sprinkle", "fan", "oto"];

const start = async () => {
    await initCharts();
    await fetchData();

    document.querySelectorAll('button[data-device]').forEach((btn) => {
        btn.onclick = async () => {
            const device = btn.dataset.device;
            await fetch("/toggle", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ device }),
            });
            fetchData();
        };
    });

    setInterval(fetchData, 2000);
    initSchedule(deviceList);
};

document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", start) : start();
