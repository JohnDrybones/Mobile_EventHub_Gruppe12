import { Stack } from 'expo-router';

export default function EventLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="[id]"
                options={{
                    title: 'Event Details',
                    headerShown: false,
                    headerBackTitle: 'Back',
                }}
            />
        </Stack>
    );
}
