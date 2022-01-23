import React ,{memo} from 'react';
import { useCurrentroom } from '../../../context/current-room.context';

const ChatTop = () => {
    const name =useCurrentroom( v => v.name );
  return <div>
      {name}
  </div>;
};

export default memo(ChatTop);
