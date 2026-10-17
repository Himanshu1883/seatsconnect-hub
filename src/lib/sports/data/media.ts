import type { Media } from "../types";

const shot = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const img = {
  bowlDay: "/experiences/events/nfl.jpg",
  bowlNight: shot("photo-1489944440615-453fc2b6a9a9"),
  standsDay: shot("photo-1504016798967-59a258e9386d"),
  floodlit: shot("photo-1540747913346-19e32dc3e97e"),
  floodlitPitch: shot("photo-1431324155629-1a6deb1dec8d"),
  pitchAerial: shot("photo-1556056504-5c7696c4c28d"),
  tunnel: shot("photo-1577223625816-7546f13df25d"),
  matchPlay: shot("photo-1624880357913-a8539238245b"),
  tackle: shot("photo-1553778263-73a83bab9b0c"),
  goalmouth: shot("photo-1517927033932-b3d18e61fb3a"),
  strike: shot("photo-1560272564-c83b66b1ad12"),
  ballLine: shot("photo-1574629810360-7efbbe195018"),
  ballGrass: shot("photo-1570498839593-e565b39455fc"),
  touchline: shot("photo-1459865264687-595d652de67e"),
  trophy: shot("photo-1518091043644-c1d4457512c6"),
  fineDining: shot("photo-1414235077428-338989a2e8c0"),
  loungeBar: shot("photo-1517248135467-4c7edcad34c4"),
  terrace: shot("photo-1559339352-11d035aa65de"),
  suite: shot("photo-1544148103-0773bf10d330"),
  whisky: shot("photo-1470337458703-46ad1756a187"),
  cocktail: shot("photo-1514362545857-3bc16c4c7d1b"),
  sharing: shot("photo-1424847651672-bf20a4b0982b"),
  restaurant: shot("photo-1555396273-367ea4eb4db5"),
  dining: shot("photo-1550966871-3ed3cdb5ed0c"),
  steak: shot("photo-1600891964092-4316c288032e"),
  plates: shot("photo-1504674900247-0877df9cc836"),
  guests: shot("photo-1528605248644-14dd04022da1"),
  london: shot("photo-1513635269975-59663e0ac1ad"),
  hotel: shot("photo-1571896349842-33c89424de2d"),
  hotelNight: shot("photo-1542314831-068cd1dbfeeb"),
  racing: "/experiences/racing.jpg",
  racingNight: "/experiences/events/abudhabi.jpg",
  tennis: "/experiences/tennis.jpg",
  tennisClay: "/experiences/events/rolandgarros.jpg",
  concert: "/experiences/concert.jpg",
  festival: "/experiences/events/festivals.jpg",
  rugby: "/experiences/rugby.jpg",
  boxing: "/experiences/events/boxing.jpg",
  golf: "/experiences/events/golf.jpg",
  cricket: "/experiences/events/cricket.jpg",
  basketball: "/experiences/events/nba.jpg",
};

export const m = (src: string, alt: string, kind: Media["kind"]): Media => ({ src, alt, kind });

export const stadiumViews = [img.bowlDay, img.standsDay, img.bowlNight, img.floodlit, img.pitchAerial];
