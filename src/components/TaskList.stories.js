
import React from 'react';

import TaskList from './TaskList';
import * as TaskStories from './Task.stories';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  component: TaskList,
  title: 'TaskList',
  decorators: [story => <div style={{ padding: '3rem' }}>{story()}</div>],
  // 데코레이터(decorators)는 스토리에 임의의 wrapper 를 제공하는 방법
  // 키를 사용하여 기본 내보내기에서 렌더링된 컴포넌트에 padding 을 추가
  // 데코레이터는 providers(react context를 설정하는 라이브러리 컴포넌트)에 스토리를 감싸 줄 때 사용할 수 있다.
};

const Template = args => <TaskList {...args} />;

export const Default = Template.bind({});
Default.args = {
  // Shaping the stories through args composition.
  // The data was inherited from the Default story in task.stories.js.
  tasks: [
    { ...TaskStories.Default.args.task, id: '1', title: 'Task 1' },
    { ...TaskStories.Default.args.task, id: '2', title: 'Task 2' },
    { ...TaskStories.Default.args.task, id: '3', title: 'Task 3' },
    { ...TaskStories.Default.args.task, id: '4', title: 'Task 4' },
    { ...TaskStories.Default.args.task, id: '5', title: 'Task 5' },
    { ...TaskStories.Default.args.task, id: '6', title: 'Task 6' },
  ],
};

export const WithPinnedTasks = Template.bind({});
WithPinnedTasks.args = {
  // Shaping the stories through args composition.
  // Inherited data coming from the Default story.
  tasks: [
    ...Default.args.tasks.slice(0, 5),
    { id: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED' },
  ],
};

export const Loading = Template.bind({});
Loading.args = {
  tasks: [],
  loading: true,
};

export const Empty = Template.bind({});
Empty.args = {
  // Shaping the stories through args composition.
  // Inherited data coming from the Loading story.
  ...Loading.args,
  loading: false,
};