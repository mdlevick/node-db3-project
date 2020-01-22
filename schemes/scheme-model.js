const db = require("../data/db-config.js");

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
};

function find() {
  return db("schemes");
}

function findById(id) {
  return db("schemes").where({ id });
}

// colin of the future, change st.id to s.id or st.scheme_id to note changes
function findSteps(schemeId) {
  return db("schemes as s")
    .select("st.id", "s.scheme_name", "st.step_number", "st.instructions")
    .join("steps as st", "s.id", "st.scheme_id")
    .where({ scheme_id: schemeId });
}

function add(scheme) {
  return db("schemes")
    .insert(scheme, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id).first();
    });
}

function update(changes, id) {
  return db("schemes")
    .where({ id })
    .update(changes)
    .then(count => (count > 0 ? findById(id) : null));
}

function remove(id) {
  return db("schemes")
    .where({ id })
    .del();
}