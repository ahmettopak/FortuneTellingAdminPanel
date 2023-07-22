import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [fortune, setFortune] = useState('');
  const [age, setAge] = useState(18);
  const [relationship, setRelationship] = useState('');
  const [gender, setGender] = useState('');
  const [mood, setMood] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://192.168.58.1/fortune', {
        fortune,
        age: parseInt(age),
        relationship,
        gender,
        mood,
      }).then((response) => {
        console.log(response.data);
      })
        .catch((error) => {

          console.error(error);
        });

      // Clear form fields on successful submission
      setFortune('');
      setAge('');
      setRelationship('');
      setGender('');
      setMood('');


    } catch (error) {
      console.error(error);
    }
  };

  const handleAgeChange = (e) => {
    const newAge = parseInt(e.target.value);
    if (!isNaN(newAge)) {
      setAge(Math.max(newAge, 0)); // Yaş değeri 0'ın altına düşmeyecek şekilde güncellendi
    }
  };


  return (
    <div class="fortune-teller-form">

      <h1>Fortune Teller</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Fal:
          <textarea
            value={fortune}
            onChange={(e) => setFortune(e.target.value)}
            rows="4"
            required
          ></textarea>
        </label>
        <br />
        <label>
          Yaş:
          <div class="age-input">
            <button type="button" onClick={() => setAge(Math.max(parseInt(age) - 1, 0))}>-</button>
            <input
              type="number"
              value={age}
              onChange={handleAgeChange} // onChange olayını handleAgeChange işlevine bağlıyoruz
              required
            />
            <button type="button" onClick={() => setAge(parseInt(age) + 1)}>+</button>
          </div>
        </label>
        <br />
        <label>
          İlişki Durumu:
          <select value={relationship} onChange={(e) => setRelationship(e.target.value)} required>
            <option value="Evli">Evli</option>
            <option value="Bekar">Bekar</option>
            <option value="Boşanmış">Boşanmış</option>
            <option value="Flört">Flört</option>
            <option value="Karışık">Karışık</option>
          </select>
        </label>
        <br />
        <label>
          Cinsiyet:
          <select value={gender} onChange={(e) => setGender(e.target.value)} required>
            <option value="Male">Bay</option>
            <option value="Female">Bayan</option>
          </select>
        </label>
        <br />
        <label>
          Ruh Hali:
          <select value={mood} onChange={(e) => setMood(e.target.value)} required>
            <option value="Mutlu">Mutlu</option>
            <option value="Üzgün">Üzgün</option>
            <option value="Karışık">Karışık</option>
          </select>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
