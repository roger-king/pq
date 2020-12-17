import React, {useState} from 'react';
import { withMainLayout } from '../layouts/main';
import { useRouter } from 'next/router';
import { Box, Button, Form, FormField, CheckBox, Heading, TextInput } from 'grommet';
import { AddCircle, SubtractCircle } from 'grommet-icons';

const CreatePage: React.FC = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const maxNumOptions = 4;
    const defaultOption = {'title': '', answer: false};
    const defaultQuestion = {q: '', options: [defaultOption]};

    const [questions, setQuestions] = useState([defaultQuestion]);

    return <Box fill>
        <Box margin={{left: '200px', right: '200px', top: '20px', bottom: '20px'}} gap="small">
            <Button alignSelf="end" label="Create" primary/>
            <Box elevation="medium" pad="medium" border="all" height="130px">
                <TextInput placeholder="New PQ" value={name} onChange={(e) => setName(e.target.value)}/>
            </Box>
            <Box overflow="auto" height="100%" gap="medium">
                {questions.map((q, i) => (
                    <Box key={`question-${i + 1}`} elevation="medium" pad="medium" border="all" height={{min: '278px', max: '400px'}}>
                        <TextInput placeholder={`Question ${i+1}`} value={q.q} onChange={(e) => {
                            const newQuestions = questions;
                            newQuestions[i].q = e.target.value;
                            setQuestions([...newQuestions]);
                        }} />
                        <Box margin="medium" gap="small" height={{min: 'min-height: 100%!important', max: '205px'}} flex="grow">
                            {q.options.map((o, oi) => (
                                <Box key={`option-${oi}`} direction="row" gap="small" align="center">
                                    <CheckBox value={oi} label="answer" reverse checked={o.answer} onChange={(e) => {
                                        const index = Number(e.target.value);
                                        const newQuestions = questions;
                                        newQuestions[i].options.map((no, noi) => {
                                            if(noi === index) {
                                                no.answer = e.target.checked;
                                            } else {
                                                no.answer = false;
                                            }

                                        })
                                        setQuestions([...newQuestions]);
                                    }}/>
                                    <TextInput key={`options-${i}-${oi}`} placeholder={`Option ${oi + 1}`} value={o.title} onChange={(e) => {
                                        const newQuestions = questions;
                                        newQuestions[i].options[oi].title = e.target.value;
                                        setQuestions([...newQuestions]);
                                    }} />
                                    { q.options.length > 1 && <Button value={oi} icon={<SubtractCircle />} onClick={(e) => {
                                        const newQuestions = questions;
                                        if(newQuestions[i].options.length > 1) {
                                            newQuestions[i].options.splice(oi, 1);
                                            setQuestions([...newQuestions]);
                                        }
                                    }}/> }
                                </Box>
                            ))}
                            {q.options.length < maxNumOptions && (
                                <Button icon={<AddCircle />} onClick={() => {
                                    const newQuestions = questions;
                                    if(newQuestions[i].options.length < maxNumOptions) {
                                        newQuestions[i].options.push(defaultOption);
                                        setQuestions([...newQuestions]);
                                    }
                                }}/>
                            )}
                        </Box>
                    </Box>
                ))}
            </Box>
            <Button label="Question" icon={<AddCircle />} primary onClick={() => {
                setQuestions((q) => [...q, defaultQuestion])
            }}/>
        </Box>
    </Box>
}

export default withMainLayout(CreatePage);