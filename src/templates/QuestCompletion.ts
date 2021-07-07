import { fabric } from 'fabric';
import fs from 'fs/promises';

import { gradientColorStops } from '../constants/styles';
import { loadFabricImageLocal } from './utils';

// @ts-ignore: Missing types
fabric.nodeCanvas.registerFont('src/fonts/Ubuntu-Bold.ttf', {
  family: 'Ubuntu',
  weight: 'bold',
  style: 'normal',
});

const QuestCompletion = async (width: number, height: number) => {
  const canvas = new fabric.StaticCanvas(null, {
    width,
    height,
    renderOnAddRemove: false,
  });

  const backgroundImage = await loadFabricImageLocal(
    'assets/moon-background.png'
  );

  const textGradient = new fabric.Gradient({
    type: 'linear',
    gradientUnits: 'percentage',
    coords: { x1: 0, y1: 0.75, x2: 1, y2: 0.25 },
    colorStops: gradientColorStops,
  });

  const subtitle = new fabric.Text('I COMPLETED A', {
    fill: '#FFF',
    fontFamily: 'Ubuntu',
    fontSize: 22,
    originX: 'center',
    fontWeight: 'bold',
    charSpacing: 15,
    shadow: '1 2',
  });

  const title = new fabric.Text('STELLAR QUEST', {
    top: subtitle.height,
    fill: textGradient,
    fontFamily: 'Ubuntu',
    fontSize: 48,
    originX: 'center',
    fontWeight: 'bold',
    shadow: '2 4 4',
  });

  const header = new fabric.Group([subtitle, title], {
    top: canvas.getHeight() * 0.12,
  });

  const footer = new fabric.Text('SERIES 4 NOW LIVE', {
    top: canvas.getHeight() - 8,
    fill: 'black',
    fontFamily: 'Ubuntu',
    fontSize: 16,
    originY: 'bottom',
    fontWeight: 'bold',
    shadow: '0 0 2 purple',
  });

  canvas.add(backgroundImage, header, footer);
  header.centerH();
  footer.centerH();

  const image = canvas.toDataURL().replace(/^data:image\/png;base64,/, '');

  await fs.writeFile('src/assets/quest-complete.png', image, {
    encoding: 'base64',
  });
};

QuestCompletion(600, 315);
