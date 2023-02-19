import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];
const BREEDS = ["Affenpinscher", "Afghan Hound", "Airedale Terrier"];

const SearchParams = () => {
  const [location, updateLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]); // pets retrieved from API
  const breeds = [];
  const [users, setUsers] = useState([]);

  useEffect(() => {
    requestPets();
  }, []); // set dependency array to empty array to run only once

  /*useEffect(() => {
    requestUsers().then((r) => console.log(r));
  }, []); // set dependency array to empty array to run only once
*/
  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();
    setPets(json.pets);
  }

  /*async function requestUsers() {
    try {
      const res = await fetch(`http://localhost:3001/users`);
      const json = await res.json().then((r) => console.log(r));
      console.log("json.users: " + json.users);
      setUsers(json);
    } catch (err) {
      console.error(err.message);
    }
  }*/

  /*function requestUsers() {
    fetch('http://localhost:3001/users')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      setUsers(data);
    })
    .catch((error) => {
      console.error('Error fetching users: ', error);
    });
  }*/


  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => updateLocation(e.target.value)}
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            name="Animal"
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
              setBreed("");
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
          <label htmlFor="breed">
            Breed
            <select
              name="Breed"
              id="breed"
              disabled={BREEDS.length === 0}
              value={breed}
              onChange={(e) => {
                setBreed(e.target.value);
              }}
            >
              <option />
              {BREEDS.map((animal) => (
                <option key={animal}>{animal}</option>
              ))}
            </select>
          </label>
        </label>
        <button>Submit</button>
      </form>
      {/*<div>
        <h1>User List</h1>
        <ul>
          {users && users.map(user => (
            <li key={user.id}>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </li>
          ))}
        </ul>
      </div>*/}
    </div>
  );
};

export default SearchParams;
