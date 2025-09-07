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
import {LandingPaging} from './pages/mainlayout'
import  Header  from "./pages/navbar";
import {Protectedroutes}  from './protectedroutes'
function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
         <Route path="/forgotresumepassword/:resettoken" element={<ResetPassword />} />
          <Route path="/resumetemplate" element={   <Protectedroutes> <ResumeTemplate /></Protectedroutes> } />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/" element={ <LandingPaging />} />
        <Route path="/resumeupload" element={<Protectedroutes><ResumeUpload /></Protectedroutes>} />
         <Route path="/learn" element={<SkillsPage />} />
        <Route path="/login" element={< Login/>} />
         <Route path="/signup" element={< Signup/>} />
         <Route path="/resumeshowpage" element={  <Protectedroutes>  < ResumeShowPage/></Protectedroutes> } />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
