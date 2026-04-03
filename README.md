# 📍 SRM AI Navigator: A* Pathfinding Visualizer

![Status](https://img.shields.io/badge/Status-Hosted-brightgreen)
![Algorithm](https://img.shields.io/badge/Algorithm-A*-orange)
![UI](https://img.shields.io/badge/Design-Glassmorphism-blue)

**SRM AI Navigator** is a high-fidelity pathfinding tool designed for the SRM IST campus. It bridges the gap between graph theory and real-world navigation, allowing users to visualize how an AI "thinks" while finding the most efficient walking route between campus landmarks.

---

## 🔗 Live Deployment
**🚀 [Click Here to View the Live Project](https://campus-navigator-jet.vercel.app/)**

---

## ✨ Core Features

* **🤖 Intelligent Routing:** Uses a weighted graph system where every road has a calculated Euclidean distance.
* **📡 Heuristic Sightlines:** Features a toggleable **"Show Heuristic Line"** that draws a direct vector to the goal, illustrating how the algorithm stays on track.
* **📝 Path Output Text:** Automatically generates a readable step-by-step sequence of your route (e.g., *Auditorium → Tech Park 2 → Vendhar Sq*).
* **📊 Total Cost Analysis:** Provides a precise measurement of the optimal route in units/meters, making the system academically complete.
* **🕹️ Interactive Execution:** Clearly distinguishes between the **Open Set** (Nodes being considered), **Closed Set** (Evaluated nodes), and the **Final Path**.

---

## 🚀 How to Use

* **Select Locations:** Choose your **Starting Point** and **Destination** from the dropdown menus in the sidebar.
* **Visualize Heuristics:** (Optional) Enable **"Show Heuristic Line"** to see the AI's internal "sightline" to the goal.
* **Find the Route:** * Click **"Fast Route"** for an instant calculation and animation.
    * Click **"Start Steps"** to walk through the A* logic manually.
* **Inspect Results:** Check the **Route Info** box to see your exact path and total travel cost.
* **Reset:** Use the **"Reset"** button to clear the map and try a new route.

---

## 🧠 The Math: How it Works

The navigator calculates the most efficient route by minimizing the function:

$$f(n) = g(n) + h(n)$$

* **$g(n)$:** The actual cost (distance) from the **Starting Point** to the current node.
* **$h(n)$:** The **Heuristic**—the estimated straight-line distance to the **Destination**.
* **$f(n)$:** The total estimated cost. The algorithm always explores the node with the lowest $f(n)$ first.

---

## 🛠️ Tech Stack

* **Logic:** JavaScript - Custom A* implementation.
* **Graphics:** Scalable Vector Graphics (SVG) for the interactive map.
* **Styling:** CSS3 with Glassmorphism and Keyframe Animations.

---
