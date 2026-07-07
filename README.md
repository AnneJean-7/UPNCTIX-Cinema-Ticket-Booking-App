# UPNCTIX-Cinema-Ticket-Booking-App🍿
A mobile-first cinema ticket booking application built with HTML, CSS, and JavaScript.

✨This is my very first Front-End development project, built from scratch to master the core fundamentals of web development—focusing on responsive layouts, clean semantic markup, and native user interactions.

## 📝 Project Background & Core Concept

The genesis of **UPNCTIX** stems from a practical, real-world operational need: supporting a planned campus mini-theater initiative at Universitas Pembangunan Nasional "Veteran" Jakarta (UPNVJ)[cite: 1]. This facility is envisioned as both an educational and entertainment hub, allowing students and the general public to screen movies, independent documentaries, and educational media[cite: 1]. To ensure smooth daily operations, the theater required a structured ticketing pipeline capable of managing robust movie catalogs, dynamic seat allocations, and secure user transactions[cite: 1].

While the client-facing side of this repository showcases a polished, fluid mobile-first user interface, the underlying architectural design simulates production-grade software operations. It mirrors real-world transaction data flows, mapping user interactions directly into structural states, handling edge-case validation anomalies gracefully, and persisting state changes systematically. 

Beyond serving as a rigorous sandbox for mastering software engineering and client-side web development fundamentals, UPNCTIX provides an accurate, abstracted reflection of digital transactional architectures deployed across commercial entertainment industries today[cite: 1].

---

## 💻 System Description & Architecture Simulation

UPNCTIX operates fundamentally as an end-to-end ticketing simulation engine designed to map real-world cinema business processes into digital workflows[cite: 1]. The architecture governs a multi-tiered journey for the user:

1. **Gatekeeping & Access Control**: The system enforces a secure user authentication layer[cite: 1]. New users interact with a registration gateway that commits credentials to long-term storage[cite: 1], while a login pipeline validates incoming string tokens to grant session access or handle invalid credential exceptions gracefully[cite: 1].
2. **Dynamic Querying & Discovery**: Once authenticated, the user enters the primary operations dashboard[cite: 1]. The interface displays live movie schedules arranged tabularly[cite: 1]. Users can trigger deterministic query routines to locate films by title[cite: 1] or filter catalogs instantly using budget-based price segmentation models[cite: 1].
3. **Transactional Integrity & Selection Matrix**: During seat allocation, the system manages a physical layout matrix (Rows A–E, Columns 1–6)[cite: 1]. The runtime environment checks seat availability in real time, blockading double-booking errors via strict validation handlers before routing to a simulated digital QRIS payment gateway[cite: 1].
4. **State Persistence & History**: Upon successful transaction confirmation, the system dynamically prints an itemized e-ticket[cite: 1]. To prevent volatile memory loss when the active session terminates, transactions are logged systematically, allowing data to be saved, reviewed, and exported into persistent records for full operational auditability[cite: 1].

## 📱 Application Interface & User Flow

<p align="center">
  <img src="https://github.com/user-attachments/assets/e8825eaf-b0f7-4e0a-8141-d0d72e2f9f5f" width="24%" alt="Splash & Auth Flow" />
  <img src="https://github.com/user-attachments/assets/c75299f1-32b4-4b3c-8f91-510dd7007541" width="24%" alt="Movie Catalog & Filters" />
  <img src="https://github.com/user-attachments/assets/031e5d8e-b374-47fe-9a32-305799ad17b5" width="24%" alt="Seat Selection & QRIS Payment" />
  <img src="https://github.com/user-attachments/assets/0453ba4d-0326-4306-9754-a789459c4621" width="24%" alt="E-Ticket & Transaction History" />
</p>

---

## 📂 Project Structure
```text
.
├── .vscode/               # Local editor configurations
├── 10things.jpg           # Movie asset
├── dragon.jpg             # Movie asset
├── lalaland.jpg           # Movie asset
├── michael.jpg            # Movie asset
├── trumanshow.jpg         # Movie asset
├── index.html             # Main interface entry point
├── style.css              # Core application styling stylesheet
├── script.js              # Application logic and interaction handling
└── README.md              # Project documentation

## 🌐Live Web Application
https://annejean-7.github.io/UPNCTIX-Cinema-Ticket-Booking-App/
