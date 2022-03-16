import React from 'react';
import './index.css';

function NoMatch({ location }) {
  return (
    <div className="nomatch">
      <h1>
        404 - No match for <code>{location.pathname}</code>
      </h1>
    </div>
  );
}

export default NoMatch;
