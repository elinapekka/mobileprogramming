import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Card, Button } from '@rneui/themed';

export default function StepsList({instructionsString}) {
    const [instructions, setInstructions] = useState([]);

    //apam balik
    useEffect(() => {
        let tempInstructions = String(instructionsString).split('\n');
        tempInstructions = tempInstructions.map(item => item.trim());
        tempInstructions = tempInstructions.filter(item => item !== '')
        setInstructions(tempInstructions);

    }, [instructionsString])

    return(
        <View>
            <Text>Instructions</Text>
            {
                instructions.map((l, i) => (
                    l ? (
                        <Card key={i}>
                          <Text>{i + 1}. {l}</Text>
                        </Card>
                      ) : null
            ))}
        </View>
    )
}