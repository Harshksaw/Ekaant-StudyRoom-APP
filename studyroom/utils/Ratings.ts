// Function to calculate the average rating
function calculateAverageRating(reviews) {
    if (!reviews.length) return 0;
  
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    const average = sum / reviews.length;
  
    return average;
  }
  
  // Function to map user reviews to their respective ratings
  function mapUserReviews(reviews) {
    return reviews.map(review => ({
      user: review.user,
      rating: review.rating,
      comment: review.comment
    }));
  }

  export { calculateAverageRating, mapUserReviews };