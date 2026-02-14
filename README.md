<div align="left" style="position: relative;">
<img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" align="right" width="30%" style="margin: -20px 0 0 20px;">
<h1>IOT-MQTT (Express.js)</h1>
<p align="left">
	<em><code>Monitoring & Control System Sekolah Pintar berbasis Express.js, EJS, dan MQTT.</code></em>
</p>
<p align="left">
	<img src="https://img.shields.io/github/license/cexyzp/IoT-MQTT?style=for-the-badge&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/cexyzp/IoT-MQTT?style=for-the-badge&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/cexyzp/IoT-MQTT?style=for-the-badge&color=0080ff" alt="repo-top-language">
</p>
</div>
<br clear="right">

## <img src="https://img.shields.io/badge/TABLE%20OF%20CONTENTS-grey?style=for-the-badge&logo=gitbook&logoColor=white">

* [ <img src="https://img.shields.io/badge/OVERVIEW-blue?style=flat-square&logo=discovery&logoColor=white"> ](#-overview)
* [ <img src="https://img.shields.io/badge/FEATURES-blue?style=flat-square&logo=feature&logoColor=white"> ](#-features)
* [ <img src="https://img.shields.io/badge/MQTT%20TOPICS-blue?style=flat-square&logo=mqtt&logoColor=white"> ](#-mqtt-topics)
* [ <img src="https://img.shields.io/badge/GETTING%20STARTED-blue?style=flat-square&logo=rocket&logoColor=white"> ](#-getting-started)
* [ <img src="https://img.shields.io/badge/LICENSE-blue?style=flat-square&logo=balance-scale&logoColor=white"> ](#-license)

---

## <img src="https://img.shields.io/badge/OVERVIEW-0080ff?style=for-the-badge&logo=info&logoColor=white">

<code>IoT-MQTT</code> adalah aplikasi dashboard untuk memantau kondisi lingkungan sekolah (suhu, cahaya, kelembapan) dan mengontrol perangkat elektronik (lampu, penyiram air) secara real-time melalui protokol MQTT.

---

## <img src="https://img.shields.io/badge/FEATURES-0080ff?style=for-the-badge&logo=node.js&logoColor=white">

* **Real-time Monitoring**: Menggunakan socket atau polling untuk menampilkan data sensor.
* **Smart School Logic**: Integrasi monitoring suhu, cahaya, dan kelembapan tanah.
* **Control Center**: Switch lampu dan penyiram tanaman (sprinkle) via MQTT Publish.

---

## <img src="https://img.shields.io/badge/MQTT%20TOPICS-0080ff?style=for-the-badge&logo=mqtt&logoColor=white">

| Kategori | Nama Topik | Deskripsi |
| :--- | :--- | :--- |
| **Monitoring** | `sekolah/iot/suhu` | Data suhu ruangan |
| **Monitoring** | `sekolah/iot/cahaya` | Intensitas cahaya |
| **Monitoring** | `sekolah/iot/kelembapan` | Kelembapan udara |
| **Monitoring** | `sekolah/iot/soil` | Kelembapan tanah |
| **Control** | `sekolah/iot/lampu` | On/Off lampu sekolah |
| **Control** | `sekolah/iot/sprinkle` | On/Off penyiram tanaman |

---

## <img src="https://img.shields.io/badge/GETTING%20STARTED-0080ff?style=for-the-badge&logo=pnpm&logoColor=white">

### <img src="https://img.shields.io/badge/Tech_Stack-grey?style=for-the-badge">

<p align="left">
	<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="nodejs">
	<img src="https://img.shields.io/badge/express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="express">
	<img src="https://img.shields.io/badge/EJS-A91E50?style=for-the-badge&logo=ejs&logoColor=white" alt="ejs">
	<img src="https://img.shields.io/badge/MQTT.js-3C1E5A?style=for-the-badge&logo=mqtt&logoColor=white" alt="mqtt">
</p>

### <img src="https://img.shields.io/badge/Installation-grey?style=flat-square&logo=icloud&logoColor=white">

 ```sh
 git clone [https://github.com/cexyzp/IoT-MQTT.git](https://github.com/cexyzp/IoT-MQTT.git)
 cd IoT-MQTT
 npm install
 npm start
 ```
---
