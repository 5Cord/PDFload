import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { Text } from '@consta/uikit/TextDeprecated';
import cl from './styles/StyleCard.module.css';

export default function HomePage() {
    return (
        <Theme preset={presetGpnDefault}>
            <div className={cl.container} id='container'>
                <Text
                    size="4xl"
                    as="h1"
                    align="center"
                    view="primary"
                    weight="bold"
                    className={cl.title}
                >
                    Главная страница
                </Text>
                <br></br>

                <Text size="3xl" view="primary" className={cl.paragraph}>
                    Съешь ещё этих мягких французских булок да выпей чаю
                </Text>
                <Text size="3xl" view="primary" className={cl.paragraph}>
                    Лорем Ипсум — это тип текста-заполнителя, обычно используемый в
                    дизайне и издательском деле для заполнения пространства на странице и
                    создания впечатления о том, как будет выглядеть конечный контент.
                </Text>

                <Text size="3xl" view="primary" className={cl.paragraph}>
                    Текст-заполнитель имеет решающее значение для дизайнеров, чтобы
                    визуализировать макеты, не отвлекаясь от реального контента. Он
                    позволяет сосредоточиться на эстетике и структуре, обеспечивая
                    сбалансированную презентацию.
                </Text>

                <Text size="3xl" view="primary" className={cl.paragraph}>
                    В творческих проектах макет имеет решающее значение для эффективной
                    передачи сообщений. Лорем Ипсум позволяет дизайнерам экспериментировать
                    с различными элементами, сосредоточившись на композиции.
                </Text>

                <Text size="3xl" view="primary" className={cl.paragraph}>
                    Типографика играет центральную роль в эффективном дизайне, существенно
                    влияя на восприятие контента. Использование Лорем Ипсум разной длины и
                    стилей позволяет дизайнерам увидеть, как взаимодействуют различные
                    шрифты и размеры.
                </Text>

                <Text size="3xl" view="primary" className={cl.paragraph}>
                    Использование Лорем Ипсум в русском тексте позволяет дизайнерам
                    размещать элементы таким образом, чтобы естественным образом направлять
                    взгляд зрителей по странице.
                </Text>

                <Text size="3xl" view="primary" className={cl.paragraph}>
                    Лорем Ипсум на русском языке имеет решающее значение в веб-дизайне для
                    создания адаптивных макетов, которые адаптируются к разным размерам
                    экрана.
                </Text>
            </div>
        </Theme>
    );
}
