import './App.css'
import Intro from './components/intro.jsx'
import AdvancedIntro01 from './components/AdvancedIntro01.jsx'
import AdvancedIntro02 from './components/AdvancedIntro02.jsx'
import AdvancedIntro03 from './components/AdvancedIntro03.jsx'
import AdvancedIntro04 from './components/AdvancedIntro04.jsx'
import AdvancedRender from './components/AdvancedRender.jsx'

function App() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Welcome to the App Component</h2>
      <Intro />
      <AdvancedIntro01 />
      <AdvancedIntro02 />
      <AdvancedIntro03 />
      <AdvancedIntro04 />
      <AdvancedRender />
    </div>
  )
}

export default App