import React, { useState } from 'react';
import { useGreenApi } from './hooks/useGreenApi';
import './App.css';

const App = () => {
  const [auth, setAuth] = useState({ id: '', token: '' });
  const [msg, setMsg] = useState({ phone: '', text: '' });
  const [file, setFile] = useState({ phone: '', url: '' });

  const { response, loading, call } = useGreenApi(auth.id, auth.token);

  return (
    <div className="container">
      <div className="input-section">
        <div className="group">
          <input placeholder="idInstance" onChange={e => setAuth({...auth, id: e.target.value})} />
          <input placeholder="apiTokenInstance" onChange={e => setAuth({...auth, token: e.target.value})} />
          <button onClick={() => call('getSettings')} disabled={loading}>getSettings</button>
          <button onClick={() => call('getStateInstance')} disabled={loading}>getStateInstance</button>
        </div>

        <div className="group">
          <input placeholder="79991234567" onChange={e => setMsg({...msg, phone: e.target.value})} />
          <textarea placeholder="Message" onChange={e => setMsg({...msg, text: e.target.value})} />
          <button onClick={() => call('sendMessage', msg.phone, msg.text)} disabled={loading}>sendMessage</button>
        </div>

        <div className="group">
          <input placeholder="79991234567" onChange={e => setFile({...file, phone: e.target.value})} />
          <input placeholder="File URL" onChange={e => setFile({...file, url: e.target.value})} />
          <button onClick={() => call('sendFileByUrl', file.phone, file.url)} disabled={loading}>sendFileByUrl</button>
        </div>
      </div>

      <div className="output-section">
        <label>Response:</label>
        <textarea readOnly value={JSON.stringify(response, null, 2)} />
      </div>
    </div>
  );
};

export default App;
