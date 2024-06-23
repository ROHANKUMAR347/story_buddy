//import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Pages/Login/Login'
import Signup from '../Pages/Signup/Signup'
import Story from '../Pages/StoryAi/Story'
import AddStory from '../Components/AddStory/Addstory'
import Home from '../Pages/Home/Home'
import AllStories from '../Pages/Storys/AllStorys'
import MyStory from '../Pages/MyStory/MyStory'
//import StoryDetails from '../Components/StoryDetails/StoryDetail'
import StoryPage from '../Pages/StoryDetailPage/StoryDetailspage'

const AllRoutes = () => {
    return (
        <div>
            <Routes >
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path='/addstory' element={<AddStory />} />
                <Route path='/story' element={<AllStories />} />
                <Route path="/storydetails/:id" element={<StoryPage />} />
                <Route path="/userstory" element={<MyStory />} />
                <Route path="/storygenerator" element={< Story />} />

            </Routes>
        </div>
    )
}

export default AllRoutes