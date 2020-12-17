import React, { useState } from 'react';
import { Card, Box, CardBody, Button, Text, Anchor, CardFooter, CardHeader, Heading } from 'grommet';
import { Bookmark, Chat } from 'grommet-icons';
import { VoteButtonGroupContainer } from '../../containers/voteBtnGroup.container';

interface BasicCardProps {
    postId: number;
    totalVotes: number;
    footer: string;
    header: string;
    body: string;
    didVote: { upvote: boolean; downvote: boolean };
    navigate?(): void;
}

export const BasicCard: React.FC<BasicCardProps> = (props: BasicCardProps) => {
    const { footer, header, body, postId, totalVotes, didVote, navigate } = props;
    const [showBorder, setShowBorder] = useState<boolean>(false);

    return (
        <Card
            background="white"
            round="15px"
            height={{ min: 'auto', max: '600px' }}
            overflow="none"
            margin={{ top: '20px' }}
            onClick={() => {
                if (navigate !== undefined) {
                    navigate();
                }
            }}
            onMouseOver={() => {
                setShowBorder(true);
            }}
            onMouseLeave={() => {
                setShowBorder(false);
            }}
            border={showBorder ? 'all' : false}
            style={{ cursor: navigate !== undefined ? 'pointer' : 'auto' }}
        >
            <CardHeader pad="medium">
                <Heading level="4" margin="none">
                    {header}
                </Heading>
            </CardHeader>
            <CardBody pad="medium" direction="row" align="start" gap="small">
                <Box width="90%">{body}</Box>
                <VoteButtonGroupContainer
                    postId={postId}
                    total={totalVotes}
                    userUpvote={didVote.upvote}
                    userDownVote={didVote.downvote}
                />
            </CardBody>
            <CardFooter
                pad={{ left: '20px', right: '20px', bottom: '20px' }}
                direction="row"
                justify="start"
                align="center"
            >
                <Button size="small" icon={<Chat size="small" />} label="comment" plain />
                {/* TODO: change fill of icon and text if saved */}
                <Button size="small" icon={<Bookmark size="small" />} label="save" plain />
                <Text size="0.8em">
                    posted by <Anchor>{footer}</Anchor>
                </Text>
            </CardFooter>
        </Card>
    );
};
