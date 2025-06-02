import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { Text } from '@consta/uikit/TextDeprecated';

export default function HomePage() {
    return (
        <Theme preset={presetGpnDefault}>
            <Text
                size="3xl"
                as="h1"
                align="center"
                view="primary"
                weight="bold"
            >
                Главная страница
            </Text>
        </Theme>
    )
}
