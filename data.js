"use strict";

// Training sessions data (8 objects, 8 properties each).
// Used by the session finder (club.html) and the booking form (join.html).
const trainingSessions = [
    { id: 1, name: "Beginner Basics",     day: "Monday",    time: "17:00–18:00", level: "Beginner",     type: "Group",    price: 3500, coach: "Coach Daniyar" },
    { id: 2, name: "Control & Footwork",  day: "Tuesday",   time: "18:00–19:00", level: "Intermediate", type: "Group",    price: 3500, coach: "Coach Aigerim" },
    { id: 3, name: "Advanced Match Play", day: "Wednesday", time: "19:00–20:30", level: "Advanced",     type: "Group",    price: 3500, coach: "Coach Daniyar" },
    { id: 4, name: "First Rally",         day: "Thursday",  time: "17:00–18:00", level: "Beginner",     type: "Group",    price: 3500, coach: "Coach Timur" },
    { id: 5, name: "Spin & Serve",        day: "Friday",    time: "18:00–19:00", level: "Intermediate", type: "Group",    price: 3500, coach: "Coach Aigerim" },
    { id: 6, name: "Tournament Practice", day: "Saturday",  time: "11:00–12:30", level: "Advanced",     type: "Group",    price: 3500, coach: "Coach Daniyar" },
    { id: 7, name: "Personal Coaching",   day: "Saturday",  time: "14:00–15:00", level: "Intermediate", type: "Personal", price: 7000, coach: "Coach Timur" },
    { id: 8, name: "Open Play",           day: "Sunday",    time: "12:00–14:00", level: "Beginner",     type: "Group",    price: 3500, coach: "Club team" }
];
