const service = require("./reviews-service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
  const review = await service.read(req.params.reviewId);
  if (review.length > 0) {
    res.locals.review = review;
    return next();
  }
  return next({ status: 404, message: `Review cannot be found.` });
}

function read(req, res, next) {
  const { review: data } = res.locals;
  res.json({ data });
}

async function update(req, res, next) {
  console.log("start")
  const reviewId = req.params.reviewId;
  console.log(reviewId)
  const updatedReview = {
    ...req.body.data,
    review_id: reviewId,
  };
  console.log("middle", updatedReview)
  const data = await service.update(updatedReview, reviewId);
  console.log("end")
  res.json({ data });
}

async function destroy(req, res, next) {
  const review = res.locals.review;
  const reviewId = review[0].review_id;
  await service.delete(reviewId);
  res.sendStatus(204);
}

module.exports = {
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)] 
};


