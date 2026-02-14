import mqtt from "mqtt";
import dotenv from "dotenv";

dotenv.config();

const options = {
    protocol: "mqtts",
    host: process.env.MQTT_HOST,
    port: Number(process.env.MQTT_PORT || 8883),
    username: process.env.MQTT_USER,
    password: process.env.MQTT_PASS,
    rejectUnauthorized: false
};

const client = mqtt.connect(options);

const state = {
    sensor: { suhu: 0, kelembaban: 0, cahaya: 0, soil: 0 },
    statusDevices: { lampu: false, fan: false, sprinkle: false, oto: false },
    jadwal: { start: null, end: null },
    updatedAt: null
};

client.on("connect", () => {
    client.subscribe("sekolah/iot/#");
    console.log("MQTT Connected");
});

client.on("message", (topic, message) => {
    const val = message.toString();
    // Sinkronisasi Sensor
    if (topic.endsWith("/suhu")) state.sensor.suhu = val;
    if (topic.endsWith("/kelembaban")) state.sensor.kelembaban = val;
    if (topic.endsWith("/cahaya")) state.sensor.cahaya = val;
    if (topic.endsWith("/soil")) state.sensor.soil = val;
    
    // Sinkronisasi Status Device (1 = true, 0 = false)
    if (topic.endsWith("/lampu")) state.statusDevices.lampu = val === "1";
    if (topic.endsWith("/sprinkle")) state.statusDevices.sprinkle = val === "1";
    if (topic.endsWith("/fan")) state.statusDevices.fan = val === "1";
    if (topic.endsWith("/oto")) state.statusDevices.oto = val === "1";
    
    state.updatedAt = new Date().toISOString();
});

export function publishDevice(device, value) {
    if (client.connected) {
        client.publish(`sekolah/iot/${device}`, value ? "1" : "0", { retain: true });
        state.statusDevices[device] = value;
    }
}

export { state };
