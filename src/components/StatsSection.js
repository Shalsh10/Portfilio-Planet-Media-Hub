// // StatsSection.jsx
// import React from "react";
// import { motion } from "framer-motion";
// import "./StatsSection.css";
// import logo from "../assets/images/logoPlanet-removebg-preview.png";

// const stats = [
//   {
//     icon: "☆",
//     value: "100%",
//     title: "رضا العملاء",
//     subtitle: "معدل الرضا الكامل",
//   },
//   {
//     icon: "↗",
//     value: "+120",
//     title: "عميل موثوق",
//     subtitle: "شركات ومؤسسات",
//   },
//   {
//     icon: "♙",
//     value: "+300",
//     title: "راعٍ وشريك",
//     subtitle: "من محلي ودولي",
//   },
//   {
//     icon: "▣",
//     value: "+50",
//     title: "فعالية منظمة",
//     subtitle: "مؤتمر ومعرض وحدث",
//   },
// ];

// function StatCard({ item, index }) {
//   return (
//     <motion.div
//       className="stat-box"
//       initial={{ opacity: 0, y: 35 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6, delay: index * 0.12 }}
//       viewport={{ once: true }}
//     >
//       <div className="stat-icon">{item.icon}</div>
//       <h3>{item.value}</h3>
//       <h4>{item.title}</h4>
//       <p>{item.subtitle}</p>
//     </motion.div>
//   );
// }

// function StatsSection() {
//   return (
//     <section className="stats-section" dir="rtl">
//       <div className="stats-glow"></div>

//       <div className="stats-container">
//         <motion.img
//           src={logo}
//           alt="Planet Media Hub"
//           className="stats-logo"
//           initial={{ opacity: 0, scale: 0.75 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//         />

//         <motion.div
//           className="stats-badge"
//           initial={{ opacity: 0, y: -18 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.1 }}
//           viewport={{ once: true }}
//         >
//           أرقامنا تتحدث
//         </motion.div>

//         <motion.h2
//           className="stats-title"
//           initial={{ opacity: 0, y: 24 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.2 }}
//           viewport={{ once: true }}
//         >
//           إنجازات نفتخر بها
//         </motion.h2>

//         <div className="stats-grid">
//           {stats.map((item, index) => (
//             <StatCard key={index} item={item} index={index} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default StatsSection;