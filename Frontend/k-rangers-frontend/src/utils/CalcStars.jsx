function CalcStars(rating = 0, max = 5) {
  const stars = [];
  for (let i = 1; i <= max; i++) {
    let fill = 0;
    if (rating >= i) fill = 100;
    else if (rating >= i - 0.5) fill = 50;
    stars.push({ id: i, fill });
  }
  return stars;
}

export default CalcStars;