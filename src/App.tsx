import { Route, Routes } from 'react-router-dom';
import './globals.css';
import SignInForm from './_auth/forms/SignInForm';
import SignUpForm from './_auth/forms/SignUpForm';
import {Home, PostDetails, EditPost, AllUsers, Explore, Saved, CreatePost, UpdateProfile, Profile} from './_root/pages';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import { Toaster } from './components/ui/toaster';

const App = () => {
  return (
    <main className='flex h-screen'>
      <Routes>
        {/* public route */}
        <Route element={<AuthLayout />}>
          <Route path='/signin' element={<SignInForm />} />
          <Route path='/signup' element={<SignUpForm />} />
        </Route>


        {/* private route */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  )
}

export default App