import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements } from 'react-router-dom'
import './css/App.css'
//pages
import JobDetails from './pages/JobDetails'
import JobList from './pages/JobList'
import NotFound404 from './pages/NotFound404'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<JobList />} />
      <Route path="jobDetails/:jobId" element={<JobDetails/>} />
      <Route path="*" element={<NotFound404/>} />
    </Route>
  )
)

function App() {
  return (
    <div className='parent'>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
