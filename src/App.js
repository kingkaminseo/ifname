import { useState } from 'react';
import './App.css';
import Navber from './components/Navber';

function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  async function reading() {
    document.getElementById('name').style.display = 'none';
    document.getElementById('button').style.display = 'none';
    setLoading(true);

    const name = document.getElementById('name').value;
    console.log(name);
    const url = `https://api.genderize.io?name=${name}`;
    

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      console.log("성공하셨습니다.");
      setLoading(false);
      data.probability *= 100;
      const newsex = data.probability + 10
      if(data.gender === 'female') {
        const female =  100 - data.probability;
        const newsex = female + 10;
        setResult(`${name}님은 ${data.probability}% 의 확률로 여성 입니다.`);
        document.getElementById('app').style.background = `linear-gradient(45deg,skyblue ${female}%, pink ${newsex}%)`;
      } else {
        setResult(`${name}님은 ${data.probability}% 의 확률로 남성 입니다.`);
        document.getElementById('app').style.background = `linear-gradient(45deg,skyblue ${data.probability}%, pink ${newsex}%)`;
      }
      // setResult(`${name}님은 ${data.probability}% 의 확률로 ${sex} 입니다. ㅋ`);
      
    } catch (error) {
      console.error(error);
      setLoading(false);
    }


  }

  return (
    <div className="App" id='app'>
      <Navber />
      <input type='text' placeholder='이름을 입력하세요' id='name' style={{marginTop:'20vh'}}></input>
      <button onClick={reading} id='button'>검사하기</button>
      <div id='result'>
        {loading ? (
          <div style={{marginTop: '20vh'}}><h1>검사중...</h1></div>
        ) : (
          <div style={{marginTop:'20vh'}} ><h2>{result}</h2>
            <p><a href='./'>다시 검사하기</a></p>
          </div >
        )}
      </div>
    </div>
  );
}

export default App;
