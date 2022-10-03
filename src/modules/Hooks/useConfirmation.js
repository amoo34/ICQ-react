import React, { useState } from "react";
import { CustomModal } from "../common/components/CustomModal";

export const useConfirmation = (args) => {
  const { modalTitle, modalContent, actionProps } = args;
  const [open, setOpen] = useState(false);
  console.log(open, "isOPenened");
  return [
    <CustomModal
      modalProps={{
        open: open,
        size: "small",
        onClose: () => setOpen((p) => !p),
      }}
      title={modalTitle}
      actionProps={{
        ...actionProps,
      }}
    >
      {modalContent}
    </CustomModal>,
    setOpen,
  ];
};
