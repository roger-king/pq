import React, { PropsWithChildren } from 'react';
import { Box, Button, Heading, Layer } from 'grommet';
import { Close } from 'grommet-icons';

export interface BaseModalProps {
  title: string;
  onClose(): void;
}

const Modal: React.FC<PropsWithChildren<BaseModalProps>> = (props: PropsWithChildren<BaseModalProps>) => {
  const { children, onClose, title } = props;

  return (
    <Layer modal>
      <Box fill align="center" justify="center" pad="medium">
        <Box direction="row" align="center" justify="between" fill>
          <Heading level="3">{title}</Heading>
        </Box>
        {children}
      </Box>
    </Layer>
  );
};

export default Modal;
