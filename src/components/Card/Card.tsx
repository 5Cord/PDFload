import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { Card } from '@consta/uikit/Card';
import { Avatar } from '@consta/uikit/Avatar';
import { Text } from '@consta/uikit/Text';
import { Badge } from '@consta/uikit/Badge';
import { ProgressLine } from '@consta/uikit/ProgressLine';
import { List } from '@consta/uikit/ListCanary';
import cl from './style/StyleCard.module.css';
import { Select } from '@consta/uikit/Select';
import { useEffect, useState } from 'react';
import { ScreenshotButton } from '../ScreenshotButton';

interface Student {
  id: number;
  fullName: string;
  group: string;
  progress: number;
  grades: {
    [subject: string]: number;
  };
  achievements: string[];
}

interface Item {
  label: string;
  id: number;
}

export default function Page() {
  const [dataStud, setDataStud] = useState<Student[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Item | null>(null);

  const getDataStudent = () => {
    fetch('http://localhost:8000/students')
      .then(res => res.json())
      .then(data => {
        setDataStud(data);
        if (data.length > 0) {
          const groups = [...new Set(data.map((student: { group: never }) => student.group))];
          if (groups.length > 0) {
            setSelectedGroup({
              label: groups[0],
              id: 1
            });
          }
        }
      })
      .catch(error => console.error('Ошибка загрузки:', error));
  };

  useEffect(() => {
    getDataStudent();
  }, []);

  const groupItems: Item[] = [...new Set(dataStud.map(student => student.group))].map(
    (group, index) => ({
      label: group,
      id: index + 1,
    })
  );

  const filteredStudents = dataStud.filter(
    (student) => !selectedGroup || student.group === selectedGroup.label
  );

  return (
    <Theme preset={presetGpnDefault}>
      <div className={cl.container}>
        <Select
          className={cl.select}
          items={groupItems}
          value={selectedGroup}
          onChange={setSelectedGroup}
          placeholder="Выберите группу"
        />

        {filteredStudents.map((student) => (
          <Card
            key={student.id}
            verticalSpace="2xl"
            horizontalSpace="2xl"
            className={`${cl.studentCard} ${cl.block}`}
          >
            <div className={cl.avatarContainer}>
              <Avatar size="l" name={student.fullName} className={cl.avatar} />
              <div className={cl.infoContainer}>
                <Text size="2xl" weight="bold" view="primary" lineHeight="m">
                  {student.fullName}
                </Text>
                <Text size="s" view="secondary" lineHeight="m">
                  Группа: {student.group}
                </Text>
                <Badge
                  label={`Успеваемость: ${student.progress}%`}
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
              <ProgressLine value={student.progress} />
            </div>

            <div className={cl.section}>
              <Text size="l" weight="semibold" view="primary" className={cl.sectionTitle}>
                Оценки
              </Text>
              <div className={cl.gradesGrid}>
                {Object.entries(student.grades).map(([subject, grade]) => (
                  <div key={subject} className={cl.gradeItem}>
                    <Text>
                      {subject}: <b>{grade}</b>
                    </Text>
                  </div>
                ))}
              </div>
            </div>

            <div className={cl.section}>
              <Text size="l" weight="semibold" view="primary" className={cl.sectionTitle}>
                Достижения
              </Text>
              <List
                items={student.achievements}
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
        ))}

      </div>
      <ScreenshotButton
        selectItems={groupItems}
        onSelectChange={setSelectedGroup}
        selectedValue={selectedGroup} currentPagePath={''}      />
    </Theme>
  );
}
