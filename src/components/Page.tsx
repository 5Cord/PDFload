import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { Card } from '@consta/uikit/Card';
import { Avatar } from '@consta/uikit/Avatar';
import { Text } from '@consta/uikit/Text';
import { Badge } from '@consta/uikit/Badge';
import { ProgressLine } from '@consta/uikit/ProgressLine';
import { List } from '@consta/uikit/ListCanary';
import cl from './styles/StyleCard.module.css';

export default function Page() {
  return (
    <Theme preset={presetGpnDefault}>
      <div className={cl.container}>
        <Card verticalSpace="2xl" horizontalSpace="2xl" className={`${cl.studentCard} ${cl.block}`}>
          <div className={cl.avatarContainer}>
            <Avatar
              size="l"
              name="Вайтович Дмитрий"
              className={cl.avatar}
            />
            <div className={cl.infoContainer}>
              <Text size="2xl" weight="bold" view="primary" lineHeight="m">
                Вайтович Дмитрий
              </Text>
              <Text size="s" view="secondary" lineHeight="m">
                Группа: ИСТ-211
              </Text>
              <Badge
                label="Успеваемость: 98%"
                status="success"
                size="s"
                className={cl.progressBadge}
              />
            </div>
          </div>

          <div className={cl.section}>
            <Text size="l" weight="semibold" view="primary" className={cl.sectionTitle}>
              Прогресс обучения
            </Text>
            <ProgressLine value={90} />
          </div>

          <div className={cl.section}>
            <Text size="l" weight="semibold" view="primary" className={cl.sectionTitle}>
              Оценки
            </Text>
            <div className={cl.gradesGrid}>
              <div className={cl.gradeItem}>
                <Text>Информатика: <b>5</b></Text>
              </div>
              <br></br>
              <div className={cl.gradeItem}>
                <Text>Математика: <b>5</b></Text>
              </div>
            </div>
          </div>

          <div className={cl.section}>
            <Text size="l" weight="semibold" view="primary" className={cl.sectionTitle}>
              Достижения
            </Text>
            <List
              items={['Призёр "профессионалы" по компетенции 3D моделирование', 'Участие в Devweek']}
              getItemLabel={(item) => item}
              renderItem={(item) => (
                <div className={cl.achievementItem}>
                  <Badge status="normal" size="xs" />
                  <Text>{item}</Text>
                </div>
              )}
            />
          </div>
        </Card>
      </div>
    </Theme>
  );
}