import React from "react";
import StarRatings from "react-star-ratings/build/star-ratings";

export const showAverage = (p) => {
  if (p && p.ratings) {
    const ratingsArray = p && p.ratings;
    const total = [];
    const length = ratingsArray.length;

    ratingsArray.map((r) => total.push(r.star))
    const totalReduced = total.reduce((p, n) => p + n, 0);
    const highest = length * 5;
    const result = (totalReduced * 5) / highest;

    return (
      <div
        className="pt-1 pb-3 d-flex align-items-center justify-content-center gap-2"
      >
        <StarRatings
          rating={result}
          starDimension="20px"
          starSpacing="2px"
          editing={false}
          starRatedColor='purple'
        />
        ({ p.ratings.length })
      </div>
    )
  }
}
