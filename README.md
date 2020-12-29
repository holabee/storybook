# Storybook for React tutorial

storybook은 비즈니스 로직과 컨텍스트로부터 UI Component를 독립적으로 분리하여 만들 수 있다.

## Setup React Storybook

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

## GraphQL과 React 튜토리얼 [연습예제](https://www.chromatic.com/blog/graphql-react-tutorial-part-1-6/)

```
# Reuse stylesheet
npx degit chromaui/learnstorybook-code/src/style src/style

# Add assets
npx degit chromaui/learnstorybook-code/src/assets/font src/assets/font
npx degit chromaui/learnstorybook-code/src/assets/icon src/assets/icon
```
