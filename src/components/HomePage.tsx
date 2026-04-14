import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { Text } from '@consta/uikit/Text';
import cl from './styles/HomePage.module.css';

export default function HomePage() {
    return (
        <Theme preset={presetGpnDefault}>
            <div className={cl.page}>
                <section className={cl.hero}>
                    <Text as="h1" size="4xl" weight="bold" view="primary">
                        Система автоматической генерации PDF-отчётов
                    </Text>
                    <Text size="l" view="secondary" className={cl.subtitle}>
                        Автоматический сбор скриншотов по каждому пункту выпадающего списка
                        и формирование единого печатного документа
                    </Text>
                </section>

                <section className={cl.section}>
                    <Text as="h2" size="xl" weight="semibold" view="primary">Предпосылки</Text>
                    <Text size="m" view="secondary" className={cl.text}>
                        Отдел менеджеров столкнулся с задачей: для составления печатных отчётов
                        требовалось вручную делать скриншоты по каждому пункту из выпадающего списка.
                        При объёме свыше 1000 позиций это занимало огромное количество времени
                        и было подвержено ошибкам — пункты пропускались, скриншоты делались
                        в разном масштабе, документ собирался вручную.
                    </Text>
                </section>

                <section className={cl.section}>
                    <Text as="h2" size="xl" weight="semibold" view="primary">Решение</Text>
                    <Text size="m" view="secondary" className={cl.text}>
                        Под этот запрос была разработана данная система. Она автоматически
                        перебирает все пункты выпадающего списка, делает скриншот страницы
                        для каждого из них и собирает всё в один PDF-файл — без участия пользователя.
                        Достаточно нажать одну кнопку.
                    </Text>
                </section>

                <section className={cl.section}>
                    <Text as="h2" size="xl" weight="semibold" view="primary">Данные</Text>
                    <Text size="m" view="secondary" className={cl.text}>
                        В текущей версии используются моковые данные — студенты и группы заданы
                        в коде. Это позволяет запускать и демонстрировать систему без подключения
                        к реальной базе данных или внешнему API.
                    </Text>
                </section>

                <section className={cl.section}>
                    <Text as="h2" size="xl" weight="semibold" view="primary">Как использовать</Text>
                    <Text size="m" view="secondary" className={cl.text}>
                        Перейдите на страницу <b>Успеваемость</b>, выберите группу из списка
                        для просмотра данных. Нажмите <b>Создать отчёт (PDF)</b> —
                        система автоматически пройдёт по всем группам и сохранит PDF на ваш компьютер.
                    </Text>
                </section>
            </div>
        </Theme>
    );
}
