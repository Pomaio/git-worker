import React from 'react';
import { hot } from 'react-hot-loader/root';
import { AdressComponent } from './AdressComponent';

export const App = hot(() => {
  return (
    <>
      <div className="container">
        <AdressComponent />

        <div className="row">
          <div className="col l1 m2 s3 card-panel teal lighten-2">1</div>
          <div className="col l1 m2 s3 card-panel teal lighten-2">2</div>
          <div className="col l1 m2 s3 card-panel teal lighten-2">3</div>
          <div className="col l1 m2 s3 card-panel teal lighten-2">4</div>
          <div className="col l1 m2 s3 card-panel teal lighten-2">5</div>
          <div className="col l1 m2 s3 card-panel teal lighten-2">6</div>
          <div className="col l1 m2 s3 card-panel teal lighten-2">7</div>
          <div className="col l1 m2 s3 card-panel teal lighten-2">8</div>
          <div className="col l1 m2 s3 card-panel teal lighten-2">9</div>
          <div className="col l1 m2 s3 card-panel teal lighten-2">10</div>
          <div className="col l1 m2 s3 card-panel teal lighten-2">11</div>
          <div className="col l1 m2 s3 card-panel teal lighten-2">12</div>
        </div>
      </div>
    </>
  );
});
