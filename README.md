# Storybook for React tutorial

storybook은 비즈니스 로직과 컨텍스트로부터 UI Component를 독립적으로 분리하여 만들 수 있다.

## 1. Get Started(시작하기)

### 1.1 Setup React Storybook

개발 환경에서 필드 프로세스를 설정하기 위해서는 CRA를 사용하여 빌드 시스템을 설정하고 storybook과 jest 테스트 앱에서 활성화해야 한다.

> yarn 을 사용할 경우 yarn 에 맞게 수정하여 진행하면 됨!

```
# Create our application:
npx create-react-app test-storybook

cd test-storybook

# Add Storybook:
npx -p @storybook/cli sb init

# Run the test runner (Jest) in a terminal:
npm test --watchAll

# Start the component explorer on port 6006:
npm run storybook

# Run the frontend app proper on port 3000:
npm start
```

> 테스트 명령어에 --watchAll 플래그가 추가된 것을 보셨을 수 있다. 이것은 의도적인 것으로, 이 덕분에 모든 테스트가 실행되고 애플리케이션이 정상임을 확인할 수 있다.

### 1.2 GraphQL과 React 튜토리얼 [연습예제](https://www.chromatic.com/blog/graphql-react-tutorial-part-1-6/)

```
# Reuse stylesheet
npx degit chromaui/learnstorybook-code/src/style src/style

# Add assets
npx degit chromaui/learnstorybook-code/src/assets/font src/assets/font
npx degit chromaui/learnstorybook-code/src/assets/icon src/assets/icon

# Storybook-less-loader
npm i storybook-less-loader less-loader less

```

## 2. Simple component(간단한 컴포넌트)

간단한 컴포넌트를 독립적으로 만들어보자.

> [컴포넌트 기반 개발(CDD; Component-Driven Development)](https://www.componentdriven.org/) 방법론에 따라 컴포넌트로 부터 마지막 화면에 이르기까지 상향적으로 UI를 개발하려고 하며, CDD는 UI를 구축할 때 직면하게 되는 규모의 복잡성을 해결하는데 도움이 된다고 한다.

### 2.1 Task Component

각각 task는 현재 어떤 state에 있는지에 따라 약간씩 다르게 노출되며, 선택된(또는 선택되지 않은) 체크박스, 텍스트, task를 위/아래로 움직일 수 있도록 도와주는 '핀' 버튼을 노출하고자 한다.

| prop    |                          의미                          |
| ------- | :----------------------------------------------------: |
| `title` |                task를 설명해주는 문자열                |
| `state` | 현재 어떤 task가 몰고에 있으며, 선택되어 있는지의 여부 |

task 컴포넌트를 만들기 위해서는 해당 테스트 state를 작성해야하며, 모의 데이터를 이용하여 독립적 환경에서 컴포넌트를 구축하기 위해 Storybook을 사용한다. 또한 각각의 state 에 따라 컴포넌트의 모습을 수동적으로 테스트하면서 진행할 것이다.

### 2.2 Get setup(설정하기)

> task 컴포넌트와 그에 해당하는 스토리 파일을 생성하기.

- `src/components/Task.js`, `src/components/Task.stories.js` 파일 추가

Storybook은 한 개의 컴포넌트 그리고 해당 컴포넌트의 하위 스토리 이렇게 2가지 기본 단계로 구성되어 있다. 각 스토리는 컴포넌트에 따라 대응하여 추가 및 삭제 할 수 있다.

```
## example

/component.js
/component.stoires.js
```

Storybook에 작성하고 있는 컴포넌트에 대해 전달하기 위해서는 아래 사항들을 포함하는 default export를 생성해야 한다.

|                  |                          의미                           |
| ---------------- | :-----------------------------------------------------: |
| `component`      |                      해당 컴포넌트                      |
| `title`          |  Storybook 앱의 사이드 바에서 컴포넌트를 참조하는 방법  |
| `excludeStories` | Storybook에서 스토리를 export할 때 렌더링을 제외하는 것 |
| `argTypes`       |     각각의 스토리에서 인수(arg)의 행동 방식을 명시      |

스토리를 정의하기 위해서는 각각의 테스트 state에 해당하는 스토리를 만들기 위해서 함수를 내보내며, 이 때 스토리는 주어진 state 안에서 렌더링 요소(예- prop이 포함된 컴포넌트)를 리턴하는 함수를 의미한다. - As [함수형 컴포넌트(Stateless Functional Component)](https://reactjs.org/docs/components-and-props.html)

Task component에서 **순열(permutations)**이 여러 개이기 때문에 Template 변수에 할당하는 것이 편리하다. 이 패턴을 스토리에 도입함으로써 작성하고 유지해야 하는 코드의 양이 줄어드는 것을 기대할 수 있다.

> `Template.bind({})`는 함수의 복사본을 만드는 표준 Javascript의 한 기법으로 이 기법을 사용하여 각각의 스토리가 고유한 속성(properties)을 갖지만 동시에 동일한 구현(?)을 사용할 수 있도록 하고자 한다.

**인수(argument) 또는 args** 를 사용하여 Storybook을 다시 시작하지 않고도 Controls addon으로 컴포넌트를 실시간 수정할 수 있다. args의 값이 변하면 컴포넌트도 함께 변하게 된다.

Storybook을 만들 때 기본 task 인수를 사용하여 컴포넌트가 예상하는 task의 형태를 구성한다. 이는 일반적으로 실제 데이터를 모델로 하여 만들어지며, export 하는 것은 추후 스토리를 재사용할 수 있도록 해준다.

```
액션(Actions)은 UI 컴포넌트를 독립적으로 만들 때, 컴포넌트와의 상호작용을 확인하는데 도움이 된다. 종종, 앱의 컨텍스트에서 함수와 state에 접근하지 못할 수 있는데.. 이런 경우 action() 을 사용하여 끼워 넣어 주면된다..
```
