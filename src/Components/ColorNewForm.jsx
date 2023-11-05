import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

function ColorNewForm() {
  const navigate = useNavigate();
  const [color, setColor] = useState({
    name: "",
    isFavorite: false,
  });

  // Add a color. Redirect to the index view.
  const addColor = () => {
    const colorData = { 
      name: color.name, 
      is_favorite: color.isFavorite
    }
    try {
      fetch(`${API}/colors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(colorData)
      })
        .then(res => res.json())
        .then(() => navigate('/colors'))
    } catch (error) {
      return error
    }
  };

  const handleTextChange = (event) => {
    setColor({ ...color, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setColor({ ...color, isFavorite: !color.isFavorite });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addColor();
  };

  return (
    <div className="New">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          value={color.name}
          type="text"
          onChange={handleTextChange}
          placeholder="Name of Color"
          required
        />

        <label htmlFor="isFavorite">Favorite:</label>
        <input
          id="isFavorite"
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={color.isFavorite}
        />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
      <br />
      <Link to={`/colors`}>
        <button>Nevermind!</button>
      </Link>
    </div>
  );
}

export default ColorNewForm;
