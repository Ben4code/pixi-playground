import React, { useEffect } from 'react'
import * as PIXI from 'pixi.js';
import { Spine } from './pixi-spine';

export function Show() {
  const [animation, setAnimation] = React.useState<Spine>();

  useEffect(() => {
    const app = new PIXI.Application({transparent: true})
    document.body.appendChild(app.view);
    app.stage.interactive = true

    app.loader.add('pirate', './files/Pirate.json').load((_, resource) => {
      const animation = new Spine(resource.pirate.spineData!);

      setAnimation(animation)
      animation.x = app.screen.width / 2;
      animation.y = app.screen.height;
      animation.scale.set(0.5);
      app.stage.addChild(animation);
      app.start();
      
      const canvas = document.querySelector('canvas')!
      canvas.addEventListener('mouseenter', ()=> {
        animation.state.setAnimation(0, 'Walk', true)
      })
      canvas.addEventListener('mouseleave', ()=> {
        animation.state.setAnimation(0, 'Idle', true)
      })
      canvas.addEventListener('click', ()=> {
        animation.state.setAnimation(0, 'Attack_1', true)
      })
      canvas.addEventListener('dblclick', ()=> {
        animation.state.setAnimation(0, 'Attack_2', true)
      })

      animation.state.setAnimation(0, 'Idle', true)
    })

    return () => {
      app.stage.removeChildren()
    }
  }, [])

  return (
    <div></div>
  );
};


