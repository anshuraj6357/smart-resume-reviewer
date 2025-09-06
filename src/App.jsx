import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ResumeUpload } from "./pages/resumeupload";
import { Login } from "./pages/auth/login";
import { Signup } from "./pages/auth/signup";
import {ResetPassword}  from "./pages/auth/forgotpasswordfill";
import  ForgotPassword  from "./pages/auth/forgotpassword";
import { Footer } from "./pages/footer";
import {ResumeShowPage} from './pages/resumeshowpage'
import {SkillsPage} from './pages/learnupgrade'
import {ResumeTemplate} from './pages/createdresume'
import  Header  from "./pages/navbar";
function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
         <Route path="/forgotresumepassword/:resettoken" element={<ResetPassword />} />
          <Route path="/resumetemplate" element={<ResumeTemplate />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/" element={<ResumeUpload />} />
         <Route path="/learn" element={<SkillsPage />} />
        <Route path="/login" element={< Login/>} />
         <Route path="/signup" element={< Signup/>} />
         <Route path="/resumeshowpage" element={< ResumeShowPage/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
