import React from 'react'
import meSpeak from 'mespeak'
import murican from 'mespeak/voices/en/en-us.json'
import {Config} from '../config/maSpeakConfig'

const TestComponent = () => {
    meSpeak.loadConfig(Config)
    meSpeak.loadVoice(murican)

  return (
    <div>
      <button onClick={() => meSpeak.speak('hello world')}> click me </button>
    </div>
  );
};

export default TestComponent;