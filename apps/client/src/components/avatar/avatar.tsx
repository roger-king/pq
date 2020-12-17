import React from 'react';
import { Avatar } from 'grommet';
import { User } from 'grommet-icons';

export interface AvatarIconProps {
    imgUrl?: string;
}

export const AvatarIcon: React.FC<AvatarIconProps> = (props: AvatarIconProps) => {
    const { imgUrl } = props;

    if (imgUrl) {
        return <Avatar src={imgUrl} />;
    }

    return (
        <Avatar background="accent-2">
            <User color="accent-1" />
        </Avatar>
    );
};
