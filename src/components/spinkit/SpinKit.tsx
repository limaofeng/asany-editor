import React, { ComponentType } from 'react';

import Bounce from './components/Bounce';
import Chase from './components/Chase';
import Circle from './components/Circle';
import CircleFade from './components/CircleFade';
import Flow from './components/Flow';
import Fold from './components/Fold';
import Grid from './components/Grid';
import Plane from './components/Plane';
import Pulse from './components/Pulse';
import Swing from './components/Swing';
import Wander from './components/Wander';
import Wave from './components/Wave';

const spinkits: { [key: string]: ComponentType<any> } = {
  Bounce,
  Chase,
  Circle,
  CircleFade,
  Flow,
  Fold,
  Grid,
  Plane,
  Pulse,
  Swing,
  Wander,
  Wave,
};

interface SpinKitProps {
  name:
    | 'Bounce'
    | 'Chase'
    | 'Circle'
    | 'CircleFade'
    | 'Flow'
    | 'Fold'
    | 'Grid'
    | 'Plane'
    | 'Pulse'
    | 'Swing'
    | 'Wander'
    | 'Wave';
}

function SpinKit({ name }: SpinKitProps) {
  return React.createElement(spinkits[name]);
}

export default SpinKit;
