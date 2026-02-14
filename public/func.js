import ApexCharts from "https://cdn.jsdelivr.net/npm/apexcharts@3.48.0/+esm";

let charts = {};

export async function initCharts() {
    const chartConfigs = {
        suhu: { el: "#chartTemp", color: "#ff4b2b", label: "Suhu Air" },
        soil: { el: "#chartSoil", color: "#bb86fc", label: "Soil Moist" },
        cahaya: { el: "#chartLight", color: "#ffd54f", label: "Cahaya" },
        kelembaban: { el: "#chartTur", color: "#00d2ff", label: "Turbidity" }
    };

    Object.entries(chartConfigs).forEach(([key, cfg]) => {
        const options = {
            series: [{ name: cfg.label, data: [] }],
            chart: { 
                type: "area", 
                height: 200, 
                background: "transparent",
                toolbar: { show: false },
                zoom: { enabled: false },
                animations: { enabled: true, easing: 'linear', dynamicAnimation: { speed: 500 } }
            },
            colors: [cfg.color],
            stroke: { curve: "smooth", width: 3 },
            dataLabels: { 
                enabled: true,
                textAnchor: 'start',
                style: { 
                    colors: [cfg.color], 
                    fontSize: '11px', 
                    fontWeight: '900' 
                },
                formatter: (val) => val,
                // BAGIAN MIRING
                offsetY: -15,
                offsetX: 0,
                background: {
                    enabled: true,
                    foreColor: cfg.color,
                    padding: 3,
                    borderRadius: 2,
                    borderWidth: 1,
                    borderColor: cfg.color,
                    opacity: 0.1
                },
                // Efek miring diatur lewat CSS class bawaan ApexCharts atau rotasi manual
            },
            // Tambahan rotasi label via plotOptions
            plotOptions: {
                area: {
                    dataLabels: {
                        style: {
                            // Miringkan -45 derajat
                            transform: 'rotate(-45deg)' 
                        }
                    }
                }
            },
            xaxis: { 
                type: "datetime",
                labels: { 
                    datetimeUTC: false,
                    style: { colors: "#fff" },
                    formatter: (val) => {
                        const d = new Date(val);
                        return d.getHours().toString().padStart(2, '0') + ":" + 
                               d.getMinutes().toString().padStart(2, '0');
                    }
                }
            },
            yaxis: { labels: { style: { colors: "#fff" } }, forceNiceScale: true },
            theme: { mode: "dark" },
            grid: { borderColor: "rgba(255,255,255,0.1)" },
            fill: {
                type: 'gradient',
                gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.1 }
            }
        };
        
        const el = document.querySelector(cfg.el);
        if (el) {
            charts[key] = new ApexCharts(el, options);
            charts[key].render();
        }
    });
}

export async function fetchData() {
    try {
        const res = await fetch("/api/data");
        if (!res.ok) return;
        const data = await res.json();
        const now = Date.now();
        
        const vSuhu = data.sensor?.suhu ?? 0;
        const vSoil = data.sensor?.soil ?? 0;
        const vCahaya = data.sensor?.cahaya ?? 0;
        const vHumi = data.sensor?.kelembaban ?? 0;

        const updateText = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.innerText = val;
        };

        updateText('tempVal', vSuhu);
        updateText('soilVal', vSoil);
        updateText('cahayaVal', vCahaya);
        updateText('turVal', vHumi);

        Object.entries(charts).forEach(([key, chart]) => {
            const val = Number(data.sensor?.[key]) || 0;
            let seriesData = chart.w.config.series[0].data;
            seriesData.push({ x: now, y: val });
            if (seriesData.length > 10) seriesData.shift(); 
            chart.updateSeries([{ data: seriesData }], false);
        });

        document.querySelectorAll('button[data-device]').forEach(btn => {
            const id = btn.dataset.device;
            const status = data.statusDevices?.[id];
            const parent = btn.closest('div[class^="control"]');
            if (!parent) return;

            const pStatus = parent.querySelector('p[id]');
            const icon = parent.querySelector('i');
            
            btn.classList.toggle("active", !!status);
            if (pStatus) {
                pStatus.innerText = status ? "Nyala" : "Mati";
                pStatus.style.color = status ? "var(--icon-kuning)" : "var(--text-secondary)";
            }
            if (icon) {
                icon.style.color = status ? "var(--icon-kuning)" : "var(--text-secondary)";
                icon.style.filter = status ? "drop-shadow(0 0 5px var(--icon-kuning))" : "none";
            }
        });
    } catch (e) {}
}

export function initSchedule(devices) {
    const startInput = document.getElementById("starts");
    const endInput = document.getElementById("ends");

    document.querySelector(".simpan")?.addEventListener("click", async () => {
        const start = startInput.value;
        const end = endInput.value;
        if (!start || !end) return;
        await fetch("/api/jadwal", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ start, end })
        });
    });

    document.querySelector(".reset")?.addEventListener("click", async () => {
        await fetch("/api/jadwal", { method: "DELETE" });
        if(startInput) startInput.value = "";
        if(endInput) endInput.value = "";
    });
}
