import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { Text } from '@consta/uikit/TextDeprecated';
import cl from './styles/StyleCard.module.css';

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
                <div className={cl.container}>
                    Главная страница
                </div>
            </Text>
        </Theme>
    )
}
