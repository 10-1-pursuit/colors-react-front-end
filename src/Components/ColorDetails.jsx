import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

function ColorDetails() {
  const [color, setColor] = useState({ name: "" });
  const [background, setBackground] = useState("");
  let navigate = useNavigate();
  let { index } = useParams();

  // On page load, load color details
  useEffect(() => {
    const fetchColor = async () => {
      try {
        fetch(`${API}/colors/${index}`)
        .then(res => res.json())
        .then(res => {
          setColor(res)
        })
      } catch (error) {
        return error
      }
    }
    fetchColor()
  }, [index])

  // Be able to delete a color. Return to index view.
  const handleDelete = () => {
    fetch(`${API}/colors/${index}`, {
      method: 'DELETE'
    })
      .then(() => navigate('/colors'))
  };
  useEffect(() => {
    const { name } = color;
    setBackground(CSS.supports("color", name.toLowerCase()));
  }, [color.name]);

  return (
    <article
      style={{ backgroundColor: color.name }}
      className={!background ? "no-such-color" : null}
    >
      <h3>
        {color.isFavorite ? <span>⭐️</span> : null}
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        {color.name}
      </h3>

      <div className="showNavigation">
        <div>
          {" "}
          <Link to={`/colors`}>
            <button>Back</button>
          </Link>
        </div>
        <div>
          {" "}
          <Link to={`/colors/${index}/edit`}>
            <button>Edit</button>
          </Link>
        </div>
        <div>
          {" "}
          <button onClick={handleDelete}>Delete</button>
          {!background ? <h1>No such color</h1> : null}
        </div>
      </div>
    </article>
  );
}

export default ColorDetails;
