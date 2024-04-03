import { Overlay, Button, Icon } from '@rneui/themed';
import { View, Text } from 'react-native';
import { StatusBar } from 'react-native';


export default function SearchResults({keyword, openOverlay, setOpenOverlay}) {
    console.log(keyword);

    const closeOverlay = () => {
        setOpenOverlay(false);
    }
    
    return (
        <>
            <Overlay isVisible={openOverlay} onBackdropPress={closeOverlay} fullScreen={true}>
                <Button
                    icon={
                    <Icon
                        name="wrench"
                        type="font-awesome"
                        color="white"
                        size={25}
                        iconStyle={{ marginRight: 10 }}
                    />
                    }
                    title="Go back"
                    onPress={closeOverlay}
                />
                <Text>Hello!</Text>
                <Text>
                    {keyword}
                </Text>
            </Overlay>
        </>
    )
}