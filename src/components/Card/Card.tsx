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
// import { Button } from '@consta/uikit/Button';
import { ScreenshotButton } from '../ScreenshotButton';
import { Loader } from '@consta/uikit/Loader';

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
  const [isLoading, setIsLoading] = useState(true);
  const [isGroupChanging, setIsGroupChanging] = useState(false);

  const runPuppeteer = () => {
    fetch('http://localhost:8001/run-puppeteer')
      .then((res) => res.json())
      .then(() => {
        alert('Отчёт успешно сформирован!');
      })
      .catch((err) => {
        alert('Ошибка при запуске puppeteer: ' + err.message);
      });
  };

  const getDataStudent = () => {
    fetch('http://localhost:8000/students')
      .then((res) => res.json())
      .then((data: Student[]) => {
        setDataStud(data);
        if (data.length > 0) {
          const groups = [...new Set(data.map((student) => student.group))];
          if (groups.length > 0) {
            setSelectedGroup({
              label: groups[0],
              id: 1,
            });
          }
        }
        setIsLoading(false);
        setIsGroupChanging(false);
      })
      .catch((error) => {
        console.error('Ошибка загрузки:', error);
        setIsLoading(false);
        setIsGroupChanging(false);
      });
  };
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const groupParam = searchParams.get('group');

    if (groupParam) {
      const group = groupItems.find(item => item.label === groupParam);
      if (group) {
        setSelectedGroup(group);
      }
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getDataStudent();
  }, []);

  useEffect(() => {
    document.body.dataset.loading = (isLoading || isGroupChanging).toString();
  }, [isLoading, isGroupChanging]);


  const handleGroupChange = (value: Item | null) => {
    setIsGroupChanging(true);
    setSelectedGroup(value);
    setTimeout(() => {
      setIsGroupChanging(false);
    }, 2000);
  };

  const groupItems: Item[] = [...new Set(dataStud.map((student) => student.group))].map(
    (group, index) => ({
      label: group,
      id: index + 1,
    })
  );

  const filteredStudents = dataStud.filter(
    (student) => !selectedGroup || student.group === selectedGroup.label
  );

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}>
        <Loader view="primary" size="m" />
      </div>
    );
  }

  return (
    <Theme preset={presetGpnDefault}>
      <div className={cl.container} id="container">
        {/* <Button className={cl.btnReport} onClick={runPuppeteer} label="Создать отчёт" /> */}
        <ScreenshotButton
          selectItems={groupItems}
          onSelectChange={handleGroupChange}
          selectedValue={selectedGroup}
          currentPagePath={window.location.pathname}
          isLoading={isLoading || isGroupChanging}
        />
        <Select
          className={cl.select}
          id="selector"
          items={groupItems}
          value={selectedGroup}
          onChange={handleGroupChange}
          placeholder="Выберите группу"
          disabled={isGroupChanging}
        />

        {isGroupChanging ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '200px',
          }}>
            <Loader view="primary" size="m" />
          </div>
        ) : (
          filteredStudents.map((student) => (
            <Card
              key={student.id}
              verticalSpace="2xl"
              horizontalSpace="2xl"
              id="studentCard"
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
          ))
        )}
      </div>
    </Theme>
  );
}
