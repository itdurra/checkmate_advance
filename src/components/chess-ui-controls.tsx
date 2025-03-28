import React, { useState } from 'react';
import { CiFlag1 } from 'react-icons/ci';

import { FlagPopup } from './flagPopup';

export const ChessUIControls = () => {
  const [isFlagPopupOpen, setIsFlagPopupOpen] = useState(false);

  const openFlagPopup = () => setIsFlagPopupOpen(true);
  const closeFlagPopup = () => setIsFlagPopupOpen(false);

  return (
    <div>
      <div>
        <button onClick={openFlagPopup}>
          <CiFlag1 size={20} />
        </button>
      </div>
      {
        <FlagPopup
          isOpen={isFlagPopupOpen}
          closeFlagPopup={closeFlagPopup}
        ></FlagPopup>
      }
    </div>
  );
};
