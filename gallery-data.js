"use strict";

// Gallery items (7 objects). Each item has: id, category, title, caption, src, alt.
// Optional: year (only when it is visible on the material), fit ("contain" for posters so the text is never cropped) and position (focus point of a cropped photo).
const galleryItems = [
    {
        id: 1,
        category: "Achievements",
        title: "Silver medals and diplomas",
        caption: "Diplomas and silver medals for 2nd place in the Student Sports League table tennis tournament, Central Division.",
        src: "images/achievement-diplomas-medals.jpg",
        alt: "Four diplomas for second place in table tennis and three silver medals with blue patterned ribbons, laid out on a green table tennis table.",
        year: 2026,
        position: "50% 40%"
    },
    {
        id: 2,
        category: "Achievements",
        title: "Winners of the tournament",
        caption: "Medalists of the Student Sports League table tennis tournament with their diplomas, medals and a cup.",
        src: "images/achievement-podium-group.jpg",
        alt: "Nine women stand in a row after the award ceremony, holding diplomas and wearing gold, silver and bronze medals. One of them holds a small trophy. The banner behind them reads Үстел теннисі, Студенттік спорт лигасы.",
        year: 2026,
        position: "50% 50%"
    },
    {
        id: 3,
        category: "Achievements",
        title: "Our silver-medal team",
        caption: "The team after the award ceremony, with diplomas and silver medals.",
        src: "images/achievement-silver-team.jpg",
        alt: "A man and three women pose with diplomas and silver medals in front of the Student Sports League table tennis banner.",
        year: 2026,
        position: "50% 40%"
    },
    {
        id: 4,
        category: "Programs",
        title: "Open training hall",
        caption: "Regular training: players at the blue tables while the group sign-up sheet is open on a laptop.",
        src: "images/program-training-hall.jpg",
        alt: "A training hall with blue table tennis tables. Players hold rackets in the background, and a laptop with a sign-up sheet lies in the foreground.",
        position: "50% 6%"
    },
    {
        id: 5,
        category: "Programs",
        title: "Club members at Cyber Arena",
        caption: "A group photo of the club members and coaches at Cyber Arena.",
        src: "images/program-group-cyber-arena.jpg",
        alt: "About twenty young people stand in two rows in a large sports hall under a wall with the words Cyber Arena. Some of them hold table tennis rackets.",
        position: "50% 75%"
    },
    {
        id: 6,
        category: "Announcements",
        title: "Sunday Open tournament",
        caption: "Poster: Sunday Open table tennis tournament, Sunday, May 17, 11:00 AM, Cyber Arena. News: @aitutabletennisnews.",
        src: "images/announcement-sunday-open.jpg",
        alt: "Poster with yellow and white text: Table Tennis Tournament, Sunday Open, Sunday May 17th at 11:00 AM, Cyber Arena, @aitutabletennisnews.",
        year: 2026,
        fit: "contain"
    },
    {
        id: 7,
        category: "Announcements",
        title: "Club Fair",
        caption: "Announcement of the Club Fair from the club account @aitu_table_tennis.",
        src: "images/announcement-club-fair.jpg",
        alt: "Dark blue poster with the words Club Fair, the account name aitu_table_tennis and a drawing of a table tennis racket in blue flames.",
        fit: "contain"
    }
];
