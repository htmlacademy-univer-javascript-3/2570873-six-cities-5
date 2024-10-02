import MainPage from '../pages/main-page/main-page.tsx';
type AppProps = {
  places: number;
};

function App({ places }: AppProps): JSX.Element {
  return <MainPage places={places} />;
}

export default App;
