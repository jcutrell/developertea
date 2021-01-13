import React, { useContext } from 'react';
import tw from 'twin.macro';
import { store } from '../store.js';

export default function SimplecastPlayer () {
  const globalState = useContext(store); 
  const {state} = globalState;
  if (!state.showPlayer || !state.playerId) return null;

  return (
    <div tw={"fixed bottom-0 w-3/12"}>
      <iframe height="200px" width="100%" frameBorder="no" scrolling="no" seamless src={`https://player.simplecast.com/${state.playerId}?dark=false`}></iframe>
    </div>
  )
}
