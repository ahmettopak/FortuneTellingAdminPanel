import React, { useState } from 'react';
import axios from 'axios';
import './style/App.css';
import './style/Alerts.css';

const App = () => {
  const [fortune, setFortune] = useState('');
  const [age, setAge] = useState(18);
  const [relationship, setRelationship] = useState('Evli');
  const [gender, setGender] = useState('Bay');
  const [mood, setMood] = useState('Mutlu');
  const [message, setMessage] = useState(null);
  const [alertType, setAlertType] = useState(null);

  const showAlert = (type, text) => {
    setMessage(text);
    setAlertType(type);

    setTimeout(() => {
      setMessage(null);
      setAlertType(null);
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://192.168.58.1:5000/fortune', {
      fortune,
      age: parseInt(age),
      relationship,
      gender,
      mood,
    }).then((response) => {
      console.log(response.data);
      showAlert("success", "Fal Başarılı Bir şekilde Kayıt Edildi.");
    })
      .catch((error) => {
        showAlert("erorr", "Kayıt Başarılı Olamadı!");
        console.error(error);
      });

    clearInput();

  };

  const handleReset = async (e) => {
    e.preventDefault();
    clearInput();
  };

  const handleAgeChange = (e) => {
    const newAge = parseInt(e.target.value);
    if (!isNaN(newAge)) {
      setAge(Math.max(newAge, 0)); // Yaş değeri 0'ın altına düşmeyecek şekilde güncellendi
    }
  };

  const clearInput = () => {
    setFortune('');
    setAge(18);
    setRelationship('Evli');
    setGender('Bay');
    setMood('Mutlu');
  };

  return (
    <div class="fortune-teller-form">

      <h1>Fortune Teller</h1>


      <div className="alerts-container">
        {message && <div className={`alert ${alertType}`}>{message}</div>}
      </div>
      <form onSubmit={handleSubmit} onReset={handleReset}>
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
          <input
            type="number"
            value={age}
            onChange={handleAgeChange} // onChange olayını handleAgeChange işlevine bağlıyoruz
            required
          />
        </label>

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
        <button type="submit">Kaydet</button>
        <button type="reset">Temizle</button>

      </form>

      <div className="alerts-container">
        {message && <div className={`alert ${alertType}`}>{message}</div>}
      </div>
    </div>
  );
};

export default App;
