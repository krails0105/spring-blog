import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// BrowserRouter: URL 변경에 따라 다른 페이지 컴포넌트를 보여주는 라우터
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// BrowserRouter로 App을 감싸야 내부에서 <Routes>, useNavigate 등 사용 가능
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
