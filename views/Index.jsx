const React = require("react");
const Default = require("./layouts/Default");

function Index({ breads, bakers, title }) {
  return (
    <Default title={title}>
      <h2>Index Page</h2>
      <h3>Bakers</h3>
      <ul>
        {bakers.map((baker) => {
          return (
            <li key={baker._id}>
              <a href={`/bakers/${baker._id}`}>{baker.name}</a>
            </li>
          );
        })}
      </ul>
      <h3>Breads</h3>
      <div className="createBreadBtn">
        <a href="/breads/new">
          <button>Add a new bread</button>
        </a>
      </div>
      <ul>
        {breads.map((bread) => {
          return (
            <li key={bread._id}>
              <a href={`/breads/${bread._id}`}>{bread.name}</a>
            </li>
          );
        })}
      </ul>
    </Default>
  );
}

module.exports = Index;
