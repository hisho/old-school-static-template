import React, { useState } from 'react';
import axios from 'axios';

const From: React.FC = () => {
  const [name, updateName] = useState('');
  const [mail, updateMail] = useState('');
  const [message, updateMessage] = useState('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateName(event.target.value);
  };

  const handleMailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateMail(event.target.value);
  };

  const handleMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateMessage(event.target.value);
  };

  const handleClick = () => {
    console.log('ボタンが押された。');
    //yourName yourEmail yourMessage
    const yourName = encodeURIComponent('yourName') + '=' + encodeURIComponent(name);
    const yourEmail = encodeURIComponent('yourEmail') + '=' + encodeURIComponent(mail);
    const yourMessage = encodeURIComponent('yourMessage') + '=' + encodeURIComponent(message);
    const text = [yourName, yourEmail, yourMessage].join('&');
    console.log(text);
    axios
      .post(process.env.FROM_POST, text)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div>フォーム</div>
      <div>
        <label htmlFor="name">名前</label>
        <input id="name" type="text" name="yourName" value={name} onChange={handleNameChange} />
      </div>
      <div>{name}</div>
      <div>
        <label htmlFor="email">メールアドレス</label>
        <input type="mail" id="email" name="yourEmail" value={mail} onChange={handleMailChange} />
      </div>
      <div>{mail}</div>
      <div>
        <label htmlFor="message">内容</label>
        <textarea id="message" name="yourMessage" value={message} onChange={handleMessageChange} />
      </div>
      <div>
        {message.split('\n').map((str, index) => (
          <React.Fragment key={index}>
            {index !== 0 && <br />}
            {str}
          </React.Fragment>
        ))}
      </div>
      <button type={'submit'} onClick={handleClick}>
        送信ボタン
      </button>
    </>
  );
};

export default From;
