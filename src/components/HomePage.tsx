import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { Text } from '@consta/uikit/Text';
import cl from './styles/HomePage.module.css';

export default function HomePage() {
    return (
        <Theme preset={presetGpnDefault}>
            <div className={cl.page}>
                <section className={cl.hero}>
                    <Text as="h1" size="4xl" weight="bold" view="primary">
                        Система мониторинга успеваемости
                    </Text>
                    <Text size="l" view="secondary" className={cl.subtitle}>
                        Просматривайте данные студентов по группам и формируйте PDF-отчёты в один клик
                    </Text>
                </section>

                <section className={cl.section}>
                    <Text as="h2" size="xl" weight="semibold" view="primary">О системе</Text>
                    <Text size="m" view="secondary" className={cl.text}>
                        PDFload — инструмент для преподавателей и кураторов, который собирает данные
                        об успеваемости студентов: оценки по предметам, процент усвоения материала
                        и достижения. Информация сгруппирована по учебным группам и доступна на одной странице.
                    </Text>
                </section>

                <section className={cl.section}>
                    <Text as="h2" size="xl" weight="semibold" view="primary">Как это помогает</Text>
                    <ul className={cl.list}>
                        <li>
                            <Text size="m" view="primary" weight="semibold">Экономия времени</Text>
                            <Text size="m" view="secondary">
                                Отчёт по всем студентам группы формируется автоматически — не нужно вручную
                                делать скриншоты или копировать данные.
                            </Text>
                        </li>
                        <li>
                            <Text size="m" view="primary" weight="semibold">Удобный обзор</Text>
                            <Text size="m" view="secondary">
                                Все студенты одной группы видны на одном экране: оценки, прогресс,
                                достижения — без переключения между таблицами.
                            </Text>
                        </li>
                        <li>
                            <Text size="m" view="primary" weight="semibold">Готовый PDF</Text>
                            <Text size="m" view="secondary">
                                Кнопка «Создать отчёт» запускает автоматическую съёмку каждой группы
                                и собирает всё в один PDF-файл, готовый к печати или отправке.
                            </Text>
                        </li>
                    </ul>
                </section>

                <section className={cl.section}>
                    <Text as="h2" size="xl" weight="semibold" view="primary">С чего начать</Text>
                    <Text size="m" view="secondary" className={cl.text}>
                        Перейдите на страницу <b>Успеваемость</b> в боковом меню, выберите группу
                        из списка и нажмите <b>Создать отчёт</b> — PDF будет сформирован автоматически.
                    </Text>
                </section>
            </div>
        </Theme>
    );
}
