function checkIfTourIsBooked(tourId, mybookings) {
  let match = false;
  mybookings.forEach((book) => {
    if (book.tour.id === tourId) {
      match = true;
    }
  });
  return match;
}

export default checkIfTourIsBooked;
