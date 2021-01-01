import React, { PropsWithChildren } from 'react';
import { Box, Heading, Layer } from 'grommet';

export interface BaseModalProps {
  title: string;
  onClose(): void;
}

const Modal: React.FC<PropsWithChildren<BaseModalProps>> = (props: PropsWithChildren<BaseModalProps>) => {
  const { children, title } = props;

  return (
    <Layer modal>
      <Box fill align="center" justify="center" pad="medium" background="brand">
        <Box direction="row" align="center" justify="between" fill>
          <Heading level="3">{title}</Heading>
        </Box>
        {children}
      </Box>
    </Layer>
  );
};

export default Modal;
