const db = require('../lib/dbConnect');

function getAllPuppies(req, res, next) {

  db.any('SELECT * from puppies ORDER by likes DESC;')
    .then((puppies) => {
      res.puppies = puppies;
      next();
    })
    .catch(error => next(error));
}

function adoptPuppy(req, res, next) {
  // Implement adopting a puppy
db.none(`INSERT INTO puppies (name, url)
        VALUES ($/name/, $/url/);`, req.body)
        .then( () => next());
}

function abandonPuppy(req, res, next) {
  // Implement abandoning the puppy :(
    var puppyID = parseInt(req.params.id);
    db.none('DELETE from puppies WHERE id = $1', puppyID)
    .then((deletePuppy) => {
    next();
  })
  .catch(error => (error));

}

function likePuppy(req, res, next) {
  // Implement increasing the likes value of the puppy by one
    var puppyID = parseInt(req.params.id);
    db.none('UPDATE puppies SET likes = likes +1 WHERE id = $1', puppyID)
    .then((likePuppy) => {
    next();
  })
  .catch(error => (error));
}

module.exports = {
  getAllPuppies,
  adoptPuppy,
  abandonPuppy,
  likePuppy
};
