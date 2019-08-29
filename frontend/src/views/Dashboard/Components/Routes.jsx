import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import FlashcardPreview from '../../FlashcardPreview/FlashcardPreview';

const Routes = (props) => {
  return (
    <>
      <Router>
        <Route path="/" exact component={FlashcardPreview} />
      </Router>
    </>
  );
};

export default Routes